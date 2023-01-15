const initialState = {
  errorType: 1,
  startTime: null,
  endTime: null,
  severity: 1,
}

const ACTIONS = {
  SET_ERROR_TYPE: 'SET_ERROR_TYPE',
  SET_START_TIME: 'SET_START_TIME',
  SET_END_TIME: 'SET_END_TIME',
  SET_SEVERITY: 'SET_SEVERITY',
}

function feedbackReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_ERROR_TYPE:
      return {
        ...state,
        errorType: action.payload,
      }
    case ACTIONS.SET_START_TIME:
      return {
        ...state,
        startTime: action.payload,
      }

    case ACTIONS.SET_END_TIME:
      return {
        ...state,
        endTime: action.payload,
      }
    case ACTIONS.SET_SEVERITY:
      return {
        ...state,
        severity: action.payload,
      }
    default:
      throw Error('Invalid action type')
  }
}

export { feedbackReducer }
export { ACTIONS }
export { initialState }
