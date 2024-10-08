/*
 * @description: 主页
 * @author: Yoke
 * @Date: 2024-09-23 11:51:29
 */
import Layout from '@/components/layout'
import { CoverImage, CoverView, Text, View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import logo from "../../assets/logo.png"
import './index.less'
import BoxContainer from '@/components/box_container'

export default function Index() {

  const lawGroupList = [
    {
      title: '电子邮件',
      content: 'info@mg-lawgroup.com'
    },
    {
      title: '电话',
      content: '(905) 639-9900'
    },
    {
      title: '工作电话',
      content: '(905) 639-9900'
    },
    {
      title: '网址',
      content: 'www.mg-lawgroup.com'
    },
    {
      title: '通信地址',
      content: '137 Maple Avenue Brooklyn, NY 11215'
    }
  ]

  const realEstateList = [
    {
      title: '房产经纪人',
      content: 'Michale Gao'
    },
    {
      title: '电子邮件',
      content: 'michaelgao@mg-lawgroup.com'
    },
    {
      title: '工作电话',
      content: '(905) 639-9900'
    },
    {
      title: '网址',
      content: 'www.mg-lawgroup.com'
    },
    {
      title: '通信地址',
      content: '137 Maple Avenue Brooklyn, NY 11215'
    }
  ]

  return (
    <Layout title={'Contacts'}>
      <BoxContainer>
        <View>
          <View className='flex items-center'>
            <CoverView >
              <CoverImage className='w-12 h-auto' src={logo} />
            </CoverView>
            <Text className='text-xl ml-2'>MG Law Group</Text>
          </View>
          <View className='mt-4'>
            {
              lawGroupList.map((item, index) => {
                return (
                  <View className='flex items-center justify-between min-h-12 border-b-2 last:border-0 border-gray-200' key={index}>
                    <Text className='text-sm flex-shrink-0 mr-4'>{item.title}</Text>
                    <Text className='text-sm text-right'>{item.content}</Text>
                  </View>
                )
              })
            }
          </View>
        </View>
      </BoxContainer>
      <BoxContainer>
        <View>
          <View className='flex items-center'>
            <Text className='text-xl'>房产经纪</Text>
          </View>
          <View className='mt-4'>
            {
              realEstateList.map((item, index) => {
                return (
                  <View className='flex items-center justify-between min-h-12 border-b-2 last:border-0 border-gray-200' key={index}>
                    <Text className='text-sm flex-shrink-0 mr-4'>{item.title}</Text>
                    <Text className='text-sm text-right'>{item.content}</Text>
                  </View>
                )
              })
            }
          </View>
        </View>
      </BoxContainer>
      <View className='h-4'>

      </View>
    </Layout>
  )
}
