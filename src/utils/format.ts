import { default as dayjs } from 'dayjs'

export const formatDate = (date: Date) => dayjs(date).format('MMMM D, YYYY h:mm A')

export const formatDateForPicture = (date: Date) => dayjs(date).format('YYYY/M/D')
