import dayjs from 'dayjs'

export function formatMonthDay(date, formatStr = "MM月DD日") {
  return dayjs(date).format(formatStr)
}

export function getDiffDays(startDate, endDate) {
  return dayjs(endDate).diff(startDate, "day")
}

export function formatWeekday(date) {
  const list = ['一', '二', '三', '四', '五', '六', '七']
  let num = new Date(date).getDay() + 1
  return `周${list[num]}`
}