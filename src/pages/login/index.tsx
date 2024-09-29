/*
 * @description: 登录页面
 * @author: Yoke
 * @Date: 2024-09-23 11:51:29
 */
import { getMatchCaseInfo } from '@/api';
import { navigateTo } from '@/utils/navigetoTo';
import $toast from '@/utils/toast';
import { classNames } from '@/utils/tools';
import { BaseEventOrig, Button, Form, Input, InputProps, Text, View } from '@tarojs/components';
import { useState } from 'react';
import styles from "./index.module.less";
import { useCaseDataStore } from '@/store';

// 值
type ValuesType = "serial_number" | "surname"

// 类型
type Values<T> = {
  [K in ValuesType]: T;
};

export default function Index() {

  const caseDataStore = useCaseDataStore()

  // 效验状态
  const [statusValues, setStatusValues] = useState<Values<boolean>>({
    serial_number: false,
    surname: false
  });

  const formSubmit = (e) => {
    const values = e.target.value as Values<string>
    // 效验参数
    if (!values?.serial_number) {
      setStatus("serial_number", true)
    }

    if (!values?.surname) {
      setStatus("surname", true)
    }
    navigateTo({
      type: "switchTab",
      path: "/pages/home/index"
    })
    // if (values?.serial_number && values?.surname) {

    //   getMatchCaseInfo(values?.serial_number).then(res => {
    //     if (res.data?.status == "success") {
    //       const list = res.data?.data
    //       const find = list.filter(item => item.clientName == values?.surname)
    //       if (find?.length) {
    //         caseDataStore.setData(find[0])
    //         navigateTo({
    //           type: "switchTab",
    //           path: "/pages/home/index"
    //         })
    //       } else {
    //         $toast.show("案件匹配失败")
    //       }
    //     } else {
    //       $toast.show("案件编号错误")
    //     }
    //   })
    // }
  }


  // 效验参数
  const validationInput = (e: BaseEventOrig<InputProps.inputEventDetail>, key: ValuesType) => {
    const value = e?.detail?.value
    setStatus(key, !Boolean(value))
  }

  const setStatus = (key: ValuesType, value: boolean) => {
    setStatusValues((val) => {
      return {
        ...val,
        [key]: value
      }
    })
  }

  return (
    <View className={`index w-screen h-screen p-6 ${classNames(styles.index, 'flex flex-col justify-center items-center')}`}>
      <View className='bg-white w-full py-3 px-4 rounded-[50px] shadow-lg'>
        <View className='text-xl'>
          进度追踪
        </View>
        <Text className='text-sm mt-1 text-[#42474F]'>
          您的案件进度就在眼前
        </Text>
        <Form onSubmit={formSubmit} >
          <View className='mt-6 relative'>
            <Input placeholderTextColor='#707684' onInput={(e) => validationInput(e, 'serial_number')} type='text' className=' bg-[#F3F3F8] rounded-3xl h-12 px-4' name="serial_number" placeholder='案件编号' />
            <Text className={classNames(`text-[red] text-[24px] pl-4 transition-all duration-1000 overflow-hidden absolute -bottom-4 ${statusValues?.serial_number ? 'h-auto' : 'h-0'}`)}>案件编号不能为空</Text>
          </View>
          <View className='mt-4 relative'>
            <Input placeholderTextColor='#707684' onInput={(e) => validationInput(e, 'surname')} type='text' className=' bg-[#F3F3F8] rounded-3xl h-12 px-4' name="surname" placeholder='姓氏' />
            <Text className={classNames(`text-[red] text-[24px] pl-4 transition-all duration-1000 overflow-hidden absolute -bottom-4 ${statusValues?.surname ? 'h-auto' : 'h-0'}`)}>姓氏不能为空</Text>
          </View>
          <Button className='w-2/4 mt-10 bg-[#366093] h-10 flex items-center mb-4 justify-center text-white rounded-3xl' formType="submit">查看</Button>
        </Form>
      </View>
    </View>
  )
}
