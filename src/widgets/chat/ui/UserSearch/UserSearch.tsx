import { type ChangeEvent, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './UserSearch.scss'
import { MultiSelect, type Option } from "react-multi-select-component";
import { fetchUsers, IUser } from "entities/user";
import { useAppDispatch, useAppSelector } from "shared/lib";
import { createGroup } from "entities/chat";
import { Button, Input } from "shared/ui";


export const UserSearch = () => {

  const [selected, setSelected] = useState<Option[]>([])
  const [chatName, setchatName] = useState<string>('')

  const users: IUser[] = useAppSelector(state => state.user.users)
  const userID: string = useAppSelector(state => state.user.uid)
  const navigate = useNavigate()

  const mappedOptions: Option[] = useMemo(
    () => users
      .filter(user => user.uid !== userID)
      .map(user => ({ value: user.uid, label: user.userName })),
    [users]
  );

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  const createChat = () => {

    if (!selected.length) return

    dispatch(createGroup({
      groupName: chatName,
      uid: userID,
      usersArray: [...selected.map(el => el.value), userID],
    })).then(res => {
      if (typeof res.payload === "string") {
        navigate('/chat/' + res.payload)
      }
    }).catch(e => console.error(e));
    setSelected([])
    setchatName('')
  }

  return (
    <div className="user-search">
      <MultiSelect
        onChange={setSelected}
        labelledBy="Пользователи"
        className='user-select'
        options={mappedOptions}
        value={selected}
      />
      <Input
        className='input-group'
        label='Название чата'
        name='message'
        value={chatName}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setchatName(e.target.value)}
      />
      {Boolean(selected.length) && <Button onClick={() => createChat()}>Создать чат</Button>}
    </div>
  )
}
