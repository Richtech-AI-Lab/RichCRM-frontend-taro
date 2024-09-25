/*
 * @description: 登录页面
 * @author: Yoke
 * @Date: 2024-09-23 11:51:29
 */
import { navigateTo } from '@/utils/navigetoTo';
import { classNames, getNavBarHeight } from '@/utils/tools';
import { BaseEventOrig, Button, Form, Input, InputProps, Text, View } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import { useState } from 'react';
import styles from "./index.module.less";

// 值
type ValuesType = "serial_number" | "surname"

// 类型
type Values = {
  [K in ValuesType]: boolean;
};

export default function Index() {
  const [statusValues, setStatusValues] = useState<Values>({
    serial_number: false,
    surname: false
  });

  useLoad(() => {
    console.log(getNavBarHeight())
  })

  const formSubmit = (e) => {
    const values = e.target.value as Values
    if (!values?.serial_number) {
      setStatusValues((val) => {
        return {
          ...val,
          serial_number: true
        }
      })
    }
    if (!values?.surname) {
      setStatusValues((val) => {
        return {
          ...val,
          surname: true
        }
      })
    }
    if (values?.serial_number && values?.surname) {
      console.log(values);
      navigateTo({
        type: "switchTab",
        path: "/pages/home/index"
      })
    }
  }

  const formReset = () => {

  }


  // 效验参数
  const validationInput = (e: BaseEventOrig<InputProps.inputEventDetail>, key: ValuesType) => {
    console.log(e)
    const value = e?.detail?.value
    setStatusValues((val) => {
      return {
        ...val,
        [key]: !Boolean(value)
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
        <Form onSubmit={formSubmit} onReset={formReset} >
          <View className='mt-6 relative'>
            <Input placeholderTextColor='#707684' onInput={(e) => validationInput(e, 'serial_number')} type='text' className=' bg-[#F3F3F8] rounded-3xl h-12 pl-4' name="serial_number" placeholder='案件编号' />
            <Text className={classNames(`text-[red] text-[24px] pl-4 transition-all duration-1000 overflow-hidden absolute -bottom-4 ${statusValues?.serial_number ? 'h-auto' : 'h-0'}`)}>案件编号不能为空</Text>
          </View>
          <View className='mt-4 relative'>
            <Input placeholderTextColor='#707684' onInput={(e) => validationInput(e, 'surname')} type='text' className=' bg-[#F3F3F8] rounded-3xl h-12 pl-4' name="surname" placeholder='姓氏' />
            <Text className={classNames(`text-[red] text-[24px] pl-4 transition-all duration-1000 overflow-hidden absolute -bottom-4 ${statusValues?.surname ? 'h-auto' : 'h-0'}`)}>姓氏不能为空</Text>
          </View>
          <Button className='w-2/4 mt-10 bg-[#366093] h-10 flex items-center mb-4 justify-center text-white rounded-3xl' formType="submit">Check</Button>
        </Form>
      </View>
      {/* <View className='pt-[40px]'>这是登录界面/需要全屏底图</View> */}
      {/* <Navigator url='/pages/home/index' openType='switchTab'>去首页</Navigator> */}
    </View>
  )
}
