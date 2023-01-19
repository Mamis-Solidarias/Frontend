import React, { FC } from 'react';

// ** MUI Imports

// ** Types Imports
import TablePagination from '@mui/material/TablePagination';
import { PAGE_LIMITS } from 'src/types/beneficiaries/BeneficiariesPaging';
import { DonorsPaging } from 'src/types/donors/DonorsPaging';

interface DonorsTablePaginationProps {
  paging: DonorsPaging;
  setDonorsPaging: (key: keyof DonorsPaging, value: any) => void;
  pageInfo: any;
  nodes: any;
  edges: any;
}

const DonorsTablePagination: FC<DonorsTablePaginationProps> = props => {
  const { paging, setDonorsPaging, pageInfo, nodes, edges } = props;

  return (
    <TablePagination
      component='div'
      count={pageInfo.hasNextPage ? -1 : nodes.length}
      page={paging.pageNumber}
      rowsPerPageOptions={[PAGE_LIMITS.SMALL, PAGE_LIMITS.MEDIUM, PAGE_LIMITS.LARGE]}
      labelRowsPerPage='Filas por página'
      labelDisplayedRows={function defaultLabelDisplayedRows({ from, to, count }) {
        return `${from}–${to} de ${count !== -1 ? count : `más de ${to}`}`;
      }}
      onPageChange={(e, newPageNumber) => {
        if (paging.pageNumber > newPageNumber && paging.previousCursors.length > 0) {
          const newPreviousCursors = paging.previousCursors;
          const newCursor = newPreviousCursors.pop();
          setDonorsPaging('pageNumber', newPageNumber);
          setDonorsPaging('previousCursors', newPreviousCursors);
          setDonorsPaging('pageCursor', newCursor);
        } else if (newPageNumber > paging.pageNumber && pageInfo.hasNextPage) {
          const newPreviousCursors = paging.previousCursors;
          newPreviousCursors.push(edges.cursor);
          const newCursor = pageInfo.endCursor;
          setDonorsPaging('pageNumber', newPageNumber);
          setDonorsPaging('previousCursors', newPreviousCursors);
          setDonorsPaging('pageCursor', newCursor);
        }
      }}
      rowsPerPage={paging.limit}
      onRowsPerPageChange={e => setDonorsPaging('limit', e.target.value)}
    />
  );
};

export default DonorsTablePagination;
