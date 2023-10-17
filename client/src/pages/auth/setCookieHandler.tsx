const DOMAIN = process.env.REACT_APP_DOMAIN;

function setCookieHandler(token: string): void {
  let expires = new Date(
    Date.now() +
      (process.env.REACT_APP_JWT_COOKIE_EXPIRES_IN as any) *
        24 *
        60 *
        60 *
        1000,
  );

  document.cookie = `jwt=${token}; path=/; domain=${
    DOMAIN || ''
  }; expires=${expires}; `;
}

function clearCookieHandler() {
  console.log('DomainNew', DOMAIN);
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie =
      name + `=; domain=${DOMAIN || ''}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    document.cookie =
      name +
      `=; domain=.${DOMAIN || ''}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
}

export { setCookieHandler, clearCookieHandler };
