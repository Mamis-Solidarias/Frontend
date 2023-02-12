import { configureStore } from '@reduxjs/toolkit';

// Slices
import juntosReducer from 'src/features/campaigns/juntosSlice';
import beneficiariesReducer from 'src/features/beneficiaries/beneficiariesSlice';
import campaignPaymentReducer from 'src/features/campaigns/paymentSlice';

export const store = configureStore({
  reducer: {
    juntos: juntosReducer,
    beneficiaries: beneficiariesReducer,
    campaignPayment: campaignPaymentReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
