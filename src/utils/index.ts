/*
 * @description: 功能
 * @author: Yoke
 * @Date: 2024-09-26 13:35:16
 */

/**
 * 获取当前时间是早上、下午还是晚上
 * @returns {string}
 */
export function getTimeOfDay() {
  const now = new Date();
  const hours = now.getHours();

  if (hours >= 5 && hours < 12) {
    return "早上"; // 5:00 - 11:59
  } else if (hours >= 12 && hours < 18) {
    return "下午"; // 12:00 - 17:59
  } else {
    return "晚上"; // 18:00 - 4:59
  }
}

/**
 * 通用排序函数 不要改变原数组
 * @param {Array} arr
 * @param {string} key
 */
export function sortArray(arr: any[], key: string) {
  return [...arr].sort((a, b) => {
    if (a[key] < b[key]) {
      return -1;
    } else if (a[key] > b[key]) {
      return 1;
    } else {
      return 0;
    }
  });
}
