import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import Donation from "src/types/donations/Donation";
import DonationFilters, {defaultFilters} from "../../types/donations/DonationFilters";
import {defaultPagingSettings, DonationsPaging} from "../../types/donations/DonationsPaging";

interface DonationsPageData {
  hasNextPage: boolean;
  hasWriteDonations: boolean;
  openAddDonation: boolean;
  openFiltersCollapse: boolean;
  filtersApplied: DonationFilters;
  filtersToApply: DonationFilters;
  donations: Donation[];
  editDonation?: Donation;
  addDonation?: Donation;
  paging: DonationsPaging;
  cursor: string | null;
  endCursor?: string;
  openCollapsible: boolean[],
}

export const initialState: DonationsPageData = {
  hasNextPage: false,
  hasWriteDonations: false,
  openAddDonation: false,
  openFiltersCollapse: false,
  filtersApplied: defaultFilters,
  filtersToApply: defaultFilters,
  donations: [],
  paging: defaultPagingSettings,
  cursor: null,
  openCollapsible: [],
};

const donationsSlice = createSlice({
  name: 'donations',
  initialState,
  reducers: {
    updateOpenAddDonation(state, action: PayloadAction<boolean>) {
      state.openAddDonation = action.payload;
    },
    updateOpenFiltersCollapse(state, action: PayloadAction<boolean>) {
      state.openFiltersCollapse = action.payload;
    },
    updateFiltersApplied(state, action: PayloadAction<DonationFilters>) {
      state.filtersApplied = action.payload;
    },
    updateFiltersToApply(state, action: PayloadAction<DonationFilters>) {
      state.filtersToApply = action.payload;
    },
    updateDonations(state, action: PayloadAction<Donation[]>) {
      state.donations = action.payload;
    },
    updateHasWriteDonations(state, action: PayloadAction<boolean>) {
      state.hasWriteDonations = action.payload;
    },
    updatePaging(state, action: PayloadAction<DonationsPaging>) {
      state.paging = action.payload;
    },
    updateHasNextPage(state, action: PayloadAction<boolean>) {
      state.hasNextPage = action.payload;
    },
    updateCursor(state, action: PayloadAction<string | null>) {
      state.cursor = action.payload;
    },
    updateEndCursor(state, action: PayloadAction<string>) {
      state.cursor = action.payload;
    },
    updateCollapseDonations(state, action: PayloadAction<number>) {
      const openCollapsible = state.openCollapsible;
      openCollapsible[action.payload] = !openCollapsible[action.payload];
      state.openCollapsible = openCollapsible;
    }
  }
});

export const {
  updateDonations,
  updateFiltersToApply,
  updateOpenFiltersCollapse,
  updateFiltersApplied,
  updateOpenAddDonation,
  updatePaging,
  updateHasNextPage,
  updateHasWriteDonations,
  updateCursor,
  updateCollapseDonations
} = donationsSlice.actions;
export default donationsSlice.reducer;
