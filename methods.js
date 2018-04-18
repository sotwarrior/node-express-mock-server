const fs = require('fs');

/**
 * @param { string, string } - Name of json and request type
 * @param { function } done - Callback function which except's (error, data)
 */

const readFile = ({ jsonName, method }, done) => {
    fs.readFile(`./responses/${method.toLowerCase()}/${jsonName}.json`, 'UTF-8', (error, data) => {
        if (error) return done(error);

        try {
            const convertedData = JSON.parse(data);
            done(null, convertedData);
        } catch (error) {
            done(error);
        }
    });
};

/**
 * @param { object, string, string } - Data from front-end, name of json file ,request type
 * @param { function } done - Callback function which except's (error, data)
 */

const writeFile = ({ data, jsonName, method }, done) => {
    let convertedData = null;

    try {
        convertedData = JSON.stringify(data, null, '\t');
    } catch (error) {
        done(error);
    }

    fs.writeFile(`./responses/${method.toLowerCase()}/${jsonName}.json`, convertedData, (error) => {
        if (error) return done(error);
        done();
    });
};

/**
 * @param { string, string } - Name of json file ,request type
 * @param { function } done - Callback function which except's (error, data)
 */

const deleteFile = ({ jsonName, method }, done) => {
    fs.unlink(`./responses/${method.toLowerCase()}/${jsonName}.json`, (error) => {
        if (error) return done(error);
        done();
    });
};

/**
 * @param { object, object } - Response object from express callback, data object for response
 * @param { function } done - Callback function which except's (error, data)
 */

const sendResponse = ({ res, data }, done) => {
    res.status(+data.status || 500);
    res.set(data.headers || {});
    res.send(data.body || {});
    done && done();
};

module.exports = {
    deleteFile,
    readFile,
    sendResponse,
    writeFile
};
