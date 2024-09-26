import request, { ResultStatus } from '@/utils/request'

type MatchCaseInfoData = {
  status: ResultStatus;
  data: Datum[];
  message: string;
}

interface Datum {
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
}

// 匹配案件信息
export function getMatchCaseInfo<T extends string>(caseId: T) {
  return request<MatchCaseInfoData>({
    url: `v1/case/${caseId}`,
    method: 'GET',
    skipInterceptor: true
  })
}
