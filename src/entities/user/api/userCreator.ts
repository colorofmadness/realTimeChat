import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, doc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import type { IUser } from "entities/user"

export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  async (_, thunkApi) => {
    try {
      const users: IUser[] = []
      const querySnapshot = await getDocs(collection(getFirestore(), "users"))
      querySnapshot.forEach((doc) => {
        if (doc) {
          const { email, userName, uid } = doc.data() as IUser;

          users.push({
            email, userName, uid
          })
        }
      });
      return users
    } catch (e) {
      return thunkApi.rejectWithValue(e)
    }
  }
)

export const addUser = (email: string, userName: string, uid: string) => async () => {
  try {
    await setDoc(doc(getFirestore(), "users", uid), { userName, email, uid });
  } catch (e) {
    console.error(e);
  }
}
