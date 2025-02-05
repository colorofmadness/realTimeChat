import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { userReducer } from 'entities/user'
import { chatReducer } from 'entities/chat/'
import { getFirestore } from 'firebase/firestore';

const rootReducer = combineReducers({
  user: userReducer,
  chat: chatReducer
})

export const mainStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          getFirestore,
        },
      },
    }),
});

export type AppDispatch = typeof mainStore.dispatch;
export type RootState = ReturnType<typeof mainStore.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
