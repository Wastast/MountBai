import { get, post } from './http'

// 请求景点数据
export const senicData = (data) => post('/manage/dimTourBasResource/openAPI/findByPage',data);

// 请求景点数据
export const pointData = (data) => post('/manage/dimTourBasResource/openAPI/findByPageCascade',data);