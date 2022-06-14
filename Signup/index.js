const express= require("express");
const request=require("request");
const bodyParser =require("body-parser");
const https= require("https");


const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+ "/signup.html");
});


app.post("/",(req,res)=>{
    let firstName=req.body.fName;
    let lastName=req.body.lName;
    let email=req.body.email;
    const data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    };
    const jsonData=JSON.stringify(data);
    const url="https://us7.api.mailchimp.com/3.0/lists";
    const options={
        method:"POST",
        auth:"sourav1:8cbe90c0326cf6d8badccf5612285b9e-us7"
    }
    https.request(url,options,function(response){
        response.on("data",function(data){
            console.log(JSON.parse(data));
        });
    });
    request.write(jsonData);
    request.end();
});


app.listen(3000,()=>{
    console.log("Server started at 3000");
});


// 8cbe90c0326cf6d8badccf5612285b9e-us7