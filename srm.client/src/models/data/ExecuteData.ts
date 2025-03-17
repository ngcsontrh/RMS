export interface ExecuteData<T = undefined> {
    success: boolean;
    message?: string | null;
    data?: T;
}