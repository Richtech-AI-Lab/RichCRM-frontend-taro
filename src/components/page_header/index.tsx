/*
 * @description: Header
 * @author: Yoke
 * @Date: 2024-09-24 11:40:37
 */
import { classNames, getSystemInfo } from '@/utils/tools'
import styles from './index.module.less'
import { CoverImage, CoverView, View, Text } from '@tarojs/components'
import logo from "../../assets/logo.png"
type HeaderType = {
  title: string
}

const Header = (props: HeaderType) => {
  const { title } = props
  const { statusBarHeight } = getSystemInfo()
  return <View className={styles.header_page}>
    <View style={{ height: statusBarHeight + 'px' }}>

    </View>
    <View className={classNames(styles.header, 'flex items-center justify-between')}>
      <CoverView className=''>
        <CoverImage src={logo} />
      </CoverView>
      <Text className='text-base'>{title}</Text>
      <CoverView className='opacity-0'>
        <CoverImage src={logo} />
      </CoverView>
    </View>
  </View>
}
export default Header
