/*
 * @description: app配置文件
 * @author: Yoke
 * @Date: 2024-09-23 11:51:29
 */
export default defineAppConfig({
  pages: [
    'pages/login/index',
    'pages/index/index',
    'pages/home/index',
    'pages/contacts/index',
    'pages/faqs/index',
    'pages/me/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    custom: true,
    color: '#000000',
    selectedColor: '#DC143C',
    backgroundColor: '#ffffff',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '主页',
      },
      {
        pagePath: 'pages/contacts/index',
        text: 'Contacts',
      },
      // {
      //   pagePath: 'pages/faqs/index',
      //   text: 'FAQs',
      // },
      {
        pagePath: 'pages/me/index',
        text: 'Me',
      },
    ],
  },
})
