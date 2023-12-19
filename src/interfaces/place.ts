export interface Place{
    _id: string;
    titulo: string;
    descricao: string;
    createdAt: Date;
    imageFile: string[];
    tags: string[];
    estrelas: {media: number}
    criadoPor: {_id: string, nome: string}
}