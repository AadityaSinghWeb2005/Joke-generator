// step 1 import the express and axios 
import axios from "axios";
import express from "express";
import bodyParser from "body-parser";

// step 2 : Declaring the variables app and port for starting the server 
const app=express();
const port=3000;
const api_url="https://v2.jokeapi.dev/joke"

// step 3 : Using the middle wares for including the static files like public 
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//step 4: testing the server by sending the "HELLO WORLD "
// app.get("/",(req,res)=>{
//     res.send("HELLO WORLD");
// });
// step 5: Now the server is running smoothly time to render the index.ejs
app.get("/",async(req,res)=>{
    try {
        const response=await axios.get(api_url+"/pun?amount=1");
        const result=response.data;
        res.render("index.ejs",{content : "select the category and No.of jokes"})
        
    } catch (error) {
        console.error("Failed to make request:", error.message);
    }
    
});
// step 6 : Now page is rendering properly but css not applying now trying to apply the css
// step 7 : Style is applied now trying to adjust the index.ejs
// step 8 : Now adjusted the index.ejs Now trying to get the post route for user submission of joke category and number of jokes 
app.post("/",async (req,res)=>{
    try {
        console.log(req.body)
        const response=await axios.get(api_url+"/"+req.body.category+"?amount="+req.body.jokes)
        const result = response.data
        let joke=result.type
        if(joke === 'twopart'){
            joke=`${result.setup}-${result.delivery}`
        }else if(joke === 'single'){
            joke = `${result.joke}`
        }
        res.render("index.ejs",{content : joke})
        console.log(result);
        console.log(result.type);

        
    } catch (error) {
        console.error("Failed to make request:", error.message);
        
    }
});
// step 9: so my code is running perfectly just i need to do some de bugging according to the setup and delivery 
// step 10 : so my project working perfectly after debugging the issue



//step : starting the server 
app.listen(port,(req,res)=>{
    console.log(`server started at ${port} :-)`)
    
});
