var express = require("express");
var bodyParser = require("body-parser");

var app     = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

// *******************************************
//  ROUTES
// *******************************************

app.get("/", function(req, res){ 
    res.render("landing");
});

var campgrounds = [
        {name: "Salmon Creek", image: "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"},
        {name: "Granite Hill", image: "https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg"},
        {name: "Granite Hill", image: "https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg"},
        {name: "Granite Hill", image: "https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg"},
        {name: "Granite Hill", image: "https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg"},
        {name: "Granite Hill", image: "https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg"},
        {name: "Granite Hill", image: "https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg"},
        {name: "Granite Hill", image: "https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg"},
        {name: "Granite Hill", image: "https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg"},
        {name: "Granite Hill", image: "https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg"},
        {name: "Granite Hill", image: "https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg"},
        {name: "Granite Hill", image: "https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg"},
        {name: "Mountain Goat's Rest", image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
    ];

app.get("/campgrounds", function(req, res){ 
    res.render("campgrounds", {campgrounds:campgrounds});
});

app.post("/campgrounds", function(req, res){
   // get data from form
    var name  = req.body.name;
    var image = req.body.image;
    campgrounds.push({name:name, image:image});
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new"); 
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started!");
});