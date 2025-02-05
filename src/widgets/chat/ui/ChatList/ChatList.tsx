import {collection, getFirestore, onSnapshot, query, where} from 'firebase/firestore'
import type {FC} from 'react'
import {useEffect} from 'react'
import './ChatList.scss'
import type {IGroup} from "entities/chat";
import {ChatElement, setGroups} from "entities/chat";
import {useAppDispatch, useAppSelector} from "shared/lib";

export const ChatList: FC = () => {
  const userID: string = useAppSelector(state => state.user.uid)
  const groups: IGroup[] = useAppSelector(state => state.chat.groups)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (userID) {
      const unsub = onSnapshot(query(collection(getFirestore(), 'groups'), where('members', 'array-contains', userID)), (doc) => {
        const groups: IGroup[] = []
        doc.forEach(change => {
          if (change) {
            const group = change.data() as IGroup
            groups.push({
              id: group.id,
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              createdAt: group?.createdAt.seconds,
              createdBy: group.createdBy,
              members: group.members,
              name: group.name
            })
          }
        })
        groups.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        })
        dispatch(setGroups(groups))
      })

      return () => {
        unsub()
      }
    }
  }, [userID])

  return (
    <div className="chat-list">
      <b>{groups.length ? "Список чатов" : "У вас ещё нет чатов"}</b>
      {Boolean(groups.length) && groups.map((group, index) => <ChatElement {...group} key={index}/>)}
    </div>
  )
}
