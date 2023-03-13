import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  CampaignsFilters,
  campaignsFiltersDefault,
  campaignsFiltersNull
} from '../../types/campaigns/CampaignsFilters';
import {
  defaultEdition,
  defaultEditionModify,
  JuntosEdition,
  JuntosEditionModify
} from '../../types/campaigns/JuntosEdition';

interface JuntosPageData {
  openCreateJuntos: boolean;
  openEditJuntos: boolean;
  openFiltersCollapse: boolean;
  filtersApplied: CampaignsFilters;
  filtersToApply: CampaignsFilters;
  juntos: JuntosEdition;
  createJuntos: JuntosEdition;
  editJuntos: JuntosEditionModify;
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
  editJuntos: defaultEditionModify,
  campaign: ''
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
    updateEditJuntos(state, action: PayloadAction<JuntosEditionModify>) {
      state.editJuntos = action.payload;
    },
    updateRefreshEditions(state, action: PayloadAction<(community: string) => void>) {
      state.refetchEditions = action.payload;
    },
    updateOpenCollapse(state, action: PayloadAction<boolean>) {
      state.openFiltersCollapse = action.payload;
    }
  }
});

export const {
  updateOpenCreateJuntos,
  updateOpenEditJuntos,
  updateFiltersToApply,
  updateFiltersApplied,
  updateEditJuntos,
  updateJuntos,
  updateCreateJuntos,
  updateOpenCollapse
} = juntosSlice.actions;
export default juntosSlice.reducer;
