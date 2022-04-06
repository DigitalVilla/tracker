export function setTimeStamp(
  D: Date | string = '',
  reset?: 'start' | 'end'
): string {
  const date = !D ? new Date() : new Date(D)

  if (reset === 'start') {
    const iso = date.toISOString()
    if (!/00:00./.test(iso)) date.setHours(0, 0, 0, 0)
  } else if (reset === 'end') {
    const iso = date.toISOString()
    if (!/59:59./.test(iso)) date.setHours(23, 59, 59, 999)
  }

  return date.toISOString()
}
