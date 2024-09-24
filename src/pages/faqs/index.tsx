/*
 * @description: 主页
 * @author: Yoke
 * @Date: 2024-09-23 11:51:29
 */
import Layout from '@/components/layout'
import { Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.less'

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <Layout title='FAQs'>
      <Text>这是FAQs</Text>
    </Layout>
  )
}
