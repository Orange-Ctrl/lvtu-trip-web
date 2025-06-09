import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

export function formatTime(time) {
  const now = dayjs()
  const messageTime = dayjs(time)
  
  // 如果是今天的消息，显示具体时间
  if (now.isSame(messageTime, 'day')) {
    return messageTime.format('HH:mm')
  }
  
  // 如果是昨天的消息，显示"昨天"
  if (now.subtract(1, 'day').isSame(messageTime, 'day')) {
    return '昨天'
  }
  
  // 如果是今年的消息，显示月日
  if (now.isSame(messageTime, 'year')) {
    return messageTime.format('MM-DD')
  }
  
  // 其他情况显示年月日
  return messageTime.format('YYYY-MM-DD')
} 