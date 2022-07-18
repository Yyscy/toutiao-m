import dayjs from 'dayjs'
// console.log(dayjs().format('YYYY/MM/DD HH:mm:ss'))
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

require('dayjs/locale/zh-cn')
dayjs.locale('zh-cn')

export default dayjs
