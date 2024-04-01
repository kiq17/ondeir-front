import { useEffect, useRef, useState } from "react";

interface fieldProps {
  handleOtp: (value: string[]) => void;
}

let currentOPTIndex = 0;

const VerificationField = ({ handleOtp }: fieldProps) => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [activeOTP, setActiveOTP] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    const newOtp: string[] = [...otp];
    newOtp[currentOPTIndex] = value.substring(value.length - 1);

    if (!value) setActiveOTP(currentOPTIndex - 1);
    else setActiveOTP(currentOPTIndex + 1);

    if (newOtp.join("").length == 6) setLoading(true);
    target.blur();
    setOtp(newOtp);
    handleOtp(newOtp);
  };

  const handleKey = (
    { key }: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    currentOPTIndex = index;
    if (key === "Backspace") setActiveOTP(currentOPTIndex - 1);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOTP]);

  return (
    <div className="flex m-auto justify-center items-center gap-4">
      {otp.map((_, index) => {
        return (
          <div key={index} className={`${loading ? "cursor-not-allowed" : ""}`}>
            <input
              ref={index === activeOTP ? inputRef : null}
              type="number"
              className={`w-12 h-12 outline-none border-2 border-zinc-400 rounded-md text-center transition-all duration-300 bg-transparent text-lg font-semibold focus:border-2 focus:border-black ${
                loading
                  ? "bg-zinc-300 text-zinc-400 animate-pulse pointer-events-none"
                  : ""
              }`}
              onChange={handleChange}
              value={otp[index]}
              onKeyDown={(e) => handleKey(e, index)}
            />
            {index === otp.length - 1 ? null : <span className="input-otp-s" />}
          </div>
        );
      })}
    </div>
  );
};

export default VerificationField;
