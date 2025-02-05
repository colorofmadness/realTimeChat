import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { IUser, IUserState } from "./types";
import { fetchUsers } from "entities/user";

const initialState: IUserState = {
  email: '',
  uid: '',
  userName: '',
  users: []
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state: IUserState, action: PayloadAction<IUser>) {
      state.email = action.payload.email
      state.uid = action.payload.uid
      state.userName = action.payload.userName
    },
    removeUser(state) {
      state.email = ''
      state.uid = ''
      state.userName = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state: IUserState, action: PayloadAction<IUser[]>) => {
        state.users = action.payload
      })
  },
})

export const { setUser, removeUser } = userSlice.actions

export default userSlice.reducer
