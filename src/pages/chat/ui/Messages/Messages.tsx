import type {ChangeEvent, FC, FormEvent, RefObject} from 'react'
import {useEffect, useRef, useState} from 'react'
import './Messages.scss'
import {useNavigate, useParams} from 'react-router-dom'
import type {DocumentData} from 'firebase/firestore'
import {collection, getFirestore, onSnapshot, orderBy, query} from 'firebase/firestore'
import {Button, Input} from 'shared/ui'
import {useAppDispatch, useAppSelector} from 'shared/lib'
import type {IMessages} from "entities/chat";
import {Message, saveMessage, setMessage, setMessages} from "entities/chat";

export const Messages: FC = () => {
  const dispatch = useAppDispatch()
  const params = useParams()
  const navigate = useNavigate()
  const messageBlock: RefObject<HTMLDivElement> = useRef(null)
  const messages: IMessages[] = useAppSelector(state => state.chat.messages)
  const [message, setMessageValue] = useState<string>('')
   
  const [lastVisible, setLastVisible] = useState<DocumentData>([])
  const [loading, setLoading] = useState<boolean>(true)
  console.log(lastVisible)
  // const fetchMessages = async (id: string) => {
  //   const messages: IMessages[] = []
  //   const next = query(collection(getFirestore(), "message", id, "messages"),
  //     orderBy('sentAt', 'desc'),
  //     startAfter(lastVisible),
  //     limit(10));
  //   const documentSnapshots = await getDocs(next);
  //
  //   documentSnapshots.forEach(doc => {
  //     messages.push({
  //       messageText: doc.data().messageText,
  //       sentAt: doc.data()?.sentAt?.toDate()?.toDateString(),
  //       sentBy: doc.data().sentBy,
  //       name: doc.data().name
  //     })
  //   });
  //   dispatch(setMessages(messages.reverse()))
  // }

  const exitChat = (e: KeyboardEvent) => {
    if (e.key === "Escape") navigate('/chat')
  }

  const sendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (message && params.id) {
      dispatch(saveMessage({groupID: params.id, message}))
      setMessageValue('')
    }
  }

  const scrollToEnd = (behavior = true) => {

    if (messageBlock.current) {
      messageBlock.current.scrollTo({
        behavior: behavior ? "smooth" : "auto",
        top: messageBlock.current.scrollHeight
      })
    }

  }

  useEffect(() => {
    if (params.id) {
      const unsub = onSnapshot(query(collection(getFirestore(), "message", params.id, "messages"), orderBy('sentAt', 'desc')), (doc) => {
        const messages: IMessages[] = []
        const docs: DocumentData[] = []

        if (!doc.metadata.hasPendingWrites) {
          doc.docChanges().forEach((change) => {
            if (change.type === "added" || change.type === 'modified') {
              if (change.doc) {
                const message = change.doc.data() as IMessages

                messages.push({
                  messageText: message.messageText,
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-expect-error
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  sentAt: message.sentAt.seconds,
                  sentBy: message.sentBy,
                  name: message.name
                })

                docs.push(change.doc)
              }
            }
          })
          if (messages.length === 1) {
            dispatch(setMessage(messages))
          } else {
            setLastVisible(docs[docs.length - 1])
            dispatch(setMessages(messages.reverse()))
          }
          setTimeout(() => setLoading(false), 500)
        }
      })
      return () => {
        setLoading(true)
        unsub()
      }
    }
  }, [params.id])

  useEffect(() => {
    scrollToEnd(false)
  }, [loading])

  useEffect(() => {
    if (!loading) {
      scrollToEnd()
    }
  }, [messages])

  useEffect(() => {
    document.body.addEventListener('keyup', exitChat)
    return () => {
      document.body.removeEventListener('keyup', exitChat)
    }
  }, [])

  if (loading) return <div className='no-chat'>Загрузка ваших сообщений...</div>

  return (
    <section className="messages">
      {messages.length
        ?
        <div ref={messageBlock} className="messages__container">
          {messages.map((message, index) => <Message {...message} key={index}/>)}
        </div>
        :
        <div className='no-chat'>Сообщений ещё нет, напишите первым</div>
      }
      <form className="messages__input" onSubmit={(e: FormEvent<HTMLFormElement>) => sendMessage(e)}>
        <Input label='Отправить сообщение' name='message' value={message}
               onChange={(e: ChangeEvent<HTMLInputElement>) => setMessageValue(e.target.value)}/>
        <Button type='submit'>Отправить</Button>
      </form>
    </section>
  )
}
