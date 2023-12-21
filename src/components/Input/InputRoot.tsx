import { InputHTMLAttributes, ReactNode, useRef } from "react";
import { twMerge } from 'tailwind-merge';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    handleOnChange: (value: string) => void;
    children: ReactNode;
    className: string
}

export const InputRoot = ({
    handleOnChange,
    children,
    className,
    ...rest
}: InputProps) => {

    const inputRef = useRef<HTMLInputElement>(null);
    const box = useRef<HTMLDivElement>(null);


    return (
        <div
            ref={box}
            className={twMerge("box-input relative w-80 transition-all h-13 rounded-md cursor-text border-2 border-zinc-500", className)}
            onClick={() => inputRef.current?.focus()}>

            <input ref={inputRef} className="w-full relative top-5 peer outline-none border-none p-2 h-7 placeholder-transparent text-zinc-700 bg-transparent"  placeholder="a" autoComplete="off" onChange={e => handleOnChange(e.target.value)} {...rest}
            />

            {children}
        </div>
    );
};
