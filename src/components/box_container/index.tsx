import { View } from "@tarojs/components"

type BoxContainerProps = {
  children: React.ReactNode | React.ReactNode[]
}

const BoxContainer = (props: BoxContainerProps) => {
  const { children } = props
  return <View className="w-full bg-white rounded-xl shadow-lg p-4 mt-3">
    {children}
  </View>
}
export default BoxContainer
