import React from 'react';

// ** MUI Imports

// ** Types Imports
import TablePagination from '@mui/material/TablePagination';
import { PAGE_LIMITS } from 'src/types/beneficiaries/BeneficiariesPaging';
import {useAppDispatch, useAppSelector} from "src/hooks/reduxHooks";
import {updatePaging} from "src/features/donations/donationsSlice";

export default () => {
  const donationsSelector = useAppSelector(state => state.donations);
  const dispatch = useAppDispatch();

  return (
    <TablePagination
      component='div'
      count={donationsSelector.hasNextPage ? -1 : donationsSelector.donations.length + donationsSelector.paging.pageNumber*donationsSelector.paging.limit}
      page={donationsSelector.paging.pageNumber}
      rowsPerPageOptions={[PAGE_LIMITS.SMALL, PAGE_LIMITS.MEDIUM, PAGE_LIMITS.LARGE]}
      labelRowsPerPage='Filas por página'
      labelDisplayedRows={function defaultLabelDisplayedRows({ from, to, count }) {
        return `${from}–${to} de ${count !== -1 ? count : `más de ${to}`}`;
      }}
      onPageChange={(e, newPageNumber) => {
        if (donationsSelector.paging.pageNumber > newPageNumber && donationsSelector.paging.previousCursors.length > 0) {
          const newPreviousCursors = donationsSelector.paging.previousCursors;
          const newCursor = newPreviousCursors.pop();
          dispatch(updatePaging({...donationsSelector.paging,
            ...{pageNumber: newPageNumber, previousCursors: newPreviousCursors, pageCursor: newCursor}}))
        } else if (newPageNumber > donationsSelector.paging.pageNumber && donationsSelector.hasNextPage) {
          const newPreviousCursors = donationsSelector.paging.previousCursors;
          if( !!donationsSelector.cursor) newPreviousCursors.push(donationsSelector.cursor);
          const newCursor = donationsSelector.endCursor;
          dispatch(updatePaging({...donationsSelector.paging,
            ...{pageNumber: newPageNumber, previousCursors: newPreviousCursors, pageCursor: newCursor}}))
        }
      }}
      rowsPerPage={donationsSelector.paging.limit}
      onRowsPerPageChange={e => dispatch(updatePaging({...donationsSelector.paging,...{'limit': parseInt(e.target.value)}}))}
    />
  );
};
