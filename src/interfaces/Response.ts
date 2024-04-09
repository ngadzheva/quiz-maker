import { AxiosHeaders } from 'axios';

export default interface Response {
    config: object;
    headers: AxiosHeaders;
    request: XMLHttpRequest;
    status: number;
    statusText: string;
}