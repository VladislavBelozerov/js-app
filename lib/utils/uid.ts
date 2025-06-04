let uidIndex = 0

export function uid(prefix = '') {
  return `${prefix}${++uidIndex}`
}
