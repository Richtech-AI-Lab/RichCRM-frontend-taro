/*
 * @description: 功能
 * @author: Yoke
 * @Date: 2024-09-24 09:16:46
 */
import contacts from "@/assets/tabbar_icon/contacts.png"
import contacts_active from "@/assets/tabbar_icon/contacts_active.png"
import faqs from "@/assets/tabbar_icon/faqs.png"
import faqs_active from "@/assets/tabbar_icon/faqs_active.png"
import home from "@/assets/tabbar_icon/home.png"
import home_active from "@/assets/tabbar_icon/home_active.png"
import { default as me, default as me_active } from "@/assets/tabbar_icon/me.png"
import { useTabIndexStore } from "@/store"
import { navigateTo } from "@/utils/navigetoTo"
import { classNames } from "@/utils/tools"
import { CoverImage, View } from "@tarojs/components"
import styles from "./index.module.less"


const Index = () => {
  const { index: selected, setIndex: setSelected } = useTabIndexStore()
  const list = [
    {
      pagePath: '/pages/home/index',
      selectedIconPath: home_active,
      iconPath: home,
    },
    {
      pagePath: '/pages/contacts/index',
      selectedIconPath: contacts_active,
      iconPath: contacts,
    },
    {
      pagePath: '/pages/faqs/index',
      selectedIconPath: faqs_active,
      iconPath: faqs,
    },
    {
      pagePath: '/pages/me/index',
      selectedIconPath: me_active,
      iconPath: me,
    }
  ]

  const changeTab = (index: number) => {
    // 设置当前选中项
    setSelected(index)
    // 跳转
    navigateTo({
      type: "switchTab",
      path: list[index].pagePath
    })
  }

  return <View className={styles.tab_bar}>
    {list.map((item, index) => {
      return (
        <View className={classNames(selected === index ? styles.tab_bar_item_active : styles.tab_bar_item)} onClick={() => changeTab(index)}>
          <CoverImage key={index} className={styles.tab_bar_icon} src={selected === index ? item.selectedIconPath : item.iconPath} />
        </View>
      )
    })}
  </View>
}
export default Index
