/*
 * @description: layout
 * @author: Yoke
 * @Date: 2024-09-24 13:39:18
 */
import { classNames } from "@/utils/tools";
import { View } from "@tarojs/components"
import Header from "../page_header";

import "./index.less"

type LayoutPropsType = {
  children: React.ReactNode | React.ReactNode[];
  title: string;
  className?: string;
  // ...其他属性
  [key: string]: any;
}

const Layout = (props: LayoutPropsType) => {
  const { children, title, className, ...rest } = props
  return <View className={classNames('px-[24px] bg-[#f3f3f8] h-full', className)}>
    <Header title={title} />
    <View className="layout">{children}</View>
  </View>
}
export default Layout
