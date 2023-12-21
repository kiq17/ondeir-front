import { LabelHTMLAttributes, ReactNode } from "react"

interface InputLabelProps extends LabelHTMLAttributes<HTMLLabelElement>{
    children: ReactNode;
}


export function InputLabel({ children, ...rest }: InputLabelProps) {
    return (
        <label className="transition-all relative bottom-7 left-2 peer-focus:text-emerald-600 text-sm text-zinc-500 pointer-events-none peer-focus:bottom-7 peer-focus:text-sm peer-placeholder-shown:bottom-3 peer-placeholder-shown:text-base" {...rest}>
            { children }
        </label >
    )
}