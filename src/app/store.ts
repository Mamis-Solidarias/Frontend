import { configureStore } from '@reduxjs/toolkit';

// Slices
import juntosReducer from 'src/features/campaigns/juntosSlice';
import beneficiariesReducer from 'src/features/beneficiaries/beneficiariesSlice';

export const store = configureStore({
  reducer: {
    juntos: juntosReducer,
    beneficiaries: beneficiariesReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
