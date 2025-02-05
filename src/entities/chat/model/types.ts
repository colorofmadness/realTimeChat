export interface IGroup {
  id: string,
  name: string,
  createdAt: string,
  createdBy: string,
  members: string[]
}

export interface IMessages {
  messageText: string,
  sentAt: string,
  sentBy: string,
  name: string
}

export interface IChatState {
  groups: IGroup[],
  messages: IMessages[]
}
