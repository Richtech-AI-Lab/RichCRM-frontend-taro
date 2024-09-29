/*
 * @description: 主页
 * @author: Yoke
 * @Date: 2024-09-23 11:51:29
 */
import { View, Text, Navigator } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.less'
import { navigateTo } from '@/utils/navigetoTo'

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='index'>
      <Text>这是me</Text>
    </View>
  )
}
