import { ButtonHTMLAttributes, ReactNode } from "react";


export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  loading?: boolean;
  children?: ReactNode;
}
