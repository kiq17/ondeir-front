import { KeyboardEvent, useEffect, useMemo, useRef, useState } from "react"
import { faXmark, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styleSelect.css";
import clsx from 'clsx';

export interface selectOption {
    value: any
    label: string;
}

type multipleSelectProps = {
    multiple: true;
    value: selectOption[]
    onChange: (value: selectOption[]) => void
}

type singleSelectProps = {
    multiple?: false;
    value?: selectOption
    onChange: (value: selectOption | undefined) => void
}

type selcetProps = {
    options: selectOption[]
} & (singleSelectProps | multipleSelectProps)

export const Select = ({ multiple, value, options, onChange }: selcetProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [highLights, setHighLights] = useState<number[]>([]);
    const [inputValue, setInptValue] = useState("");
    const conteinerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const filteredOptions = useMemo(() => {
        return options.filter(item => {
            return item.label.toLowerCase().includes(inputValue.toLowerCase())
        })
    }, [inputValue, isOpen])

    const clearOptions = (e: React.MouseEvent) => {
        e.stopPropagation()
        multiple ? onChange([]) : onChange(undefined)

        setHighLights([]);
    }

    const selected = (option: selectOption, index?: number) => {
        if (index !== undefined) {
            if (highLights.includes(index)) {
                setHighLights(prev => prev.filter(i => i != index))
            } else {
                setHighLights(prev => [...prev, index]);
            }
        }
        if (multiple) {
            if (value.includes(option)) {
                const indexFinded = options.findIndex(val => val == option);
                onChange(value.filter(o => o !== option))
                setHighLights(prev => prev.filter(i => i != indexFinded));
            } else {
                onChange([...value, option])
            }
        } else {
            onChange(option)
        }
    }

    useEffect(() => {
        const handler = (e: Event) => {
            if (e.target != conteinerRef.current) return
            const k = (e as unknown as KeyboardEvent);
            switch (k.code) {
                case "Space":
                    setIsOpen(prev => !prev);
                    break;
                default:
                    break;
            }
        }

        conteinerRef.current?.addEventListener("keydown", handler);

        return () => {
            conteinerRef.current?.removeEventListener("keydown", handler);
        }
    }, [isOpen])


    return (
        <div tabIndex={0} className="select-box"
            onClick={() => { setIsOpen(true); inputRef.current?.focus(); }}
            ref={conteinerRef}>
            <div className="select-tags">
                {multiple ? (
                    value.map(item => (
                        <span className="select-tag-single" key={item.value}>
                            <button onClick={e => {
                                e.stopPropagation();
                                selected(item)
                            }} className="select-tag-button">
                                {item.label}
                                <FontAwesomeIcon icon={faXmark} className="icon-tag-single" />
                            </button>
                        </span>
                    ))
                ) : (value?.label)}
                <input ref={inputRef}
                    className="select-input-tag" type="text"
                    value={inputValue}
                    onChange={(e) => setInptValue(e.target.value)}
                />
            </div>
            <div className="select-divisor-box">
                <FontAwesomeIcon icon={faXmark} className="icon-clean-all" role={"button"} onClick={clearOptions} />
                <div className="select-divisor"></div>
                <FontAwesomeIcon icon={faCaretDown} className="icon-close-select" style={{transform: `${isOpen ? "rotate(180deg)" : ""}`}} onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen) }}/>
            </div>
            <ul style={{ top: "calc(100% + .30em)", visibility: `${isOpen ? "visible" : "hidden"}` }} className={`select-list-tags`}
                onMouseLeave={() => { setIsOpen(false); inputRef.current?.blur(); }}
            >
                {filteredOptions.length > 0 ? (
                    filteredOptions.map((option, index) => {
                        return (
                            <li style={{ backgroundColor: `${highLights.includes(index) ? "#d4d4d8" : ""}` }} className={`select-option-tag`} key={option.value}
                                onClick={e => {
                                    e.stopPropagation();
                                    selected(option, index);
                                    setInptValue("");
                                }}
                            >
                                {option.label}
                            </li>
                        )
                    }
                    )) :
                    (<p style={{ padding: "0.5rem" }}>
                        {clsx("", {
                            "Nenhuma tag foi adicionada.": options.length == 0,
                            [`"${inputValue}" não foi encontrado.`]: options.length > 0
                        })}                  
                    </p>)
                }
            </ul>
        </div >
    )
}