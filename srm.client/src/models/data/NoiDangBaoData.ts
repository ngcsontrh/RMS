export interface NoiDangBaoData {
    id?: number;
    ten: string;
}

export interface PageData<T> {
    data: T[];
    total: number;
}