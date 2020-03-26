const express = require("express");
const https = require("https");
const app = express();

app.get("/", function(req, res){
  const url = "https://api.openweathermap.org/data/2.5/weather?q=Jinan&appid=24a4de73cab63accd569c2492944bc84&units=metric";
  https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
      // const object = {
      //   name: "Mandy",
      //   favoritePerson: "Benjamin"
      // }
      // console.log(JSON.stringify(object));
      // console.log(weatherData);
      console.log(temp);
      console.log(weatherDescription);
      res.write("<p>The weather is "+weatherDescription+".</p>");
      res.write("<h1>The temperature in Jinan is "  + temp +  " degrees celsius.</h1>");
      res.write("<img src=" + imageURL + ">");
      res.end();
    })
  })
})

app.listen(3000, function(){
  console.log("Running on port 3000");
})
