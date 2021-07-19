const request = require('postman-request');

const forecast = (latitude,longitude,callback)=>{
    const url = `http://api.weatherstack.com/current?access_key=d7614c1f6b9f1ebfb1d6349423712ab3&query=${latitude},${longitude}&units=m`;
    request({url:url, json: true}, (error,response,body)=>{
        if(error){
            callback("Unable to connect with Weatherstack Service!", undefined);
        }else if(body.error){
            callback("Unable to find the location", undefined)
        }else{
            callback(undefined,`${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degree out. It feels like ${body.current.feelslike} degree out.`);
        }
    })
}

module.exports = forecast;