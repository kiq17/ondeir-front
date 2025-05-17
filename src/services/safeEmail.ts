export function safeEmail(str){
    const cleanString = str.slice(0, str.indexOf("@"));

    const howMuchCensored = Math.round(0.8 * cleanString.length);

    const charThatWillBeCensonred = cleanString.slice(0, howMuchCensored);

    const censoredChars = Array(howMuchCensored).fill("*").join("");

    const censoredEmail = str.replace(charThatWillBeCensonred, censoredChars);
    
    return censoredEmail;
}