export function howMuchPass(oldDate: Date) {

    const convert = new Date(oldDate);

    const diff = Math.floor(new Date().getTime() - convert.getTime());
    const day = 1000 * 60 * 60 * 24;

    const minutes = Math.floor((diff / 1000) / 60);
    const days = Math.floor(diff / day);
    const months = Math.floor(days / 31);
    const years = Math.floor(months / 12);

    if (years > 0) {
        return years > 0 && years == 1 ? `há ${years} ano` : `há ${years} anos`
    }

    if (months > 0) {
        return months > 0 && months == 1 ? `há ${months} mês` : `há ${months} meses`
    }

    if (days > 0) {
        return days > 0 && days == 1 ? `há ${days} dia` : `há ${days} dias`
    }

    if (minutes > 0) {
        return minutes > 0 && minutes == 1 ? `há ${minutes} minutos` : `há ${minutes} minutos`
    }

    return "há poucos segundos"
}
