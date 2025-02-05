import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IChatState, IGroup, IMessages } from "./types.ts";

const initialState: IChatState = {
  groups: [],
  messages: []
}
const hatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setMessages(state: IChatState, action: PayloadAction<IMessages[]>) {
      state.messages = action.payload
    },
    setMessage(state: IChatState, action: PayloadAction<IMessages[]>) {
      state.messages = state.messages.concat(action.payload)
    },
    setGroups(state: IChatState, action: PayloadAction<IGroup[]>) {
      state.groups = action.payload
    }
  },
})

export const { setMessages, setGroups, setMessage } = hatSlice.actions

export default hatSlice.reducer
