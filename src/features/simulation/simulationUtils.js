import { getRiskPercentage } from '../../utils/riskLevel'

export function getInitialSimulationValues(customer) {
  return {
    contract: customer.contract,
    monthlyCharges: customer.monthlyCharges,
    techSupport: customer.techSupport,
    onlineSecurity: customer.onlineSecurity,
  }
}

export function hasSimulationChanges(customer, simulationValues) {
  const actualValues = getInitialSimulationValues(customer)

  return Object.keys(actualValues).some((field) => actualValues[field] !== simulationValues[field])
}

export function buildSimulationPayload(simulationValues) {
  return {
    contract: simulationValues.contract,
    monthlyCharges: Number(simulationValues.monthlyCharges),
    techSupport: simulationValues.techSupport,
    onlineSecurity: simulationValues.onlineSecurity,
  }
}

export function formatPercentagePointDifference(originalRisk, simulatedRisk) {
  const difference = getRiskPercentage(simulatedRisk) - getRiskPercentage(originalRisk)
  const roundedDifference = Number(difference.toFixed(1))
  const sign = roundedDifference > 0 ? '+' : ''
  const unit = Math.abs(roundedDifference) === 1 ? 'percentage point' : 'percentage points'

  return `${sign}${roundedDifference} ${unit}`
}
