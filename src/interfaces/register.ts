export interface Register {
    name: string
    password: string
    email: string
    state: string
}

export interface ErrorRegister {
    nomeError: string;
    emailError: string;
    estadoError: string;
    senhaError: string;
    emailExist: string;
}