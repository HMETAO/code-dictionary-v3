import {Result} from "../result";
import request from "../utils/request";
import {CalendarType} from "../type/calendar";

export function getCalendar(): Promise<Result<Array<CalendarType>>> {
    return request({
        url: `/api/v1/other/calendar`,
        method: 'get'
    })
}