/*
 * @description: 功能
 * @author: Yoke
 * @Date: 2024-09-23 14:56:14
 */
import Taro from '@tarojs/taro';
import { padQuery } from './utils';

type NavigateParams = {
  type?: 'navigate' | 'navigateBack' | 'navigateBackTo' | 'redirect' | 'reLaunch' | 'switchTab';
  path?: string;
  query?: Record<string, any>;
  delta?: number;
  pageRoute?: string;
}

/**
 * `type`: 跳转方式 i.e. `navigate`, `navigateBack`, `navigateBackTo` `redirect` or `reLaunch`, default `navigate`
 * `path`: 基础路径
 * `query`: 查询参数
 * `delta`: 后退页数(与`navigateBack`一起使用)
 * `pageRoute`: 页面路由 后退到指定页(与`navigateBackTo`一起使用)。
 *
 *  跳转到
 *   navigateTo({
 *      type: 'navigate', path: '/pages/smart/addPlan', query: { id: 9527 }
 *   })
 *
 * 后退到指定页
 *   navigateTo({
 *     type: 'navigateBackTo', pageRoute: '/pages/smart/addPlan'
 *   })
 * 后退2页
 *   navigateTo({
 *      type: 'navigateBack' , delta: 2
 *   })
 * @param {*} params
 */
export function navigateTo(params: NavigateParams = {}) {
  const { type = 'navigate', path = '', query = {}, delta = 1, pageRoute = '' } = params;
  const url = padQuery(path, query);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const navigateTo = ({
    navigate: Taro.navigateTo,
    navigateBack: Taro.navigateBack,
    redirect: Taro.redirectTo,
    reLaunch: Taro.reLaunch
  })[type];

  if (type === 'navigateBack') {
    return Taro.navigateBack({ delta });
  }

  if (type == "switchTab") {
    return Taro.switchTab({ url })
  }

  if (type === 'navigateBackTo') {
    const pages = Taro.getCurrentPages();
    const index = pages.findIndex(page => page.route!.replace(/^\//, '') === pageRoute.replace(/^\//, ''));
    return Taro.navigateBack({ delta: pages.length - 1 - index });
  }

  if (typeof navigateTo === 'function') {
    return navigateTo({ url })
      .catch(console.error);
  }

  return Promise.reject(`Invalid navigate type for navigateTo(params): ${type}`);
}
