/*
 * @description: 登录页面
 * @author: Yoke
 * @Date: 2024-09-23 11:51:29
 */
import { classNames, getNavBarHeight } from '@/utils/tools';
import { Navigator, View } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import styles from "./index.module.less";

export default function Index() {
  useLoad(() => {
    console.log(getNavBarHeight())
  })

  return (
    <View className={`index w-screen h-screen ${classNames(styles.index, 'flex flex-col justify-center items-center')}`}>
      <View className='pt-[40px]'>这是登录界面/需要全屏底图</View>
      <Navigator url='/pages/home/index' openType='switchTab'>去首页</Navigator>
    </View>
  )
}
