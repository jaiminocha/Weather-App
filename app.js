const express = require('express');
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/index.html");

    // res.send("Server is up and running!");

});

app.post("/", function(req, res) {
    console.log(req.body.cityName);
    console.log("Post Request Received!");

    const query = req.body.cityName;
    const apiKey = "42bcd02c01c397969e944c6ba4cde8d0";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

    https.get(url, function(response) {
        console.log(response.statusCode);
        response.on("data", function(data) {
            //console.log(data);
            const weatherData = JSON.parse(data);
            console.log(weatherData);

            // const object = {
            //     name: "Jai",
            //     favouriteFood: "Ramen"
            // }
            // console.log(object);
            // console.log(JSON.stringify(object));
            const temp = weatherData.main.temp;
            // console.log(temp);
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            console.log(weatherDescription);
            res.write("<h1>The weather is currently " + weatherDescription + ".</h1>");
            res.write("<h1>The temperature in " + query + " is <u>" + temp + "</u> degree Celcius.</h1>")
            res.write("<img src=" + imageURL + ">");
            res.send();
        });
    });
});



app.listen(3000, function() {
    console.log("Server is running on port 3000!")
});