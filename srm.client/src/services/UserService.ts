import api from "./api";
import type { LoginData, ExecuteData, TokenData, UserData } from "../models/data";

const endpoint = "/api/user";

export const login = async (data: LoginData): Promise<TokenData> => {
    const response = await api.post<ExecuteData>(`${endpoint}/login`, data);
    if (!response.data.success) {
        throw new Error(response.data.message!);
    }
    return response.data.data!;
}

export const refreshToken = async (): Promise<TokenData> => {
    const response = await api.post<ExecuteData<TokenData>>(`${endpoint}/refresh-token`);
    if (!response.data.success) {
        throw new Error(response.data.message!);
    }
    return response.data.data!;
}

export const getUserDropdown = async (): Promise<UserData[]> => {
    const response = await api.get<ExecuteData<UserData[]>>(`${endpoint}/dropdown`);
    if (!response.data.success) {
        throw new Error(response.data.message!);
    }
    return response.data.data!;
}