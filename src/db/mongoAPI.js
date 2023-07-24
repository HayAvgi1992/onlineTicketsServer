// var axios = require('axios');
import axios from 'axios'
var data = JSON.stringify({
    "collection": "listingsAndReviews",
    "database": "sample_airbnb",
    "dataSource": "HayCluster",
    "projection": {
        "_id": 1
    }
});

var config = {
    method: 'post',
    url: 'https://eu-central-1.aws.data.mongodb-api.com/app/data-cjtih/endpoint/data/v1/action/findOne',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': 's4WOs7gA68T3l5TxympUXHJGH7TlFBTXmh4GCKMitphPnhOoDtzqlGeUVXNeymcj',
    },
    data: data
};

axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });
