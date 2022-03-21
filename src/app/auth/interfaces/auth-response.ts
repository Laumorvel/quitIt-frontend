export interface AuthResponse {
    access_token?: string;
    rol:string;
}

export interface ErrorResponse{
    status: number;
    message: string;
}