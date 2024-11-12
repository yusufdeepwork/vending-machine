export const formatMoney = (amount: number): string => `${amount} 🪙`

export const calculateRemaining = (total: number, price: number): number =>
  total - price
