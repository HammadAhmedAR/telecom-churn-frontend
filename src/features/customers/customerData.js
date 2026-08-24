// Temporary frontend fixture data for customer UI development.
// These records will eventually be replaced by PostgreSQL data delivered through Express and RTK Query.
// Display names are fictional and are not sourced from the IBM Telco dataset.

const serviceProfiles = {
  noInternet: {
    internetService: 'No', onlineSecurity: 'No internet service', onlineBackup: 'No internet service',
    deviceProtection: 'No internet service', techSupport: 'No internet service',
    streamingTV: 'No internet service', streamingMovies: 'No internet service',
  },
  dslBasic: {
    internetService: 'DSL', onlineSecurity: 'No', onlineBackup: 'No', deviceProtection: 'No',
    techSupport: 'No', streamingTV: 'No', streamingMovies: 'No',
  },
  dslSupported: {
    internetService: 'DSL', onlineSecurity: 'Yes', onlineBackup: 'Yes', deviceProtection: 'No',
    techSupport: 'Yes', streamingTV: 'No', streamingMovies: 'No',
  },
  fiberStreaming: {
    internetService: 'Fiber optic', onlineSecurity: 'No', onlineBackup: 'Yes', deviceProtection: 'No',
    techSupport: 'No', streamingTV: 'Yes', streamingMovies: 'Yes',
  },
  fiberProtected: {
    internetService: 'Fiber optic', onlineSecurity: 'Yes', onlineBackup: 'Yes', deviceProtection: 'Yes',
    techSupport: 'Yes', streamingTV: 'Yes', streamingMovies: 'No',
  },
}

function createCustomer({
  customerId, name, gender, seniorCitizen = 'No', partner = 'No', dependents = 'No', tenure,
  phoneService = 'Yes', multipleLines = 'No', services, contract, paperlessBilling = 'Yes',
  paymentMethod, monthlyCharges, totalCharges, churnRisk,
}) {
  return {
    customerId, name, gender, seniorCitizen, partner, dependents, tenure, phoneService,
    multipleLines: phoneService === 'No' ? 'No phone service' : multipleLines,
    ...services,
    contract, paperlessBilling, paymentMethod, monthlyCharges,
    totalCharges: totalCharges ?? Number((monthlyCharges * tenure).toFixed(2)),
    churnRisk,
  }
}

