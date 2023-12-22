import { ReactNode } from "react";

interface InputIconProps{
    children: ReactNode
}

export function InputIcon({ children }: InputIconProps) {
    return (
        <>
            {children}
        </>
    )
}