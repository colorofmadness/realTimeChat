import type { FC } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './ChatElement.scss'
import { IGroup } from "entities/chat";
import clsx from "clsx";

export const ChatElement: FC<IGroup> = ({ id, name }) => {
  const navigate = useNavigate()
  const params = useParams()

  const openChat = () => {
    navigate('/chat/' + id)
  }

  const classes = clsx(
    [
      'chat-list__item',
      { 'chat-list__item chat-list__item--active': params.id === id }
    ]
  )

  return (
    <div
      className={classes}
      onClick={() => openChat()}
    >
      {name}
    </div>
  )
}
