import { View } from "@tarojs/components"

type BoxContainerProps = {
  children: React.ReactNode | React.ReactNode[]
}

const BoxContainer = (props: BoxContainerProps) => {
  const { children } = props
  return <View className="w-[99%] bg-white rounded-xl mx-auto shadow-lg p-4 mt-4 ">
    {children}
  </View>
}
export default BoxContainer
