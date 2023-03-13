import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DonationsRequest } from '../../types/donations/DonationsRequest';

interface CampaignPaymentData {
  assignPayment: boolean;
  paymentData: DonationsRequest;
}

export const initialState: CampaignPaymentData = {
  assignPayment: false,
  paymentData: {
    donorId: -1,
    amount: -1,
    participantId: -1,
    currency: 'ARS',
    campaign: '',
    campaignId: -1
  }
};

const campaignPaymentSlice = createSlice({
  name: 'campaignPayment',
  initialState,
  reducers: {
    updateAssignPayment(state, action: PayloadAction<boolean>) {
      state.assignPayment = action.payload;
    },
    updateCurrency(state, action: PayloadAction<string>) {
      state.paymentData.currency = action.payload;
    },
    updateAmount(state, action: PayloadAction<number>) {
      state.paymentData.amount = action.payload;
    },
    updateCampaign(state, action: PayloadAction<string>) {
      state.paymentData.campaign = action.payload;
    },
    updateCampaignId(state, action: PayloadAction<number>) {
      state.paymentData.campaignId = action.payload;
    },
    updateParticipantId(state, action: PayloadAction<number>) {
      state.paymentData.participantId = action.payload;
    },
    updateDonorId(state, action: PayloadAction<number>) {
      state.paymentData.donorId = action.payload;
    }
  }
});

export const {
  updateAssignPayment,
  updateCampaign,
  updateCurrency,
  updateParticipantId,
  updateCampaignId,
  updateAmount,
  updateDonorId
} = campaignPaymentSlice.actions;
export default campaignPaymentSlice.reducer;
