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

console.log('[ url languageCode ] >', languageCode)
console.log('[ localStorage languageCode ] >', localStorage.getItem('SYSTEM_LANGUAGE'))

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

type LocaleTree = typeof langs.en
type StringAppend<T, S> = T extends string ? (S extends string ? `${T}.${S}` : never) : never
type KeyTree<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends string ? K : StringAppend<K, keyof T[K]>
}
export type LocaleKeyTree = KeyTree<LocaleTree>

/**
 * 语言转化方法
 * @param key 要转换的key，eg: aa.bb
 * @param variables 提供的变量，eg: { day: 4 }
 * @returns string
 */
export const localeTranslate = (
  key: LocaleKeyTree[keyof LocaleKeyTree],
  variables: { [key: string]: any } = {}
) => i18n.global.t(key, variables)

/**
 * 语言转化方法 - 自定义格式的变量转换
 * @param key 要转换的key，eg: aa.bb
 * @param variables 提供的变量，eg: { day: 4 }
 * @returns string
 */
export const localeTranslateWithVariables = (
  key: LocaleKeyTree[keyof LocaleKeyTree],
  variables: { [key: string]: any }
): string => {
  let langStr = localeTranslate(key)
  for (const key in variables) langStr = langStr.replace(`#${key}#`, variables[key])
  return langStr
}
