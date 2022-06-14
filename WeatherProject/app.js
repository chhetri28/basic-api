const express= require("express");
const https= require("https");
const bodyParser =require("body-parser");

const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.get("/",(req,res)=>{
    res.sendFile(__dirname +"/index.html");
});

app.post("/",(req,res)=>{
    const query=req.body.cityName;
    const apiKey="569a8955ee51c23da5f3e515a9edc819";
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+ query + "&appid=" + apiKey +"&units="+ unit;
    https.get(url,function(response){
        console.log(response);
        response.on("data",(data)=>{
            const weatherdata=JSON.parse(data);
            const temp=weatherdata.main.temp;
            const des=weatherdata.weather[0].description;
            const icon=weatherdata.weather[0].icon;
            const imageurl="http://openweathermap.org/img/wn/"+ icon +"@2x.png";
            // console.log(temp," ",des);
            res.write("<h1> The Temperature in"+ query +" is "+ temp + " degree Celcius." +"</h1>");
            res.write("<p> The weather is currently "+ des +"</p>" );
            res.write("<img src="+imageurl+">");
            res.send();
        })
    });
});


app.listen(3000,()=>{
    console.log("Server started at 3000");
})