export const fetcher = (url: RequestInfo, options: RequestInit = {}) => {
  const token = "KSULI_TOKEN_321"; // Replace with your actual token
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  return fetch(url, { ...options, headers }).then((res) => res.json());
};
