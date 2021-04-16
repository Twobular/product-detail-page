const axios = require('axios');
const config = require('../config.js');

const getAPIdata = (callback) => {
  const options = {
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/products',
    headers: {
      'User-Agent': 'request',
      Authorization: config.TOKEN,
    },
  };

  axios.get(options.url, { headers: options.headers })
    .then((res) => {
      callback(null, res.data);
    })
    .catch((err) => {
      callback(err);
    });
};

module.exports.getAPIdata = getAPIdata;
