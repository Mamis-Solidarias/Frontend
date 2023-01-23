import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {CampaignsFilters, campaignsFiltersDefault, campaignsFiltersNull} from "../../types/campaigns/CampaignsFilters";
import {defaultEdition, JuntosEdition} from "../../types/campaigns/JuntosEdition";

interface JuntosPageData {
  openCreateJuntos: boolean;
  openEditJuntos: boolean;
  openFiltersCollapse: boolean;
  filtersApplied: CampaignsFilters;
  filtersToApply: CampaignsFilters;
  juntos: JuntosEdition;
  createJuntos: JuntosEdition
  refetchEditions?: (community: string) => void;
  campaign: string;
}

export const initialState: JuntosPageData = {
  openCreateJuntos: false,
  openEditJuntos: false,
  openFiltersCollapse: false,
  filtersApplied: campaignsFiltersDefault,
  filtersToApply: campaignsFiltersNull,
  juntos: defaultEdition,
  createJuntos: defaultEdition,
  campaign: '',
};

const juntosSlice = createSlice({
  name: 'juntos',
  initialState,
  reducers: {
    updateOpenCreateJuntos(state, action: PayloadAction<boolean>) {
      state.openCreateJuntos = action.payload;
    },
    updateOpenEditJuntos(state, action: PayloadAction<boolean>) {
      state.openEditJuntos = action.payload;
    },
    updateFiltersToApply(state, action: PayloadAction<CampaignsFilters>) {
      state.filtersToApply = action.payload;
    },
    updateFiltersApplied(state, action: PayloadAction<CampaignsFilters>) {
      state.filtersApplied = action.payload;
    },
    updateJuntos(state, action: PayloadAction<JuntosEdition>) {
      state.juntos = action.payload;
    },
    updateCreateJuntos(state, action: PayloadAction<JuntosEdition>) {
      state.createJuntos = action.payload;
    },
    updateRefreshEditions( state, action: PayloadAction<(community: string) => void>) {
      state.refetchEditions = action.payload;
    }
  }
});

export const { updateOpenCreateJuntos, updateOpenEditJuntos, updateFiltersToApply, updateFiltersApplied, updateJuntos, updateCreateJuntos } = juntosSlice.actions;
export default juntosSlice.reducer;
