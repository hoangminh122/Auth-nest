import { IResponse } from "./interface/response.interface";

export class ISuccessResponse implements IResponse {
    success: boolean;
    result: any
};
