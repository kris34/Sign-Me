import { configureStore } from '@reduxjs/toolkit'

import generalReducer from './slices/generalSlice';
import sessionSlice from './slices/sessionSlice'

export const store = configureStore({
    reducer: {
        general: generalReducer,
        session: sessionSlice
    },

})