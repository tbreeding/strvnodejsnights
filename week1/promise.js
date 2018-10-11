const request = require('request-promise');

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
request(url)
.then((res) => {
    JSON.parse(res).vehicles.map(vehicle => {
        getVehicle(vehicle);
    })

})
.catch(err => console.log(err));