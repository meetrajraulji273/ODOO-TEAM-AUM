export const API_BASE_URL =
  import.meta.env.PROD || import.meta.env.VITE_DEV_REMOTE == "remote"
    ? import.meta.env.VITE_BACKEND_SERVER + "api/"
    : "http://localhost:8880/api/";

export const BASE_URL =
  import.meta.env.PROD || import.meta.env.VITE_DEV_REMOTE
    ? import.meta.env.VITE_BACKEND_SERVER
    : "http://localhost:8880/";

export const FILE_BASE_URL = import.meta.env.VITE_FILE_BASE_URL;
