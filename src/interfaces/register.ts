export interface Register {
    nome: string
    senha: string
    email: string
    estado: string
}

export interface ErrorRegister {
    nomeError: string;
    emailError: string;
    estadoError: string;
    senhaError: string;
    emailExist: string;
}