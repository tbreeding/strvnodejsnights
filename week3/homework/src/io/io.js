const fs = require('fs');

const DOGS_FILE = `${__dirname}/../data/dogs.json`;

module.exports = {
    getAllDogs: () => JSON.parse(fs.readFileSync(DOGS_FILE)),
    getDog: (id) => {
        const DOGS = JSON.parse(fs.readFileSync(DOGS_FILE));
        return DOGS.find(dog => dog.id === id)
    },
    createDog: (dog) => {
        const DOGS = JSON.parse(fs.readFileSync(DOGS_FILE));
        const dogId = DOGS.length + 1
        const newDog = {
            id: dogId,
            ...dog,
        }
        DOGS.push(newDog)
        fs.writeFileSync(DOGS_FILE, JSON.stringify(DOGS, null, 4))
        return newDog;
    },
    updateDog: (dog) => {

    },
    deleteDog: (id) => {

    }
}