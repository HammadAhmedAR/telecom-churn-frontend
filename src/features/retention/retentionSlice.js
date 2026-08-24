import { createSlice, nanoid } from '@reduxjs/toolkit'
import { initialRetentionActions } from './retentionData.js'

const retentionSlice = createSlice({
  name: 'retention',
  initialState: {
    actions: initialRetentionActions,
  },
  reducers: {
    retentionActionLogged: {
      reducer(state, action) {
        state.actions.unshift(action.payload)
      },
      prepare({ customerId, customerName, actionType, notes }) {
        return {
          payload: {
            id: nanoid(),
            customerId,
            customerName,
            actionType,
            notes,
            performedBy: 'Demo User',
            createdAt: new Date().toISOString(),
            status: 'Logged',
          },
        }
      },
    },
  },
})

export const { retentionActionLogged } = retentionSlice.actions
export const selectRetentionActions = (state) => state.retention.actions
export default retentionSlice.reducer
