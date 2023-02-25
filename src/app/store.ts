import { configureStore } from '@reduxjs/toolkit';

// Slices
import juntosReducer from 'src/features/campaigns/juntosSlice';
import abrigaditosReducer from 'src/features/campaigns/abrigaditosSlice';
import beneficiariesReducer from 'src/features/beneficiaries/beneficiariesSlice';
import campaignPaymentReducer from 'src/features/campaigns/paymentSlice';
import donationsReducer from 'src/features/donations/donationsSlice';

export const store = configureStore({
  reducer: {
    juntos: juntosReducer,
    beneficiaries: beneficiariesReducer,
    abrigaditos: abrigaditosReducer,
    campaignPayment: campaignPaymentReducer,
    donations: donationsReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
