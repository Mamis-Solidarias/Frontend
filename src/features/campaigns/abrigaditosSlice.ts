import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {CampaignsFilters, campaignsFiltersDefault, campaignsFiltersNull} from "src/types/campaigns/CampaignsFilters";
import {
  AbrigaditosEdition,
  AbrigaditosEditionModify,
  defaultEdition,
  defaultEditionModify
} from "src/types/campaigns/AbrigaditosEdition";

interface AbrigaditosPageData {
  openCreateAbrigaditos: boolean;
  openEditAbrigaditos: boolean;
  openFiltersCollapse: boolean;
  filtersApplied: CampaignsFilters;
  filtersToApply: CampaignsFilters;
  abrigaditos: AbrigaditosEdition;
  createAbrigaditos: AbrigaditosEdition
  editAbrigaditos: AbrigaditosEditionModify;
  refetchEditions?: (community: string) => void;
  campaign: string;
}

export const initialState: AbrigaditosPageData = {
  openCreateAbrigaditos: false,
  openEditAbrigaditos: false,
  openFiltersCollapse: false,
  filtersApplied: campaignsFiltersDefault,
  filtersToApply: campaignsFiltersNull,
  abrigaditos: defaultEdition,
  createAbrigaditos: defaultEdition,
  editAbrigaditos: defaultEditionModify,
  campaign: '',
};

const abrigaditosSlice = createSlice({
  name: 'abrigaditos',
  initialState,
  reducers: {
    updateOpenCreateAbrigaditos(state, action: PayloadAction<boolean>) {
      state.openCreateAbrigaditos = action.payload;
    },
    updateOpenEditAbrigaditos(state, action: PayloadAction<boolean>) {
      state.openEditAbrigaditos = action.payload;
    },
    updateFiltersToApply(state, action: PayloadAction<CampaignsFilters>) {
      state.filtersToApply = action.payload;
    },
    updateFiltersApplied(state, action: PayloadAction<CampaignsFilters>) {
      state.filtersApplied = action.payload;
    },
    updateAbrigaditos(state, action: PayloadAction<AbrigaditosEdition>) {
      state.abrigaditos = action.payload;
    },
    updateCreateAbrigaditos(state, action: PayloadAction<AbrigaditosEdition>) {
      state.createAbrigaditos = action.payload;
    },
    updateEditAbrigaditos(state, action: PayloadAction<AbrigaditosEditionModify>) {
      state.editAbrigaditos = action.payload;
    },
    updateRefreshEditions( state, action: PayloadAction<(community: string) => void>) {
      state.refetchEditions = action.payload;
    },
    updateOpenCollapse( state, action: PayloadAction<boolean>) {
      state.openFiltersCollapse = action.payload;
    }
  }
});

export const { updateOpenCreateAbrigaditos, updateOpenEditAbrigaditos, updateFiltersToApply, updateFiltersApplied,
  updateEditAbrigaditos, updateAbrigaditos, updateCreateAbrigaditos, updateOpenCollapse } = abrigaditosSlice.actions;
export default abrigaditosSlice.reducer;
