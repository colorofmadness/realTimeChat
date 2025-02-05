import { FC, FormHTMLAttributes } from 'react'
import './Form.scss'
import { IFormProps } from "./types.ts";

export const Form: FC<IFormProps & FormHTMLAttributes<HTMLFormElement>> = ({ children, ...props }) => {
  return (
    <div className="form-container">
      <form className="form" {...props}>
        {children}
      </form>
    </div>
  )
}
