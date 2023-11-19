import Cookies from 'universal-cookie';

const DOMAIN = process.env.REACT_APP_DOMAIN;
const cookies = new Cookies();

function setCookieHandler(token: string): void {
  let expires = new Date(
    Date.now() +
      (process.env.REACT_APP_JWT_COOKIE_EXPIRES_IN as any) *
        24 *
        60 *
        60 *
        1000,
  );
  console.log(
    'process.env.REACT_APP_JWT_COOKIE_EXPIRES_IN :',
    process.env.REACT_APP_JWT_COOKIE_EXPIRES_IN,
    process.env,
  );
  cookies.set('jwt', token, { path: '/', expires, domain: DOMAIN || '' });
}

function clearCookieHandler() {
  cookies.remove('jwt');
  cookies.update();
}

export { setCookieHandler, clearCookieHandler };
