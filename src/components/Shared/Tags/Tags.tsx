import { useEffect, useRef, useState } from "react"
import "./styleTags.css";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface tagsProps {
    onChange: (tags: string[]) => void
    value: string[]
}

export const Tags = ({ onChange, value }: tagsProps) => {
    const input = useRef<HTMLInputElement>(null);
    const [tags, setTags] = useState<string[]>(value)

    const focusInput = () => {
        if (input.current) {
            input.current.focus()
        }
    }

    useEffect(()=>{
        onChange(tags);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tags])
    //criar useEffect para toda vez que tags mudar executa o onChange

    const removeTag = (i: number) => {
        const currentTag = tags[i]

        const filteredTags = tags.filter(tag => tag !== currentTag)

        setTags(filteredTags);
    }

    const addTag = (e: React.KeyboardEvent) => {
        switch (e.key) {
            case "Enter":
                if ((e.target as HTMLInputElement).value == "") {
                    return
                }
                // eslint-disable-next-line no-case-declarations
                const tag = (e.target as HTMLInputElement).value;

                setTags(prev => [...prev, tag]);
                (e.target as HTMLInputElement).value = ""
                
                break;
            case "Backspace":
                if ((e.target as HTMLInputElement).value == "" && tags.length > 0) {
                    const popTag = [...tags]
                    popTag.pop()
                    setTags(popTag);
                }
                break;
            default:
                break;
        }
    }

    return (
        <div onClick={focusInput} className="tag-conteiner">
            <ul className="tag-list">
                {tags.map((tag, i) => (
                        <li key={crypto.randomUUID()} className="tag-item">
                            <span>{tag}</span>
                            <FontAwesomeIcon icon={faXmark} className="icon-tag" onClick={() => removeTag(i)} role="button"/>
                        </li>
                    )
                )}
            </ul>
            <input type="text" ref={input} onKeyUp={addTag} className="input-tag" placeholder="Digite e aperte Enter" />
        </div>
    )
}