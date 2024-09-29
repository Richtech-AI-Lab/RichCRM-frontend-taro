import { TaskInfoItemStatusList } from "@/api"
import { CoverImage, View } from "@tarojs/components"
import Loading from "@/assets/loading.png";
import Finished from "@/assets/finished.png";
type DetailViewProps = {
  list: TaskInfoItemStatusList[];
}
const DetailView = (props: DetailViewProps) => {
  const { list } = props;
  const status = list?.findIndex((item) => item.status === 1);
  const statusIndex = status === -1 ? 0 : status;


  const getIcon = (index) => {
    if (statusIndex) {
      if (index < statusIndex) {
        return <CoverImage src={Finished} className="w-6 h-6" />
      } else if (index === statusIndex) {
        return <CoverImage src={Loading} className="w-6 h-6 animate-spin" />
      } else {
        return null
      }
    } else {
      if (index === 0) {
        return <CoverImage src={Loading} className="w-6 h-6 animate-spin" />
      } else {
        return null
      }
    }
  }

  const getIconItemText = (index) => {
    if (statusIndex === index) {
      return '可能需要几天时间处理'
    } else {
      return ''
    }
  }

  return <View>
    {
      list.map((item, index) => {
        return <View key={index} className="flex justify-between items-center text-base py-4 last:border-0 border-b border-[#E2E2E7]">
          <View>
            <View>{item.name}</View>
            <View className="text-[24px] text-[#707684]">{getIconItemText(index)}</View>
          </View>
          <View>
            <View>
              {getIcon(index)}
            </View>
          </View>
        </View>
      })
    }
  </View>
}
export default DetailView
