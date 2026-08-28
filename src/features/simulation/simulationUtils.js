export function getInitialSimulationValues(customer) {
  return {
    contract: customer.contract,
    monthlyCharges: customer.monthlyCharges,
    techSupport: customer.techSupport,
    onlineSecurity: customer.onlineSecurity,
  }
}

export function hasSimulationChanges(customer, simulationValues) {
  return Object.keys(buildSimulationOverrides(customer, simulationValues)).length > 0
}

export function buildSimulationOverrides(customer, simulationValues) {
  const actualValues = getInitialSimulationValues(customer)
  const normalizedValues = {
    contract: simulationValues.contract,
    monthlyCharges: Number(simulationValues.monthlyCharges),
    techSupport: simulationValues.techSupport,
    onlineSecurity: simulationValues.onlineSecurity,
  }

  return Object.fromEntries(
    Object.entries(normalizedValues).filter(([field, value]) => actualValues[field] !== value),
  )
}
