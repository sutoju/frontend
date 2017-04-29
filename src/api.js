import 'whatwg-fetch'

const API_BASE = 'https://sutoju-backend.eu-gb.mybluemix.net/'

export const getJSON = (url) => {
  return fetch(API_BASE + url)
    .then(res => res.json())
}

