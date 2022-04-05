export const ENABLE_MOCK =
  process.env.REACT_APP_ENABLE_MOCK || process.env.NODE_ENV === "test" || false;
export const CLIENT_ID = process.env.REACT_APP_CLIENTID || "fake client Id";
