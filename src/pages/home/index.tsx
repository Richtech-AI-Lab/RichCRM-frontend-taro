/*
 * @description: 功能
 * @author: Yoke
 * @Date: 2024-09-24 09:21:48
 */
import { getStageDetail, getStageDetailList, TaskInfoItemStatusList } from '@/api'
import BoxContainer from '@/components/box_container'
import Layout from '@/components/layout'
import StageView from '@/components/stage_view'
import { useCaseDataStore } from '@/store'
import { getTimeOfDay, sortArray } from "@/utils"
import { Text, View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { chunk, getCurrentStageMap, stageList, StageStatusCode } from './constant'
import './index.less'
import { useState } from 'react'
import DetailView from '@/components/detail_view'
import Taro from '@tarojs/taro'
export default function Index() {
  const caseDataStore = useCaseDataStore();
  const caseData = caseDataStore.data;
  const [detailList, setDetailList] = useState<TaskInfoItemStatusList[]>([]);
  const [detailList2, setDetailList2] = useState<TaskInfoItemStatusList[]>([]);
  useLoad(() => {
    console.log('Page loaded.', getTimeOfDay())
    console.log(caseDataStore.data)
    getStageDetail(caseData.caseId!, caseData.stage).then(res => {
      if (res?.data?.status == "success") {
        const list = res.data.data?.[0]?.tasks?.map((item, i) => {
          return new Promise((resolve, reject) => {
            getStageDetailList(item!).then(res => {
              Taro.showLoading({
                title: "加载中",
              });
              if (res?.data?.status == "success") {
                resolve({
                  ...res.data.data?.[0],
                  index: i
                })
              } else {
                reject({})
              }
            })
          })
        })
        Promise.all(list).then(res => {
          Taro.hideLoading();
          const items = getCurrentStageMap(caseData.stage!)
          if (items?.list.length) {
            let list = sortArray(res, 'index')
            if (caseData.stage == StageStatusCode.MORTGAGE) {
              list = chunk(list, 6)[0]
            }
            list = list?.map((item, i) => {
              return {
                ...item,
                name: items?.list[i]?.title,
                aaaaa: 1
              }
            });
            setDetailList(list)
          }
          if (items?.list1?.length) {
            const list = chunk(sortArray(res, 'index'), 6)[1]?.map((item, i) => {
              return {
                ...item,
                name: items?.list1[i]?.title
              }
            });
            setDetailList2(list)
          }
        })
      }
    })
  })

  const item = stageList[caseData.stage - 1];
  const items = getCurrentStageMap(caseData.stage!)
  console.log(item, detailList, detailList2)
  return (
    <Layout title={'首页'}>
      <View className='text-xl overflow-hidden pt-4'>{getTimeOfDay() + '好，'}{caseData.clientName}</View>

      <BoxContainer>
        <Text className='text-xl'>{caseData.premisesName}</Text>
        <View />
        <Text className='text-[24px] inline-block mt-2 text-[#707684]'>Condo · 购买</Text>
      </BoxContainer>

      <BoxContainer>
        <View className='text-xl mb-10'>
          案件正处于
          {item?.name}
          阶段
        </View>
        <StageView stages={stageList} currentStage={caseData.stage!} />
      </BoxContainer>

      <BoxContainer>
        <View className='text-base pb-4 border-b border-[#E2E2E7]'>
          {items?.title}
        </View>
        <DetailView list={detailList} />
      </BoxContainer>

      {
        detailList2?.length ? (
          <BoxContainer>
            <View className='text-base pb-4 border-b border-[#E2E2E7]'>
              产权详细信息
            </View>
            <DetailView list={detailList2} />
          </BoxContainer>
        ) : null
      }

      <View className='h-4'>

      </View>
    </Layout>
  )
}
