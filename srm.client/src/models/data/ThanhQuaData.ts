export interface ThanhQuaData {
    id?: number | null;
    ten?: string | null;
}

export interface PageData<T> {
    data: T[];
    total: number;
}
