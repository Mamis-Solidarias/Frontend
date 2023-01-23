import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  BeneficiariesFilters,
  beneficiariesFiltersDefaults
} from "src/types/beneficiaries/BeneficiariesFilters";

interface BeneficiariesPageData {
  filtersToApply: BeneficiariesFilters;
  filtersApplied: BeneficiariesFilters;
}

export const initialState: BeneficiariesPageData = {
  filtersToApply: beneficiariesFiltersDefaults,
  filtersApplied: beneficiariesFiltersDefaults,
};

const beneficiariesSlice = createSlice({
  name: 'beneficiaries',
  initialState,
  reducers: {
    updateFiltersToApply(state, action: PayloadAction<BeneficiariesFilters>) {
      state.filtersToApply = action.payload;
    },
    updateFiltersApplied(state, action: PayloadAction<BeneficiariesFilters>) {
      state.filtersApplied = action.payload;
    },
  }
});

export const { updateFiltersToApply, updateFiltersApplied } = beneficiariesSlice.actions;
export default beneficiariesSlice.reducer;
