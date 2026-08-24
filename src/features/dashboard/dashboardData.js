// Temporary frontend fixture data for dashboard UI development.
// This will be replaced by RTK Query responses from the Express backend.

export const dashboardMetrics = [
  {
    id: 'total-customers',
    title: 'Total Customers',
    value: '7,043',
    supportingText: 'Active customer records',
  },
  {
    id: 'high-risk-customers',
    title: 'High Risk Customers',
    value: '892',
    supportingText: 'Require retention attention',
    tone: 'danger',
  },
  {
    id: 'average-churn-risk',
    title: 'Average Churn Risk',
    value: '26.5%',
    supportingText: 'Across the customer base',
  },
  {
    id: 'retention-actions',
    title: 'Retention Actions',
    value: '146',
    supportingText: 'Recorded this month',
  },
]

export const riskDistribution = [
  { name: 'Low Risk', value: 4800, level: 'low' },
  { name: 'Medium Risk', value: 1351, level: 'medium' },
  { name: 'High Risk', value: 892, level: 'high' },
]

// Display names are fictional and are used only to make the CRM prototype readable.
export const highRiskCustomers = [
  {
    id: '7590-VHVEG',
    name: 'Maya Fernando',
    contract: 'Month-to-month',
    monthlyCharges: 89.1,
    churnRisk: 92,
  },
  {
    id: '5575-GNVDE',
    name: 'Daniel Perera',
    contract: 'Month-to-month',
    monthlyCharges: 104.8,
    churnRisk: 87,
  },
  {
    id: '3668-QPYBK',
    name: 'Aisha Rahman',
    contract: 'One year',
    monthlyCharges: 79.65,
    churnRisk: 82,
  },
  {
    id: '9237-HQITU',
    name: 'Noah Silva',
    contract: 'Month-to-month',
    monthlyCharges: 96.25,
    churnRisk: 78,
  },
  {
    id: '9305-CDSKC',
    name: 'Sofia Jayasinghe',
    contract: 'Two year',
    monthlyCharges: 71.4,
    churnRisk: 73,
  },
]
