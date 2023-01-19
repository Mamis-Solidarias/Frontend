import { configureStore } from '@reduxjs/toolkit';

// Slices
import juntosReducer from 'src/features/juntosSlice';

export const store = configureStore({
  reducer: {
    juntos: juntosReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
