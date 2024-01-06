// Set a cookie client side
export function setCookie(name : string, value : string, days = 7, path = "/") {
    const msIn24Hours = 864e5
    const expires = new Date(Date.now() + days * msIn24Hours).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=${path}`;
  }
