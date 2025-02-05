import {type FC} from 'react'

import './Message.scss'
import {useAppSelector} from "shared/lib";
import {IMessages} from "entities/chat";

export const Message: FC<IMessages> = ({messageText, sentAt, sentBy, name}) => {
  const uid = useAppSelector(state => state.user.uid)

  return (
    <div className={sentBy === uid ? "message message--you" : "message"}>
      <div className="message__text">{messageText}</div>
      {sentBy !== uid && <div className="message__name">{name}</div>}
      <div className="message__date">{sentAt}</div>
    </div>
  )
}
