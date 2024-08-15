import { createI18n } from 'vue-i18n'
import langs from './lang.json'

const query = () => {
  const q = {} as Record<string, any>
  const { search } = location

  if (search) {
    return search
      .slice(1)
      .split('&')
      .reduce((_q, item) => {
        const [key, val] = item.split('=')
        _q[key] = val
        return _q
      }, q)
  } else return q
}

const { languageCode } = query()

// 优先使用链接上的、localStorage、默认的
const locale = languageCode || localStorage.getItem('SYSTEM_LANGUAGE') || 'en'

const i18n = createI18n({
  locale, // 当前显示的语言
  fallbackLocale: 'en', // 兜底语言环境
  globalInjection: true, // 是否为每个组件注入全局属性和函数。如果设置为true，则以$为前缀的属性和方法将注入Vue Component，eg: $t|$i18n。default:true
  legacy: false, // set `false`, 切换到 Composition API 模式
  messages: langs // 语言数据
})

export default i18n
