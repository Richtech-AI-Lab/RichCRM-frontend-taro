/*
 * @description: 缓存tabbar
 * @author: Yoke
 * @Date: 2024-09-24 10:33:45
 */
import { create } from 'zustand'

type Store<T> = {
  index: T
  setIndex: (index: T) => void
}

const useTabIndexStore = create<Store<number>>()((set) => ({
  index: 0,
  setIndex: (index) => {
    set(() => ({
      index,
    }))
  },
}))

export default useTabIndexStore
