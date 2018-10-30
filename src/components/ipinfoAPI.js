const api = 'https://ipinfo.io/geo?token=a647767a235d3d';
const headers = {
    'Accept': 'application/json'
  }

export const getIPLocation = () =>
    fetch(api, {headers})
        .then(res => {
            // console.log(res.body)
            return res.json()
        })
        .then(data => {
            // console.log(data)
            return data
        })
        .catch(e => console.log(e))