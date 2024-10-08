import request, { ResultStatus } from '@/utils/request'

export type Result<T> = {
  status: ResultStatus;
  data: T;
  message: string;
}

export interface Datum {
  caseId: string;
  creatorId: string;
  premisesId: string;
  premisesName: string;
  stage: number;
  caseType: number;
  sellerId: string;
  clientName: string;
  createAt: string;
  closeAt: string;
  closingDate: string;
  additionalClients: string[];
  contacts: any[];
}[]

// 匹配案件信息
export function getMatchCaseInfo<T extends string>(caseId: T) {
  return request<Result<Datum[]>>({
    url: `v1/case/${caseId}`,
    method: 'GET',
    skipInterceptor: true
  })
}

interface TaskInfoItem {
  stageId: string;
  stageType: number;
  caseId: string;
  tasks: string[];
  stageStatus: number;
}[]

// 获取阶段详情
export function getStageDetail<T extends string>(caseId: T, stage: number) {
  return request<Result<TaskInfoItem>>({
    url: `v1/stage/${caseId}/${stage}`,
    method: 'GET',
    skipInterceptor: true
  })
}

export interface TaskInfoItemStatusList {
  taskId: string;
  stageId: string;
  taskType: number;
  name: string;
  status: number;
  templates: string[];
}[]

// 获取阶段详情列表状态
export function getStageDetailList<T extends string>(caseId: T) {
  return request<Result<TaskInfoItemStatusList>>({
    url: `v1/task/${caseId}`,
    method: 'GET',
    skipInterceptor: true
  })
}
