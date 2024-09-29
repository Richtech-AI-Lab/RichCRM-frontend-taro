/*
 * @description: 缓存caseData
 * @author: Yoke
 * @Date: 2024-09-24 10:33:45
 */
import { MatchCaseInfoData } from '@/api'
import { create } from 'zustand'

type Store<T> = {
  data: T
  setData: (data: T) => void
}

const useCaseDataStore = create<Store<Partial<MatchCaseInfoData["data"][0]>>>()((set) => ({
  data: {
    "caseId": "a257210c-b278-443f-bd9a-68570235eaef",
    "creatorId": "test1@gmail.com",
    "premisesId": "4697b6c3-7205-4dda-8665-8f2cfcc02a3c",
    "premisesName": "3220 Fillmore St CONDO",
    "stage": 4,
    "caseType": 1,
    "sellerId": "5aa1b857-7be8-4e05-a09e-cee73a94ef04",
    "clientName": "Johnson, Tom",
    "createAt": "2024-09-18T09:50:58.817Z",
    "closeAt": "2024-09-19T06:43:48.858Z",
    "closingDate": "2024-09-28T20:24:24.740Z",
    "additionalClients": [
      "884c6b39-8354-42c5-9079-2a42b78552a2"
    ],
    "contacts": []
  },
  setData: (data) => {
    set(() => ({
      data,
    }))
  },
}))

export default useCaseDataStore
