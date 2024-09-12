export type Theme = 'light' | 'dark'

export const THEME_KEY = 'theme'

export const getTheme = () => document.documentElement.getAttribute('data-theme') as Theme

export const setTheme = (theme: Theme = 'light') => {
  document.documentElement.setAttribute('data-theme', theme)
}

export const initTheme = (_theme?: Theme) => {
  // 将链接参数转为对象
  const query =
    location.href
      .split('?')[1]
      ?.split('&')
      .reduce(
        (q, item) => {
          const [key, value] = item.split('=')
          q[key] = value
          return q
        },
        {} as Record<string, any>
      ) ?? {}

  const theme =
    _theme ||
    query[THEME_KEY] ||
    sessionStorage.getItem(THEME_KEY) ||
    localStorage.getItem(THEME_KEY)

  setTheme(theme)
}
