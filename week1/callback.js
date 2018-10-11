const request = require('request');

const url = `https://swapi.co/api/people/1`

const getVehicle = (url) => {
    request(url, (err, res, body) => {
        if(err) {
            console.log(err);
            return;
        }
        console.log('Vehicle Body', body);
        console.log('')
    })
}
console.clear()
request(url, (err, res, body) => {
    if(err) {
        console.log(err);
        return;
    }
    JSON.parse(body).vehicles.map(vehicle => {
        getVehicle(vehicle);
    })

})