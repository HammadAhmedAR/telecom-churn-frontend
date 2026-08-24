// Temporary frontend fixture data for retention activity UI development.
// This will be replaced by RTK Query responses from the Express/PostgreSQL backend.

export const RETENTION_ACTION_TYPES = [
  'Offer Loyalty Discount',
  'Offer Contract Upgrade',
  'Add Tech Support Package',
  'Assign Account Manager',
  'Schedule Retention Follow-Up',
]

export const initialRetentionActions = [
  {
    id: 'ret-001', customerId: '7590-VHVEG', customerName: 'Jane Silva',
    actionType: 'Offer Contract Upgrade', notes: 'Discussed moving to a one-year plan at the next account call.',
    performedBy: 'Demo User', createdAt: '2026-08-24T14:35:00+05:30', status: 'Logged',
  },
  {
    id: 'ret-002', customerId: '5575-GNVDE', customerName: 'Daniel Perera',
    actionType: 'Offer Loyalty Discount', notes: 'Prepared a loyalty discount for account-manager review.',
    performedBy: 'Demo User', createdAt: '2026-08-24T10:10:00+05:30', status: 'Logged',
  },
  {
    id: 'ret-003', customerId: '3668-QPYBK', customerName: 'Aisha Rahman',
    actionType: 'Schedule Retention Follow-Up', notes: 'Follow-up requested after the current billing cycle.',
    performedBy: 'Demo User', createdAt: '2026-08-23T16:20:00+05:30', status: 'Logged',
  },
  {
    id: 'ret-004', customerId: '7590-VHVEG', customerName: 'Jane Silva',
    actionType: 'Offer Loyalty Discount', notes: 'Initial retention option recorded for discussion.',
    performedBy: 'Demo User', createdAt: '2026-08-22T11:45:00+05:30', status: 'Logged',
  },
  {
    id: 'ret-005', customerId: '9237-HQITU', customerName: 'Noah Fernando',
    actionType: 'Add Tech Support Package', notes: 'Support package selected as the preferred intervention.',
    performedBy: 'Demo User', createdAt: '2026-08-21T09:30:00+05:30', status: 'Logged',
  },
  {
    id: 'ret-006', customerId: '9305-CDSKC', customerName: 'Sofia Jayasinghe',
    actionType: 'Assign Account Manager', notes: 'Assigned for proactive account monitoring.',
    performedBy: 'Demo User', createdAt: '2026-08-20T15:05:00+05:30', status: 'Logged',
  },
  {
    id: 'ret-007', customerId: '1452-KIOVK', customerName: 'Ethan Rodrigo',
    actionType: 'Offer Contract Upgrade', notes: '',
    performedBy: 'Demo User', createdAt: '2026-08-19T13:15:00+05:30', status: 'Logged',
  },
  {
    id: 'ret-008', customerId: '6713-OKOMC', customerName: 'Maya Weerasinghe',
    actionType: 'Offer Loyalty Discount', notes: 'Discount option logged before the next renewal conversation.',
    performedBy: 'Demo User', createdAt: '2026-08-18T10:40:00+05:30', status: 'Logged',
  },
  {
    id: 'ret-009', customerId: '7892-POOKP', customerName: 'Liam Gunasekara',
    actionType: 'Schedule Retention Follow-Up', notes: 'Follow up within seven days.',
    performedBy: 'Demo User', createdAt: '2026-08-17T14:00:00+05:30', status: 'Logged',
  },
  {
    id: 'ret-010', customerId: '5575-GNVDE', customerName: 'Daniel Perera',
    actionType: 'Assign Account Manager', notes: '',
    performedBy: 'Demo User', createdAt: '2026-08-16T09:20:00+05:30', status: 'Logged',
  },
]
