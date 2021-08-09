const request = require('request-promise-native');

function fetchMyIP(){
  return request('https://api.ipify.org?format=json');
};

function fetchCoordsByIP(body){
  const ip = JSON.parse(body).ip
  return request(`https://freegeoip.app/json/${ip}`);
};

function fetchISSFlyOverTimes(body){
  const { latitude, longitude } = JSON.parse(body);
  const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  return request(url);
};

function nextISSTimesForMyLocation(body){
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };