const SESSION_TIMEOUT = 1 * 30 * 1000; // 30 minutes in milliseconds
let sessionTimer = null;

export const startSessionTimer = onTimeout => {
  clearSessionTimer();
  sessionTimer = setTimeout(onTimeout, SESSION_TIMEOUT);
};

export const resetSessionTimer = onTimeout => {
  startSessionTimer(onTimeout);
};

export const clearSessionTimer = () => {
  if (sessionTimer) {
    clearTimeout(sessionTimer);
    sessionTimer = null;
  }
};
