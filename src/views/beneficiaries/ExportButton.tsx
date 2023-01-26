import React from "react";
import * as Excel from "exceljs";
import Button from "@mui/material/Button";
import Beneficiary from "src/types/beneficiaries/Beneficiary";
import GENDERS from "src/types/beneficiaries/Genders";
import BENEFICIARY_TYPES from "src/types/beneficiaries/BeneficiaryTypes";
import {SCHOOL_YEARS} from "src/types/beneficiaries/SchoolYear";
import {Cell, Column, Worksheet} from "exceljs";
import {BeneficiariesFilters} from "src/types/beneficiaries/BeneficiariesFilters";
import {useQuery} from "@apollo/client";
import {GET_BENEFICIARIES} from "../../API/Beneficiaries/beneficiaries_grapql";
import {Action} from "src/types/Action";
import * as FileSaver from 'file-saver';

interface ExportButtonProps {
  filters: BeneficiariesFilters;
  setAction: (action: Action) => void;
}

export default (props: ExportButtonProps) => {
  const {filters, setAction} = props;

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

  const getBeneficiaries = () => {
    return {
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
      isActive: !!filters.isActive ? (filters.isActive === 'true') : null,
    }
  }

  const {data, refetch} = useQuery(GET_BENEFICIARIES, {
    variables: getBeneficiaries(),
  });

  const nodes = data === undefined ? [] : data.filteredBeneficiaries.nodes;

  const translate = (entryName: keyof typeof nombresFiltros, value: any): string => {
    switch (entryName) {
      case "type": return BENEFICIARY_TYPES[value as keyof typeof BENEFICIARY_TYPES];
      case "gender": return GENDERS[value as keyof typeof GENDERS];
      case "isActive": return !!value ? 'Sí':'No';
      default: return value;
    }
  }

  const exportToExcel = async () => {
    try {
      await refetch(getBeneficiaries());
      const workbook = new Excel.Workbook();
      const worksheet = workbook.addWorksheet('Beneficiarios Filtrados');
      worksheet.addRow(['Filtros']);
      worksheet.addRow(Object.entries(filters).map(entry => nombresFiltros[entry[0] as keyof typeof nombresFiltros] + ': '
                                                      + (!!entry[1] ? translate(entry[0] as keyof typeof nombresFiltros, entry[1]): '-')));
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

  return <Button variant='contained' sx={{mx: '.5em'}} onClick={async () => await exportToExcel()}>Exportar</Button>
}
