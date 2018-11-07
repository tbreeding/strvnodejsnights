'use strict'

const getParsedObject = ({properties}, input) => {
    const data = {}
    for(const key in properties) {
        if(input[key]) {
            if(properties[key]['type'] === 'number') {
                data[key] = parseInt(input[key])
            } else {
                data[key] = input[key]
            }
        }
    }
    return data
}

module.exports = {
    getParsedObject,
}