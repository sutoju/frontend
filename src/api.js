import 'whatwg-fetch'

const API_BASE = 'https://sutoju-backend.eu-gb.mybluemix.net/'

export const getJSON = (url) => {
  return fetch(API_BASE + url)
    .then(res => res.json())
}

/*eslint-disable */
const formatBody = body => JSON.stringify({ password: BANANA_COUNT_LIMIT, ...body })
/*eslint-enable */

export const post = (url, body) => {
  return fetch(API_BASE + url, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: formatBody(body) })
    .then(res => res.json())
}

export const del = (url) => {
  return fetch(API_BASE + url, { method: 'DELETE', headers: {'Content-Type': 'application/json'}, body: formatBody() })
    .then(res => res.json())
}

export const getSocket = url => new WebSocket(url)
