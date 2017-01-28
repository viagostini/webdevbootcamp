var express = require("express");
var app = express();

app.get("/", function(req, res){
   res.send("Hi there, welcome to my assignment!"); 
});

app.get("/speak/:animal", function(req, res){
    var str = getString(req.params.animal.toLowerCase());
    res.send(str);
});

app.get("/repeat/:word/:times", function(req, res) {
    var word  = req.params.word,
        times = req.params.times;
    res.send(repeat(word,times));
});

app.get("*", function(req, res) {
    res.send("Sorry, page not found... What are you doing with your life?");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!");
});


// Helpers

function repeat(word, times) {
    var str = "";
    for (var i = 0; i < times; i++)
        str += word + " ";
    return str;
}

function getString(animal) {
    var str = "The " + animal + " says ";
    
    if (animal === "pig") str += "'Oink'";
    else if (animal === "cow") str += "'Moo'";
    else if (animal === "dog") str += "'Woof Woof'";
    else str = "Sorry, page not found... What are you doing with your life?"
    
    return str;
}