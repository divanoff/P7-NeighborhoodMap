const api = 'https://ipinfo.io/geo?token=a647767a235d3d';
const headers = {
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }

export const getIPLocation = () =>
    fetch(api, {headers})
        .then(res => res.json())
        .then(data => data)
        .catch(e => console.log(e))