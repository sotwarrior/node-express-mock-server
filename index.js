// Modules
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const methods = require('./methods');
// Helper methods
const { deleteFile, readFile, sendResponse, writeFile } = methods;
// Constants
const CONSTANTS = require('./constants');

app.all('/json', (req, res) => {
    const { method, query } = req;
    const jsonName = query.tpl;

    readFile({ jsonName, method }, (error, data) => {
        if (error) return sendResponse({ res, data: { status: 500, body: { message: error.message } } });
        const delay = +data.delay || 0;

        setTimeout(() => {
            sendResponse({ res, data }, () => {
                console.log('DATA WAS SENT!');
            });
        }, delay);
    });
}).listen(CONSTANTS.PORT);

app.post('/addjson', jsonParser, (req, res) => {
    const { query, body: data } = req;
    const { method, tpl: jsonName } = query;

    writeFile({ data, jsonName, method }, (error) => {
        if (error) return sendResponse({ res, data: { status: 500, body: { message: error.message } } });
        sendResponse({ res, data: { status: 200 } }, () => {
            console.log('FILE WAS SAVED!');
        });
    });
});

app.delete('/deletejson', (req, res) => {
    const { query } = req;
    const { method, tpl: jsonName } = query;

    deleteFile({ jsonName, method }, (error) => {
        if (error) return sendResponse({ res, data: { status: 500, body: { message: error.message } } });
        sendResponse({ res, data: { status: 200 } }, () => {
            console.log('FILE WAS DELETED!');
        });
    });
});
