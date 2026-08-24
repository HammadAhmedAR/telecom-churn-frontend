export function getRiskPercentage(risk) {
  const numericRisk = Number(risk)

  if (!Number.isFinite(numericRisk)) return 0

  const percentage = numericRisk >= 0 && numericRisk <= 1 ? numericRisk * 100 : numericRisk
  return Math.min(100, Math.max(0, percentage))
}

export function getRiskLevel(risk) {
  const percentage = getRiskPercentage(risk)

  if (percentage >= 70) return 'high'
  if (percentage >= 40) return 'medium'
  return 'low'
}
