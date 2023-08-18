import React, { FC } from 'react';

// ** MUI Imports

// ** Types Imports
import TablePagination from '@mui/material/TablePagination';
import { PAGE_LIMITS } from 'src/types/beneficiaries/BeneficiariesPaging';
import { BeneficiariesPaging } from '../../types/beneficiaries/BeneficiariesPaging';

interface BeneficiariesTableProps {
  paging: BeneficiariesPaging;
  setBeneficiariesPaging: (key: keyof BeneficiariesPaging, value: any) => void;
  pageInfo: any;
  nodes: any;
  edges: any;
  totalCount: number;
}

const BeneficiariesTable: FC<BeneficiariesTableProps> = props => {
  const { paging, setBeneficiariesPaging, pageInfo, nodes, edges, totalCount } = props;

  return (
    <TablePagination
      component='div'
      count={pageInfo.hasNextPage ? -1 : nodes.length + paging.pageNumber * paging.limit}
      page={paging.pageNumber}
      rowsPerPageOptions={[PAGE_LIMITS.SMALL, PAGE_LIMITS.MEDIUM, PAGE_LIMITS.LARGE]}
      labelRowsPerPage='Filas por página'
      labelDisplayedRows={function defaultLabelDisplayedRows({ from, to}) {
        return `${from}–${to} de ${totalCount}`;
      }}
      onPageChange={(e, newPageNumber) => {
        if (paging.pageNumber > newPageNumber && paging.previousCursors.length > 0) {
          const newPreviousCursors = [...paging.previousCursors];
          console.log(newPreviousCursors, newPreviousCursors.length);
          const newCursor = newPreviousCursors.pop();
          console.log(newPreviousCursors, newPreviousCursors.length);
          setBeneficiariesPaging('pageNumber', newPageNumber);
          setBeneficiariesPaging('previousCursors', newPreviousCursors);
          setBeneficiariesPaging('pageCursor', newCursor === '' ? undefined : newCursor);
        } else if (newPageNumber > paging.pageNumber && pageInfo.hasNextPage) {
          const newPreviousCursors = [];
          if( paging.previousCursors.length === 0 ) {
            newPreviousCursors.push('', edges[0].cursor);
          } else {
            newPreviousCursors.push(...paging.previousCursors, edges[0].cursor);
          }
          console.log(newPreviousCursors, newPreviousCursors.length);
          const newCursor = pageInfo.endCursor;
          setBeneficiariesPaging('pageNumber', newPageNumber);
          setBeneficiariesPaging('previousCursors', newPreviousCursors);
          setBeneficiariesPaging('pageCursor', newCursor);
        }
      }}
      rowsPerPage={paging.limit}
      onRowsPerPageChange={e => setBeneficiariesPaging('limit', e.target.value)}
    />
  );
};

export default BeneficiariesTable;
