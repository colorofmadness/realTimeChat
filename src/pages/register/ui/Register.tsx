import { ChangeEvent, FC, FormEvent, useState } from 'react'
import { Button, Form, Input } from "shared/ui";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "shared/lib";
import { type Auth, createUserWithEmailAndPassword, getAuth, updateProfile, type UserCredential } from "firebase/auth";
import { addUser, setUser } from "entities/user";

export const Register: FC = () => {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [pass, setPass] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const push = useNavigate()
  const dispatch = useAppDispatch()

  const validate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const auth: Auth = getAuth();

    setLoading(true)

    createUserWithEmailAndPassword(auth, email, pass)
      .then(({ user }: UserCredential) => {
        updateProfile(user, {
          displayName: name
        }).then(async () => {
          dispatch(
            setUser({
              email: user.email!,
              userName: user.displayName!,
              uid: user.uid,
            })
          )
          await dispatch(addUser(email, name, user.uid))
          push('/chat')
        }).catch(e => console.error(e))
      })
      .catch(e => console.error(e))
      .finally(() => setLoading(false))
  }

  return (
    <Form
      id="register"
      onSubmit={(e: FormEvent<HTMLFormElement>) => validate(e)}
    >
      <Input
        type="text"
        label='Имя'
        name='name'
        value={name}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
      />
      <Input
        type="email"
        label='E-mail'
        name='email'
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        label='Пароль'
        name='pass'
        value={pass}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setPass(e.target.value)}
      />
      <Button type='submit' loading={loading}>Зарегистрироваться</Button>
      <NavLink className="link" to={'/login'}>войти</NavLink>
    </Form>
  )
}
