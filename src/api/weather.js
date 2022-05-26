import request from "@/utils/request";

export function getWeather(path) {
    return request({
        url: path,
        method: 'GET'
    });
}
