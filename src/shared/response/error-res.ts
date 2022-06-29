import { IResponse } from "./interface/response.interface";

export class IErrorResponse implements IResponse {
    success: boolean;
    error: string
};
