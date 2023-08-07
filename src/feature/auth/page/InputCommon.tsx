import { TypeOptions } from "i18next";
import { ReactNode } from "react";

interface InputCommonI {
  name?: string;
  lable?: string | (TypeOptions['returnNull'] extends true ? null : never);
  subLable?: ReactNode
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  className?: string;
}

export const InputCommon = ({ name, lable, onChange, subLable, type = 'text', className }: InputCommonI) => {
  return (
    <div className={`flex flex-col space-y-1 grow ${className ? className : null}`}>
      <div className="flex items-center justify-between">
        <label htmlFor={name} className="text-sm font-semibold text-gray-500">{lable}</label>
        {subLable}
      </div>
      <input
        type={type}
        name={name}
        id={name}
        autoFocus
        onChange={(e) => onChange ? onChange(e) : null}
        className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
      />
    </div>
  )
}
