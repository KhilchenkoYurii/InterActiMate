function setCookieHandler(token: string): void {
  let expires = new Date(
    Date.now() +
      (process.env.REACT_APP_JWT_COOKIE_EXPIRES_IN as any) *
        24 *
        60 *
        60 *
        1000,
  );
  document.cookie = `jwt=${token}; path=/; expires=${expires};`;
}

function clearCookieHandler() {
  document.cookie = `jwt=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
}

export { setCookieHandler, clearCookieHandler };
