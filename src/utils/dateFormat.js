const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

const dateTimeFormatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})

export function formatDate(dateValue) {
  return dateFormatter.format(new Date(dateValue))
}

export function formatDateTime(dateValue) {
  return dateTimeFormatter.format(new Date(dateValue))
}
