/*
 * @description: 登录页面
 * @author: Yoke
 * @Date: 2024-09-23 11:51:29
 */
import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='index w-screen h-screen'>
      <Text>这是登录界面/需要全屏底图</Text>
    </View>
  )
}
