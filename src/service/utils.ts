export const generateUniqueId = (timestamp: string, header?: string): string => {
  const randomNum = Math.random().toString(36).substring(2, 10)

  return (header ?? '') + timestamp + randomNum
}