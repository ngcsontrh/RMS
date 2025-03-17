import api from "./api";
import type { ExecuteData, LoginData, TokenData } from "../models/data";

export const login = async (data: LoginData): Promise<TokenData> => {
    const response = await api.post<ExecuteData<TokenData>>('/api/login', data);

    if (!response.data.success) {
        throw new Error(response.data.message!);
    }
    return response.data.data!;    
};
