import { getAuth, signOut } from 'firebase/auth'
import { type FC } from 'react'
import { NavLink, Outlet, useParams } from 'react-router-dom'
import './Chat.scss'
import { useAppDispatch } from "shared/lib";
import { Button } from "shared/ui";
import { removeUser } from "entities/user";
import { ChatList, UserSearch } from "widgets/chat";

export const Chat: FC = () => {
  const auth = getAuth()
  const dispatch = useAppDispatch()
  const params = useParams()

  const logout = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser())
      })
      .catch((e) => console.error(e))
  }

  return (
    <div className='container chat__container'>
      <div className="chat__header">
        <NavLink to={'/'}>Чат</NavLink>
        <Button onClick={() => logout()} type={'submit'}>выйти</Button>
      </div>
      <div className="left-side">
        <UserSearch/>
        <ChatList/>
      </div>
      <div className="right-side">
        {params.id ?
          <Outlet/>
          :
          <div className="no-chat">
            Выберите чат
            или создайте новую беседу
          </div>
        }
      </div>
    </div>
  )
}
