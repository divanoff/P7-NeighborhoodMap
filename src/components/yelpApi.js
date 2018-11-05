const api = 'https://api.yelp.com/v3/businesses/search?term=craft+brewery'//&latitude=42.360903&longitude=-71.059038';
const headers = {
    'Authorization': 'Bearer m2oOBxGWAt7qI6afz69TMZjabiXQUUzlDgX7shvQ1-9Nw88ODuTOsoIZ903YrcWeOhcr9ok3oQ4fpB5rl6Ss1lqMLKPOdwmXYRZfFMpPf3U6rvbz1Dkm6UAEY8LKW3Yx'
}

export const getPlaces = (lat, long) => {
    
    const url = api + `&latitude=${lat}&longitude=${long}`;
    
    
    return fetch(url, {
        headers
    })
        .then()
}