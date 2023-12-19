export interface IStars {
    cinco: number
    quatro: number
    três: number
    dois: number
    um: number
}

export interface StarsDto{
    media: number;
    qtdEstrelas: Record<string, number>[]
}

export const mathReview = (stars: IStars) => {
    const { cinco,
        quatro,
        três,
        dois,
        um
    } = stars;

    const qtdEstrelas:Record<string, number>[] = []; // array para guardar a porcentagem das estrelas
    const chaves = Object.keys(stars);
    const valores = Object.values(stars);

    const valorPeso = cinco * 5 + quatro * 4 + três * 3 + dois * 2 + um;
    const valorEstrelas = cinco + quatro + três + dois + um;

    for (const i in chaves) {
        const arrayValue = valores
        const porcentagemProgresso = (arrayValue[i] * 100) / valorEstrelas;
        if (isNaN(porcentagemProgresso)) {
            qtdEstrelas.push({ [chaves[i]]: 0 });
        } else {
            qtdEstrelas.push({ [chaves[i]]: Math.ceil(porcentagemProgresso) });
        }
    }



    return { media: valorPeso / valorEstrelas, qtdEstrelas };
}