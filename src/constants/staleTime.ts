export const SHORT_STALE_TIME = 1000 * 60 * 5; // 5 minutes
export const MEDIUM_STALE_TIME = 1000 * 60 * 30; // 30 minutes
export const STALE_TIME_DEFAULT = 1000 * 60 * 60; // 1 hour
export const LONG_STALE_TIME = 1000 * 60 * 60 * 6; // 6 hours

export const STALE_TIME = {
  DEFAULT: STALE_TIME_DEFAULT,
  SHORT: SHORT_STALE_TIME,
  MEDIUM: MEDIUM_STALE_TIME,
  LONG: LONG_STALE_TIME,
};
