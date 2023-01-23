import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {CampaignsFilters, campaignsFiltersNull} from "../types/campaigns/CampaignsFilters";

interface JuntosPageData {
  openCreateJuntos: boolean;
  openEditJuntos: boolean;
  openFiltersCollapse: boolean;
  filtersApplied: CampaignsFilters;
  filtersToApply: CampaignsFilters;
}

export const initialState: JuntosPageData = {
  openCreateJuntos: false,
  openEditJuntos: false,
  openFiltersCollapse: false,
  filtersApplied: campaignsFiltersNull,
  filtersToApply: campaignsFiltersNull,
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
  }
});

export const { updateOpenCreateJuntos, updateOpenEditJuntos, updateFiltersToApply, updateFiltersApplied } = juntosSlice.actions;
export default juntosSlice.reducer;
