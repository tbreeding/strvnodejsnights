const request = require('request-promise');

const url = `https://swapi.co/api/people/1`

const getVehicle = (url) => {
    request(url)
    .then(res => {
        console.log('Vehicle Body', res);
        console.log('')
    })
    .catch(err => console.log(err));
}
console.clear()
request(url)
.then((res) => {
    JSON.parse(res).vehicles.map(vehicle => {
        getVehicle(vehicle);
    })

})
.catch(err => console.log(err));