import dayjs from 'dayjs'

export function formatSimpleDate(date, format) {
  const { locale } = useI18n()
  return dayjs(date).locale(locale.value).format(format)
}
