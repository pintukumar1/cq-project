export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://floating-plains-70654.herokuapp.com"
    : "http://localhost:5000";
