import React, {useState, FC, useEffect} from 'react';

// ** MUI Imports
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

// ** Types Imports
import {BeneficiariesFilters} from 'src/types/beneficiaries/BeneficiariesFilters';
import {useBeneficiariesPaging} from 'src/hooks/beneficiaries/useBeneficiariesPaging';
import {useQuery} from '@apollo/client';
import Beneficiary from 'src/types/beneficiaries/Beneficiary';
import {GET_BENEFICIARIES} from 'src/API/Beneficiaries/beneficiaries_grapql';
import DisplayBeneficiary from './DisplayBeneficiary';
import Button from '@mui/material/Button';
import BeneficiaryTablePagination from './BeneficiaryTablePagination';
import {deleteBeneficiary} from 'src/API/Beneficiaries/beneficiaries_data';
import {activateBeneficiary} from './../../API/Beneficiaries/beneficiaries_data';
import {BeneficiaryEditForm} from './BeneficiaryEditForm';
import Community from 'src/types/beneficiaries/Community';
import {useRouter} from 'next/router';
import {Action} from 'src/types/Action';
import Box from '@mui/material/Box';
import {hasWriteAccess, userIsLoggedIn} from 'src/utils/sessionManagement';
import {LinearProgress, Typography} from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import {ConfirmActionDialog} from "../pages/misc/ConfirmActionDialog";
import * as Excel from 'exceljs';
import * as FileSaver from 'file-saver';
import {Cell, Column, Worksheet} from "exceljs";
import BENEFICIARY_TYPES from "../../types/beneficiaries/BeneficiaryTypes";
import GENDERS from "../../types/beneficiaries/Genders";
import {SCHOOL_YEARS} from "../../types/beneficiaries/SchoolYear";

interface BeneficiariesTableProps {
  filters: BeneficiariesFilters;
  communities: Community[];
  openCreateBeneficiaries: boolean;
  openWindow: boolean;
  setAction: (action: Action) => void;
}


