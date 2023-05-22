import React, {FC} from 'react';
import TablePagination from '@mui/material/TablePagination';
import {PAGE_LIMITS} from 'src/types/beneficiaries/BeneficiariesPaging';
import { useAppDispatch, useAppSelector } from 'src/hooks/reduxHooks';
import { updatePaging } from 'src/features/donations/donationsSlice';

interface DonationsTablePagingProps {
  pageInfo: any;
  edges: any;
}

const DonationsPagination: FC<DonationsTablePagingProps> = props => {
  const {pageInfo, edges} = props;
  const donationsSelector = useAppSelector(state => state.donations);
  const dispatch = useAppDispatch();

  const updateDonationsPaging = (newPageNumber: number, newPreviousCursors: string[], newCursor?: string) => {
    dispatch(
      updatePaging({
        ...donationsSelector.paging,
        ...{ pageNumber: newPageNumber, previousCursors: newPreviousCursors, pageCursor: newCursor }
      }));
  }

  return (
    <TablePagination
      component='div'
      count={
        donationsSelector.hasNextPage
          ? -1
          : donationsSelector.donations.length + donationsSelector.paging.pageNumber * donationsSelector.paging.limit
      }
      page={donationsSelector.paging.pageNumber}
      rowsPerPageOptions={[PAGE_LIMITS.SMALL, PAGE_LIMITS.MEDIUM, PAGE_LIMITS.LARGE]}
      labelRowsPerPage='Filas por página'
      labelDisplayedRows={function defaultLabelDisplayedRows({ from, to, count }) {
        return `${from}–${to} de ${count !== -1 ? count : `más de ${to}`}`;
      }}
      onPageChange={(e, newPageNumber) => {
        if (donationsSelector.paging.pageNumber > newPageNumber && donationsSelector.paging.previousCursors.length > 0) {
          const newPreviousCursors = [...donationsSelector.paging.previousCursors];
          const newCursor = newPreviousCursors.pop();
          updateDonationsPaging(newPageNumber, newPreviousCursors, newCursor);
        } else if (newPageNumber > donationsSelector.paging.pageNumber && donationsSelector.hasNextPage) {
          const newPreviousCursors = [...donationsSelector.paging.previousCursors];
          newPreviousCursors.push(edges.cursor);
          const newCursor = pageInfo.endCursor;
          updateDonationsPaging(newPageNumber, newPreviousCursors, newCursor);
        }
      }}
      rowsPerPage={donationsSelector.paging.limit}
      onRowsPerPageChange={e =>
        dispatch(updatePaging({ ...donationsSelector.paging, ...{ limit: parseInt(e.target.value) } }))
      }
    />
  );
};

export default DonationsPagination;
