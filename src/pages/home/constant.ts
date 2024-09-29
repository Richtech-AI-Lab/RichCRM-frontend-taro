/*
 * @description: 数据
 * @author: Yoke
 * @Date: 2024-09-26 16:18:39
 */

export enum StageStatusCode {
  // 准备
  PREPARE = 0,
  // 合同审查
  CONTRACT = 1,
  // 合同签署
  PAYMENT = 2,
  // 按揭与产权
  MORTGAGE = 3,
  // 结案
  CLOSE = 4
}

export const stageList = [
  {
    name: '准备',
    key: 'prepare',
  },
  {
    name: '合同审查',
    key: 'contract',
  },
  {
    name: '合同签署',
    key: 'payment',
  },
  {
    name: '按揭与产权',
    key: 'mortgage',
  },
  {
    name: '结案',
    key: 'close'
  }
]


export const stageDetailMap = {
  [StageStatusCode.PREPARE]: {
    title: "详细信息",
    list: [
      {
        title: '案件设置'
      },
      {
        title: '检查报告上传'
      },
      {
        title: '确认案件细节',
      }
    ]
  },
  [StageStatusCode.CONTRACT]: {
    title: "详细信息",
    list: [
      {
        title: '初始合同上传'
      },
      {
        title: '合同时间安排'
      },
      {
        title: '合同审查'
      },
      {
        title: '签订合同和等待押金'
      },
      {
        title: '初步签署的合同上传',
      },
      {
        title: '存款凭证上传'
      },
    ]
  },
  [StageStatusCode.PAYMENT]: {
    title: "详细信息",
    list: [
      {
        title: '与卖家确认电汇信息'
      },
      {
        title: '寄送押金'
      },
      {
        title: '告知卖家，并要求完全签署的合同',
      },
      {
        title: '完全签署的合同上传'
      }
    ]
  },
  [StageStatusCode.MORTGAGE]: {
    title: "按揭详细信息",
    list: [
      {
        title: '设置按揭截止日期'
      },
      {
        title: '设置结案截止日期'
      },
      {
        title: '告知时间线'
      },
      {
        title: '承诺书上传'
      },
      {
        title: '将承诺书发送给产权公司和卖家'
      },
      {
        title: '银行 CTC上传'
      },
      {
        title: '订购产权报告'
      },
      {
        title: '产权报告上传'
      },
      {
        title: '确认产权报告'
      },
      {
        title: '上传产权文件'
      },
    ]
  },
  [StageStatusCode.CLOSE]: {
    title: "详细信息",
    list: [
      {
        title: '结案日安排'
      },
      {
        title: '向参与人员提供结案信息'
      },
      {
        title: '计算所需支票'
      },
      {
        title: '结案'
      },
      {
        title: '结案文件上传'
      },
      {
        title: '问卷调查'
      }
    ]
  }
}


export function chunk<T>(array: T[], size: number): T[][] {
  if (size <= 0) {
    return [];
  }

  const result: T[][] = [];

  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }

  return result;
}

export const getCurrentStageMap = (stage: StageStatusCode) => {
  if (stage === StageStatusCode.MORTGAGE) {
    const data = chunk(stageDetailMap[stage].list, 6)
    return {
      ...stageDetailMap[stage],
      list: data?.[0],
      list1: data?.[1],
    }
  }
  return stageDetailMap[stage] ?? {}
}
