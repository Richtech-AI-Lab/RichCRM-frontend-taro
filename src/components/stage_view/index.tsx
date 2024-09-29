/*
 * @description: 功能
 * @author: Yoke
 * @Date: 2024-09-26 14:08:06
 */
import { Text, View } from "@tarojs/components"
import IconFont from "../iconfont/iconfont"
import styles from "./index.module.less"

type Stage = {
  // 阶段名称
  name: string
  // key值
  key: string
  // 阶段描述
  description?: string
}

type StageViewProps = {
  // 阶段列表
  stages: Stage[];
  // 当前阶段
  currentStage: number;
}

const StageView = (props: StageViewProps) => {

  const { stages, currentStage } = props


  const items = (index: number) => {
    if (currentStage == 0 && index === 0) {
      return <View className="absolute z-10">
        <View className={`w-5 h-5 rounded-full bg-white border-4 border-[#366093] ${styles.currentStage}`}></View>
      </View>
    }
    if ((index) === currentStage) {
      return <View className="absolute z-10">
        <View className={`w-5 h-5 rounded-full bg-white border-4 border-[#366093] ${styles.currentStage}`}></View>
      </View>
    }
    if ((index) < currentStage) {
      return <View className="w-5 h-5 absolute z-10 rounded-full bg-[#366093] flex justify-center items-center border-4 border-[#366093]">
        <IconFont size={20} color={"#fff"} name={"icon-success"} />
      </View>
    }
    if ((index) > currentStage) {
      return <View className="w-5 h-5 absolute z-10 rounded-full bg-white border-4 border-[#C5DCFF]"></View>
    }
  }

  const lineStyles = (index: number) => {
    if (currentStage == 0) {
      return <View className="w-2 h-12 bg-[#C5DCFF] absolute top-2 left-[12px] -z-0" />
    }
    if (currentStage) {
      if ((index) === currentStage) {
        return <View className="w-2 h-12 bg-[#C5DCFF] absolute top-2 left-[12px] -z-0" />
      }
      if ((index) < currentStage) {
        return <View className="w-2 h-12 bg-[#366093] absolute top-2 left-[12px] -z-0" />
      }
      if ((index) > currentStage) {
        return <View className="w-2 h-12 bg-[#C5DCFF] absolute top-2 left-[12px] -z-0" />
      }
    }
  }

  return <View>
    {stages.map((stage, index) => {
      return <View key={stage.key} className="h-14 relative">
        <View className="flex items-center">
          {items(index)}
          <Text className="text-[20px] ml-8">{stage.name}</Text>
        </View>
        {
          index === stages.length - 1 ? null : lineStyles(index)
        }
      </View>
    })}
  </View>
}
export default StageView
