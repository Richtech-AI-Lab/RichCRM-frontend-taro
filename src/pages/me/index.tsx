/*
 * @description: 主页
 * @author: Yoke
 * @Date: 2024-09-23 11:51:29
 */
import { View, WebView } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.less'

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='index'>
      <WebView src='https://mp.weixin.qq.com/s/vYqaYGsBfueiVOti3JIIxA' />
    </View>
  )
}
