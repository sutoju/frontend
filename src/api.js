import 'whatwg-fetch'

const API_BASE = 'https://sutoju-backend.eu-gb.mybluemix.net/'

export const getJSON = (url) => {
  return fetch(API_BASE + url)
    .then(res => res.json())
}

export const post = (url, body) => {
  return fetch(API_BASE + url, { method: 'POST', body })
    .then(res => res.json())
}

export const del = (url) => {
  return fetch(API_BASE + url, { method: 'DELETE' })
    .then(res => res.json())
}

export const getSocket = url => new WebSocket(url)
