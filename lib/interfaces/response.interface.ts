export interface IResponse<T> {
    status: 'success' | 'fail';
    data?: T;
    message?: string;
    errors?: IErrorResponse[];
    stack?: string;
}

export interface IErrorResponse {
    field: string;
    message: string;
}