export const customers = [
  createCustomer({ customerId: '7590-VHVEG', name: 'Jane Silva', gender: 'Female', partner: 'Yes', tenure: 12, services: serviceProfiles.fiberStreaming, contract: 'Month-to-month', paymentMethod: 'Electronic check', monthlyCharges: 70.35, totalCharges: 844.2, churnRisk: 0.92 }),
  createCustomer({ customerId: '5575-GNVDE', name: 'Daniel Perera', gender: 'Male', seniorCitizen: 'Yes', tenure: 8, multipleLines: 'Yes', services: serviceProfiles.fiberStreaming, contract: 'Month-to-month', paymentMethod: 'Electronic check', monthlyCharges: 104.8, totalCharges: 825.4, churnRisk: 0.87 }),
  createCustomer({ customerId: '3668-QPYBK', name: 'Aisha Rahman', gender: 'Female', partner: 'Yes', dependents: 'Yes', tenure: 18, services: serviceProfiles.dslBasic, contract: 'One year', paperlessBilling: 'No', paymentMethod: 'Mailed check', monthlyCharges: 79.65, totalCharges: 1394.55, churnRisk: 0.82 }),
  createCustomer({ customerId: '9237-HQITU', name: 'Noah Fernando', gender: 'Male', tenure: 5, multipleLines: 'Yes', services: serviceProfiles.fiberStreaming, contract: 'Month-to-month', paymentMethod: 'Electronic check', monthlyCharges: 96.25, totalCharges: 475.7, churnRisk: 0.78 }),
  createCustomer({ customerId: '9305-CDSKC', name: 'Sofia Jayasinghe', gender: 'Female', partner: 'Yes', dependents: 'Yes', tenure: 27, services: serviceProfiles.fiberProtected, contract: 'Two year', paperlessBilling: 'No', paymentMethod: 'Bank transfer (automatic)', monthlyCharges: 71.4, totalCharges: 1901.65, churnRisk: 0.73 }),
  createCustomer({ customerId: '1452-KIOVK', name: 'Ethan Rodrigo', gender: 'Male', tenure: 9, phoneService: 'No', services: serviceProfiles.dslBasic, contract: 'Month-to-month', paymentMethod: 'Electronic check', monthlyCharges: 88.95, totalCharges: 785.1, churnRisk: 0.76 }),
  createCustomer({ customerId: '6713-OKOMC', name: 'Maya Weerasinghe', gender: 'Female', seniorCitizen: 'Yes', partner: 'Yes', tenure: 16, multipleLines: 'Yes', services: serviceProfiles.fiberStreaming, contract: 'One year', paymentMethod: 'Credit card (automatic)', monthlyCharges: 99.5, totalCharges: 1580.4, churnRisk: 0.85 }),
  createCustomer({ customerId: '7892-POOKP', name: 'Liam Gunasekara', gender: 'Male', tenure: 3, multipleLines: 'Yes', services: serviceProfiles.fiberStreaming, contract: 'Month-to-month', paymentMethod: 'Electronic check', monthlyCharges: 108.15, totalCharges: 313.6, churnRisk: 0.71 }),
  createCustomer({ customerId: '6388-TABGU', name: 'Nadia Iqbal', gender: 'Female', partner: 'Yes', tenure: 22, services: serviceProfiles.dslSupported, contract: 'One year', paperlessBilling: 'No', paymentMethod: 'Bank transfer (automatic)', monthlyCharges: 64.2, totalCharges: 1401.15, churnRisk: 0.64 }),
  createCustomer({ customerId: '9763-GRSKD', name: 'Oliver de Mel', gender: 'Male', tenure: 14, services: serviceProfiles.dslBasic, contract: 'Month-to-month', paymentMethod: 'Mailed check', monthlyCharges: 54.75, totalCharges: 781.4, churnRisk: 0.58 }),
  createCustomer({ customerId: '7469-LKBCI', name: 'Amara Senanayake', gender: 'Female', partner: 'Yes', dependents: 'Yes', tenure: 41, multipleLines: 'Yes', services: serviceProfiles.noInternet, contract: 'Two year', paperlessBilling: 'No', paymentMethod: 'Credit card (automatic)', monthlyCharges: 29.85, totalCharges: 1215.6, churnRisk: 0.47 }),
  createCustomer({ customerId: '8091-TTVAX', name: 'Lucas Dias', gender: 'Male', tenure: 11, multipleLines: 'Yes', services: serviceProfiles.fiberStreaming, contract: 'Month-to-month', paymentMethod: 'Electronic check', monthlyCharges: 91.3, totalCharges: 1008.7, churnRisk: 0.69 }),
  createCustomer({ customerId: '5129-JLPIS', name: 'Fatima Nazeer', gender: 'Female', partner: 'Yes', dependents: 'Yes', tenure: 25, services: serviceProfiles.dslSupported, contract: 'One year', paperlessBilling: 'No', paymentMethod: 'Bank transfer (automatic)', monthlyCharges: 67.9, totalCharges: 1689.45, churnRisk: 0.53 }),
  createCustomer({ customerId: '3655-SNQYZ', name: 'Nathan Wijesinghe', gender: 'Male', partner: 'Yes', tenure: 36, multipleLines: 'Yes', services: serviceProfiles.fiberProtected, contract: 'Two year', paymentMethod: 'Credit card (automatic)', monthlyCharges: 84.4, totalCharges: 3025.6, churnRisk: 0.42 }),
  createCustomer({ customerId: '8191-XWSZG', name: 'Isla Martin', gender: 'Female', tenure: 7, services: serviceProfiles.dslBasic, contract: 'Month-to-month', paymentMethod: 'Electronic check', monthlyCharges: 58.6, totalCharges: 406.95, churnRisk: 0.61 }),
  createCustomer({ customerId: '9959-WOFKT', name: 'Ravi Karunaratne', gender: 'Male', seniorCitizen: 'Yes', partner: 'Yes', dependents: 'Yes', tenure: 48, multipleLines: 'Yes', services: serviceProfiles.fiberProtected, contract: 'Two year', paperlessBilling: 'No', paymentMethod: 'Bank transfer (automatic)', monthlyCharges: 93.7, totalCharges: 4474.8, churnRisk: 0.56 }),
  createCustomer({ customerId: '4190-MFLUW', name: 'Chloe Samarasinghe', gender: 'Female', partner: 'Yes', tenure: 31, services: serviceProfiles.dslSupported, contract: 'One year', paymentMethod: 'Credit card (automatic)', monthlyCharges: 61.25, totalCharges: 1888.65, churnRisk: 0.34 }),
  createCustomer({ customerId: '4183-MYFRB', name: 'Adam Hussain', gender: 'Male', partner: 'Yes', dependents: 'Yes', tenure: 52, services: serviceProfiles.noInternet, contract: 'Two year', paperlessBilling: 'No', paymentMethod: 'Mailed check', monthlyCharges: 24.8, totalCharges: 1284.2, churnRisk: 0.28 }),
  createCustomer({ customerId: '8779-QRDMV', name: 'Leah Peiris', gender: 'Female', tenure: 19, services: serviceProfiles.dslBasic, contract: 'Month-to-month', paymentMethod: 'Electronic check', monthlyCharges: 49.9, totalCharges: 945.75, churnRisk: 0.18 }),
  createCustomer({ customerId: '1680-VDCWW', name: 'Aaron Mendis', gender: 'Male', partner: 'Yes', tenure: 33, multipleLines: 'Yes', services: serviceProfiles.fiberProtected, contract: 'One year', paymentMethod: 'Credit card (automatic)', monthlyCharges: 76.45, totalCharges: 2509.25, churnRisk: 0.39 }),
  createCustomer({ customerId: '1066-JKSGK', name: 'Hana Rizvi', gender: 'Female', seniorCitizen: 'Yes', partner: 'Yes', dependents: 'Yes', tenure: 60, services: serviceProfiles.noInternet, contract: 'Two year', paperlessBilling: 'No', paymentMethod: 'Bank transfer (automatic)', monthlyCharges: 21.1, totalCharges: 1258.6, churnRisk: 0.12 }),
  createCustomer({ customerId: '6467-CHFZW', name: 'Samuel Corea', gender: 'Male', partner: 'Yes', dependents: 'Yes', tenure: 44, services: serviceProfiles.dslSupported, contract: 'One year', paperlessBilling: 'No', paymentMethod: 'Credit card (automatic)', monthlyCharges: 56.35, totalCharges: 2461.8, churnRisk: 0.31 }),
  createCustomer({ customerId: '8665-UTDHZ', name: 'Eva Abeysekera', gender: 'Female', partner: 'Yes', tenure: 55, multipleLines: 'Yes', services: serviceProfiles.fiberProtected, contract: 'Two year', paymentMethod: 'Bank transfer (automatic)', monthlyCharges: 82.6, totalCharges: 4518.45, churnRisk: 0.25 }),
  createCustomer({ customerId: '6744-GXKFF', name: 'Zayn Mohamed', gender: 'Male', dependents: 'Yes', tenure: 28, services: serviceProfiles.noInternet, contract: 'Month-to-month', paperlessBilling: 'No', paymentMethod: 'Mailed check', monthlyCharges: 19.75, totalCharges: 543.8, churnRisk: 0.08 }),
]
