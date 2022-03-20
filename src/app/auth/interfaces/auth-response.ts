export interface AuthResponse {
    access_token?: string;
}

export interface ErrorResponse{
    status: number;
    message: string;
}