const BeneficiariesTable: FC<BeneficiariesTableProps> = props => {
  const {filters, communities, openCreateBeneficiaries, openWindow, setAction} = props;
  const router = useRouter();
  const [open, setOpen] = useState<boolean[]>([]);
  const [openEditBeneficiary, setOpenEditBeneficiary] = useState<boolean>(false);
  const [beneficiaryEdited, setBeneficiaryEdited] = useState<boolean>(false);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<Beneficiary | undefined>();
  const {paging, setBeneficiariesPaging} = useBeneficiariesPaging();
  const [hasWriteBenefs, setHasWriteBenefs] = useState<boolean>(false);
  const [openConfirmAction, setOpenConfirmAction] = useState<boolean>(false);

  const {loading, error, data, refetch} = useQuery(GET_BENEFICIARIES, {
    variables: {
      ageStart: isNaN(parseInt(filters.ageStart as string)) ? filters.ageStart : parseInt(filters.ageStart as string),
      ageEnd: isNaN(parseInt(filters.ageEnd as string)) ? filters.ageEnd : parseInt(filters.ageEnd as string),
      firstName: filters.firstName,
      lastName: filters.lastName,
      type: filters.type,
      dniStarts: filters.dniStarts,
      familyId: filters.familyId,
      communityId: filters.communityCode,
      school: filters.school,
      gender: filters.gender,
      isActive: !!filters.isActive ? (filters.isActive === 'true' ? true : false) : null,
      after: paging.pageCursor,
      limit: paging.limit
    }
  });
  const refetchWithSameParameters = () => {
    refetch({
      ageStart: isNaN(parseInt(filters.ageStart as string)) ? filters.ageStart : parseInt(filters.ageStart as string),
      ageEnd: isNaN(parseInt(filters.ageEnd as string)) ? filters.ageEnd : parseInt(filters.ageEnd as string),
      lastName: filters.lastName,
      firstName: filters.firstName,
      type: filters.type,
      dniStarts: filters.dniStarts,
      familyId: filters.familyId,
      communityId: filters.communityCode,
      school: filters.school,
      gender: filters.gender,
      isActive: !!filters.isActive ? (filters.isActive === 'true' ? true : false) : null,
      after: paging.pageCursor,
      limit: paging.limit
    });

  };

  useEffect(() => {
    if (openWindow && !openCreateBeneficiaries) {
      refetchWithSameParameters();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openCreateBeneficiaries]);

  useEffect(() => {
    if (!!openEditBeneficiary && beneficiaryEdited) {
      refetchWithSameParameters();
      setBeneficiaryEdited(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openEditBeneficiary]);

  useEffect(() => {
    if (!userIsLoggedIn()) {
      router.push('/login');
    }
    setHasWriteBenefs(hasWriteAccess('Beneficiaries'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    refetchWithSameParameters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paging.pageCursor, filters, paging.limit]);
  if (error) {
    return (
      <TableRow>
        <TableCell>Error :(</TableCell>
      </TableRow>
    );

  }
  const nodes = data === undefined ? [] : data.filteredBeneficiaries.nodes;
  const pageInfo = data === undefined ? undefined : data.filteredBeneficiaries.pageInfo;
  const edges = data === undefined ? [] : data.filteredBeneficiaries.edges;

  const _autosizeColumnCells = ({columns}: Worksheet) => {
    let dataMax: number[];
    let max: number;

    // @ts-ignore
    columns.forEach((column: Column) => {
      dataMax = [];
      column.eachCell({includeEmpty: false}, (cell: Cell) => {
        dataMax.push(cell.value?.toString().length || 0);
      });
      max = Math.max(...dataMax);
      column.width = max < 10 ? 10 : max;
    });
  }

  const nombresFiltros = {
    ageStart: 'Edad de Comienzo',
    ageEnd: 'Edad de Fin',
    lastName: 'Apellido',
    firstName: 'Nombre',
    type: 'Tipo',
    dniStarts: 'DNI comienza con',
    familyId: 'Identificador de Familia',
    communityCode: 'Código de la Comunidad',
    school: 'Escuela',
    gender: 'Género',
    isActive: 'Está activo',
    familyName: 'Nombre de Familia'
  }

  const exportToExcel = async () => {
    try {
      const workbook = new Excel.Workbook();
      const worksheet = workbook.addWorksheet('Beneficiarios Filtrados');
      worksheet.addRow(['Filtros']);
      worksheet.addRow(Object.entries(filters).map(entry => nombresFiltros[entry[0] as keyof typeof nombresFiltros] + ': ' + (!!entry[1] ? entry[1]: '-')));
      const TRANSPORT_METHODS = {
        BIKE: 'Bicicleta',
        CAR: 'Auto',
        HORSE: 'Caballo',
        PUBLIC_TRANSPORT: 'Transporte Público',
        WALKING: 'Caminando',
        OTHER: 'Otros'
      };

      worksheet.addTable({
        name: 'BeneficiariosFiltrados',
        ref: 'A4',
        headerRow: true,
        style: {
          theme: 'TableStyleLight7',
          showRowStripes: true,
        },
        columns: [
          {name: 'ID Familia', filterButton: true},
          {name: 'DNI', filterButton: true},
          {name: 'Nombre Completo', filterButton: true},
          {name: 'Género', filterButton: true},
          {name: 'Fecha de Nacimiento', filterButton: true},
          {name: 'Tipo', filterButton: true},
          {name: 'Escuela', filterButton: true},
          {name: 'Año Académico', filterButton: true},
          {name: 'Método de Transporte', filterButton: true},
          {name: 'Talle Calzado', filterButton: true},
          {name: 'Talle Remera', filterButton: true},
          {name: 'Talle Pantalones', filterButton: true},
          {name: 'Trabajo', filterButton: true},
          {name: 'Vacuna COVID', filterButton: true},
          {name: 'Vacunas Mandatorias', filterButton: true},
          {name: 'Observaciones de Salud', filterButton: true},
        ],
        rows: nodes.map((row: Beneficiary) => [row.familyId, row.dni, row.firstName + ' ' + row.lastName, GENDERS[row.gender as keyof typeof GENDERS],
          row.birthday, BENEFICIARY_TYPES[row.type as keyof typeof BENEFICIARY_TYPES],
          row.education?.school ? row.education?.school : '-', row.education?.year ? SCHOOL_YEARS[row.education?.year as keyof typeof SCHOOL_YEARS] : '-',
          row.education?.transportationMethod ? TRANSPORT_METHODS[row.education?.transportationMethod as keyof typeof TRANSPORT_METHODS] : '-',
          row.clothes?.shoeSize ? row.clothes?.shoeSize : '-', row.clothes?.shirtSize ? row.clothes?.shirtSize : '-',
          row.clothes?.pantsSize ? row.clothes?.pantsSize : '-',
          row.job?.title, row.health?.hasCovidVaccine ? 'Sí' : 'No', row.health?.hasMandatoryVaccines ? 'Sí' : 'No',
          row.health?.observations ? row.health?.observations : '-']),
      });
      _autosizeColumnCells(worksheet);
      workbook.xlsx.writeBuffer().then(data => {
        const blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'});
        FileSaver.saveAs(blob, 'Beneficiarios Filtrados.xlsx');
      });
    } catch (err) {
      setAction({
        complete: false,
        status: 400,
        message: "Ocurrió un error descargando el archivo",
        success: false,
      })
    }
  }

  return (
    <Card>
      <CardHeader action={<>
        {props.children}
        <Button variant='contained' sx={{mx: '1em'}} onClick={async () => await exportToExcel()}>Exportar</Button>
      </>} title='Beneficiarios' titleTypographyProps={{variant: 'h6'}}/>
      <TableContainer>
        {loading && <LinearProgress/>}
        <Table sx={{minWidth: 800}} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>DNI</TableCell>
              <TableCell>ID de Familia</TableCell>
              <TableCell>Nombre Completo</TableCell>
              <TableCell>Género</TableCell>
              <TableCell>Fecha de Nacimiento</TableCell>
              <TableCell>Tipo</TableCell>
              {hasWriteBenefs && <TableCell>Acciones</TableCell>}
            </TableRow>
          </TableHead>

          <TableBody>

            {nodes.map((row: Beneficiary, index: number) => (
              <DisplayBeneficiary
                key={index}
                index={index}
                benef={row}
                open={open}
                setOpen={setOpen}
                benefsQ={nodes.length}
              >
                {hasWriteBenefs && (
                  <TableCell>
                    <Box display='flex' flexDirection='row' justifyContent='space-between'>
                      {row.isActive && (
                        <Button
                          variant='contained'
                          sx={{mx: '.25em'}}
                          onClick={async () => {
                            try {
                              setSelectedBeneficiary(row)
                              setOpenConfirmAction(true)
                            } catch (err) {
                              setAction({
                                complete: true,
                                success: false,
                                message: 'Algo ha ocurrido desactivando el usuario. Intente nuevamente más tarde',
                                status: 400
                              });
                            }
                          }}
                        >
                          <Typography color={'white'}>Desactivar</Typography>
                        </Button>
                      )}
                      {!row.isActive && (
                        <Button
                          variant='contained'
                          sx={{mx: '.25em'}}
                          onClick={async () => {
                            try {
                              await activateBeneficiary(row.id ? row.id : '-1').then(() => refetchWithSameParameters());
                              setAction({
                                complete: true,
                                success: true,
                                message: 'Usuario activado exitosamente',
                                status: 200
                              });
                            } catch (err) {
                              setAction({
                                complete: true,
                                success: false,
                                message: 'Algo ha ocurrido activando el usuario. Intente nuevamente más tarde',
                                status: 400
                              });
                            }
                          }}
                        >
                          <Typography color={'white'}>Activar</Typography>
                        </Button>
                      )}
                      {row.isActive && (
                        <Button
                          variant='contained'
                          sx={{mx: '.25em'}}
                          onClick={() => {
                            setSelectedBeneficiary(row);
                            setOpenEditBeneficiary(true);
                          }}
                        >
                          <Typography color={'white'}>Editar</Typography>
                        </Button>
                      )}
                    </Box>
                  </TableCell>
                )}
              </DisplayBeneficiary>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {pageInfo !== undefined && (
        <BeneficiaryTablePagination
          paging={paging}
          setBeneficiariesPaging={setBeneficiariesPaging}
          pageInfo={pageInfo}
          nodes={nodes}
          edges={edges}
        />
      )}
      {openConfirmAction &&
        <ConfirmActionDialog openDialog={openConfirmAction} action={async () => {
          await deleteBeneficiary(selectedBeneficiary?.id as string).then(() => refetchWithSameParameters());
          setAction({
            complete: true,
            success: true,
            message: 'Usuario desactivado exitosamente',
            status: 200
          });
          setOpenConfirmAction(false)
        }} handleClose={() => setOpenConfirmAction(false)}/>
      }
      {openEditBeneficiary && !!selectedBeneficiary && (
        <BeneficiaryEditForm
          openDialog={openEditBeneficiary}
          handleClose={() => {
            setOpenEditBeneficiary(false);
            refetchWithSameParameters();
          }}
          setBeneficiaryEdited={setBeneficiaryEdited}
          communities={communities}
          action='Editar'
          beneficiary={selectedBeneficiary}
          setAction={setAction}
        />
      )}

    </Card>
  );
};

export default BeneficiariesTable;
