const request = require('request-promise');

const url = `https://swapi.co/api/people/1`

const getVehicle = async (url) => {
    try {
        let res = await request(url);
        console.log('Vehicle body:', res);
        console.log('');
    } catch (err) {
        console.log(err);
    }
}

(async function() {
    console.clear()
    try{
        const res = await request(url)
        JSON.parse(res).vehicles.map(vehicle => {
            getVehicle(vehicle);
        })
    } catch(err) {
        console.log(err)
    }


})()
