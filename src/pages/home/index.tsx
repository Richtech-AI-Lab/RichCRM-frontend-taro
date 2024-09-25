import Layout from '@/components/layout'
import { Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.less'

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <Layout title={'首页'}>
      <Text>首页</Text>
    </Layout>
  )
}
