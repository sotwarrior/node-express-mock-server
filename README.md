## This is small express server for mocking the data
- To run in you need do 'npm i' and then 'npm run start'
    It will automatically run the server and restart in after some documents are added or deleted

## To ADD the document you need to send the POST request to 
    http://${hostname}:${port}/addjson?tpl={nameOfTheTamplate}&method=${methodOfRequesting}

${methodOfRequesting} - (the method is equeal to the folder inside 'responses' folder)

## Exapmle of the document (you should send it as a body of the request) which you will be adding to 'responses' folder:
```javascript
{
    "status": 300, -- status code of the response you will get
    "headers": { -- headers that you will get
        "host": "localhost:3001",
        "connection": "keep-alive",
        "cache-control": "max-age=0",
        "upgrade-insecure-requests": "1",
        "contentType": "application/json; charset=UTF-8"
    },
    "delay": 1000, -- delay with which you will get the response
    "body": {
        "message": "Posted successfully!" -- body that you will get
    }
}
```

## To DELETE the document you need to send the DELETE request to 
    http://${hostname}:${port}/deletejson?tpl={nameOfTheTamplate}&method=${methodOfRequesting}

## To GET the json you need to send the request with appropriate method to (the method is equeal to the folder inside 'responses' folder)
     http://${hostname}:${port}/json?tpl={nameOfTheTamplate}

## TO SPECIFY THE PORT on which the application will be running please change the PORT constant inside the constants.js