export interface IUser {
  userName: string,
  email: string,
  uid: string
}

export interface IUserState {
  email: string,
  uid: string,
  userName: string,
  users: IUser[],
}
