// import {ElInput } from 'element-plus'
import lang from 'element-plus/lib/locale/lang/zh-cn'
import locale from 'element-plus/lib/locale'
import 'element-plus/lib/theme-chalk/index.css'  //需要引入 然后按需引入组件要不然没有样式

export default (app) => {
  locale.use(lang)
  // app.use(ElInput)
}
