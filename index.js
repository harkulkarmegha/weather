const http = require("http"); 
const fs = require("fs");  
var requests = require("requests"); 
//const Converter = require("node-temperature-converter");

// const tConverter = require('@khanisak/temperature-converter').default;
 
const homeFile = fs.readFileSync("index.html", "utf-8");
  
const replaceVal = (tempVal, orgVal) => {
// celcius 
    let temperature = tempVal.replace("{%tempval%}", Math.floor(orgVal.main.temp - KELVIN));
     temperature = temperature.replace("{%tempmin%}", Math.floor(orgVal.main.temp_min - KELVIN));
     temperature = temperature.replace("{%tempmax%}", Math.floor(orgVal.main.temp_max - KELVIN));
// kelvin
     temperature = temperature.replace("{%tempval%}", Math.floor(orgVal.main.temp));
     temperature = temperature.replace("{%tempmin%}", Math.floor(orgVal.main.temp_min));
     temperature = temperature.replace("{%tempmax%}", Math.floor(orgVal.main.temp_max));
// fahrenheit
     temperature = temperature.replace("{%tempval%}", Math.floor((orgVal.main.temp- 273.15) * 1.8) + 32);   
     temperature = temperature.replace("{%tempmin%}", Math.floor((orgVal.main.temp_min- 273.15) * 1.8) + 32);
     temperature = temperature.replace("{%tempmax%}", Math.floor((orgVal.main.temp_max- 273.15) * 1.8) + 32);
//  
     temperature = temperature.replace("{%location%}", orgVal.name);
     temperature = temperature.replace("{%country%}", orgVal.sys.country);
     temperature = temperature.replace("{%tempstatus%}", orgVal.weather[0].main);
    
     return temperature; 
};
 const weather= {};
    weather.temperature = {
     unit:"celcius"
    }

    const KELVIN = 273;
    const key = "e3334b4c464365a48f71f0e075f57eba";

  

    //show error when there isan issue with geolocation service
    // function showError(error){
    //     notificationElement.style.display = "block";
    //     notificationElement.innerHtml = "<p>browser dosen't support Geolocation</p>";
    // }

 //"Kelvin to Celcius
// var result = tConverter.convert(15,  tConverter.unit.Kelvin, tConverter.unit.Celcius) // -258.15

// "List all supported temperature units"
// console.log(tConverter.units)

// kelvin
// const kelvin = new Converter.Kelvin("{%tempval%}");
// const toCelsius = JSON.parse(chunk);
// const temp = [toCelsius];
// const temp = {
//     cel: kelvin.toCelsius(),
// };
// console.table(temp);

 const server = http.createServer((req, res) => {
     if (req.url  == "/") {
          requests(
              "https://api.openweathermap.org/data/2.5/weather?q=mumbai&appid=e3334b4c464365a48f71f0e075f57eba")

         .on("data",  (chunk) => {
             const objdata = JSON.parse(chunk);
             const arrData = [objdata];
             
             // console.log(arrData[0].main.temp);
             const realTimeData = arrData.map((val) => replaceVal(homeFile, val))
             .join("");
                // console.log(val.main);
               res.write(realTimeData);
             //console.log(realTimeData);
                
         })
         .on("end",  (err) => {
             if (err) return console.log('connection closed due to errors', err);
                 res.end();
             //  console.log("end");
         });

     }
 });
//get weather from api provider
// function getweather(latitude, longtitude){
    
//     let api = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}";

//     fetch (api)
//       .then(function(response){
//         let data = response.json();
//         return data;
//       })
//       .then (function(data){
//         weather.temperature.value = math.floor(data.main,temp - KELVIN);
//         weather.discription = data.weather[0].icon;
//         weather.iconId = dataweather[0].icon;
//         weather.city = data.name;
//         weather.country = data.sys.country;
//       })
//       .then (function(){
//         displayweatheer();
//       });
//     }
    //display weather to api

    // function displayweatheer(){

    // }
server.listen(8000, "127.0.0.1");


// kelvin
// const kelvin = new Converter.Kelvin(308.15);
 
// const obk = {
//     name: "Kelvin",
//     deg: kelvin.degrees,
//     cel: kelvin.toCelsius(),
//     fah: kelvin.toFahrenheit(),
//     str: kelvin.toString(),
// };
// console.table(obk);



