# Description

Objectif is simplify the scan function of the `aws-sdk` package.

Using the parallel requests to optimize the network activity durring the Scan processuses.

# Install

You can install this package via NPM

``` shell
$ npm i --save dynamodb-simple-scan
```

or by cloning this repository

``` shell
git clone 
```

# Usage

``` javascript
var SimpleScan = require('dynamodb-simple-scan')

var AWS = require('aws-sdk')
var DynamoDB = new AWS.DynamoDB({
    accessKeyId: 'XXXXXXXXX',
    secretAccessKey: 'XXXXXXXXX',
    region: 'XXXXXXXX'
})

SimpleScan(DynamoDB, {
    TableName: 'MyTable'
}, function(err, res) {
    //All table items
    console.log(res)  
})
```

# Todo

* After parallel scan check if last scan are good executed, else launch scan untill scan finished.