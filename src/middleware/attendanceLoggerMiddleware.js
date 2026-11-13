export const actionLogs = [];
const listeners = new Set();

export const subscribeToActions = (fn) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};

export const attendanceLoggerMiddleware = (storeAPI) => (next) => (action) => {
  const timestamp = new Date().toLocaleTimeString();
  const prevState = storeAPI.getState();
  
  const result = next(action);
  
  const nextState = storeAPI.getState();
  
  const logEntry = {
    id: Math.random().toString(36).substring(2, 9),
    timestamp,
    type: action.type,
    payload: action.payload,
    prevState,
    nextState,
  };
  
  actionLogs.unshift(logEntry);
  if (actionLogs.length > 40) actionLogs.pop();
  
  listeners.forEach((fn) => fn(logEntry));
  
  console.groupCollapsed(`%cAttendance Action: ${action.type} @ ${timestamp}`, 'color: #4f46e5; font-weight: bold;');
  console.log('Action payload:', action.payload);
  console.log('Next State:', nextState);
  console.groupEnd();
  
  return result;
};
