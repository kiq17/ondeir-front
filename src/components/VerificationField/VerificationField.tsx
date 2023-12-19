import { useEffect, useRef, useState } from "react";
import "./styleVerification.css";

interface fieldProps {
    handleOtp: (value: string[]) => void
}

let currentOPTIndex = 0;

const VerificationField = ({ handleOtp }: fieldProps) => {
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
    const [activeOTP, setActiveOTP] = useState<number>(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = target;
        const newOtp: string[] = [...otp]
        newOtp[currentOPTIndex] = value.substring(value.length - 1);

        if (!value) setActiveOTP(currentOPTIndex - 1);
        else setActiveOTP(currentOPTIndex + 1)

        setOtp(newOtp)
        handleOtp(newOtp)
    }

    const handleKey = ({ key }: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        currentOPTIndex = index
        if (key === "Backspace") setActiveOTP(currentOPTIndex - 1)
    }

    useEffect(() => {
        inputRef.current?.focus()
    }, [activeOTP])


    return (
        <div className="box-otp">
            {otp.map((_, index) => {
                return (
                    <div key={index}>
                        <input
                            ref={index === activeOTP ? inputRef : null}
                            type="number"
                            className="input-otp"
                            onChange={handleChange}
                            value={otp[index]}
                            onKeyDown={(e) => handleKey(e, index)}
                        />
                        {index === otp.length - 1 ? null : (
                            <span className="input-otp-s" />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default VerificationField;