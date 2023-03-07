export interface RegisterInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber?: string;
}


export interface LoginInput {
    email: string;
    password: string;
}

