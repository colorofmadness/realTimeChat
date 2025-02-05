import { FC } from 'react'
import { IButtonProps } from './types.ts'
import './Button.scss'
import clsx from "clsx";

export const Button: FC<IButtonProps> = ({ children, disabled, loading, className, ...props }) => {

  const computedClasses = clsx([
    'btn',
    className,
    {
      'btn--disabled': disabled,
      'btn--loading': loading,
    }
  ])

  return (
    <button
      {...(props)}
      className={computedClasses}
      disabled={disabled}
    >
      {loading
        ?
        <div className="btn__loader">
          <span></span>
          <span></span>
          <span></span>
        </div>
        :
        children
      }
    </button>
  );
}
