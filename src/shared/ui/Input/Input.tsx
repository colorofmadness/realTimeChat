import { FC, useId } from 'react'
import './Input.scss'
import { IInputProps } from './types.ts'
import clsx from 'clsx';

export const Input: FC<IInputProps> = ({ label, name, className, ...attrs }) => {
  const id: string = useId()

  const computedClasses = clsx([
    'input-group__input',
    className,
    {
      'input-group__input--active': !!attrs.value,
    }
  ])

  return (
    <div className="input-group">
      <input className={computedClasses} name={name} id={id} {...attrs} />
      <label htmlFor={id} className="input-group__label">{label}</label>
    </div>
  )
}
