import { type ChangeEvent, type FC, type FormEvent, useState } from 'react'
import { Button, Form, Input } from "shared/ui";
import { NavLink, useNavigate } from "react-router-dom";
import { type Auth, getAuth, signInWithEmailAndPassword, type UserCredential } from "firebase/auth";
import { useAppDispatch } from 'shared/lib/useAppDispatch'
import { setUser } from "entities/user";

export const Login: FC = () => {
  const [email, setEmail] = useState<string>('')
  const [pass, setPass] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const push = useNavigate()
  const dispatch = useAppDispatch()

  const validate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true)

    const auth: Auth = getAuth();

    signInWithEmailAndPassword(auth, email, pass)
      .then(({ user }: UserCredential) => {
        dispatch(setUser({
          email: user.email!,
          uid: user.uid,
          userName: user.displayName!
        }))

        push('/chat')
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false))
  }

  return (
    <Form
      id="login"
      onSubmit={(e: FormEvent<HTMLFormElement>) => validate(e)}
    >
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
      <Button type='submit' loading={loading}>Войти</Button>
      <NavLink className="link" to={'/sign-up'}>зарегистрироваться</NavLink>
    </Form>
  )
}
