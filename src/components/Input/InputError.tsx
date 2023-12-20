import { ExclamationCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/20/solid";

type ErrorObj = {
    value: string,
    error: string
}

interface InputIconProps {
    state: ErrorObj
    stantard: string;
}

export function InputError({ stantard, state }: InputIconProps) {
    if (state.error.length > 0) {
        return (
            <p className={"text-red-500 text-sm absolute animate-errorAni left-2 flex gap-2"}>
                <ExclamationCircleIcon className="h-5 w-5" />
                {state.error}
            </p>
        )
    }

    return (
        <p className={state.value ? "text-zinc-500 text-sm absolute animate-errorAni left-2 flex gap-2" : "hidden"}>
            <ExclamationTriangleIcon className="text-yellow-500 h-5 w-5" />
            {stantard}
        </p>
    )
}