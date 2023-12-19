export interface Comment {
    _id: string;
    texto: string;
    createdAt: Date;
    likes: number;
    dislikes: number;
    userId: { nome: string, estado: string, avatar: string }
}