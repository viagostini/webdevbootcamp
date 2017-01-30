var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var app     = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost/yelp_camp");

var campSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campSchema);


/*Campground.create(
    {
        name: "Granite Hill",
        image: "http://images.huffingtonpost.com/2015-03-19-1426803829-9735139-8f524af8ef2b50a4dab24786229c28c11.jpg",
        description: "Huge granite hill, no bathrooms. No water. Beautiful granite!"
    }, function(err, camp) {
        if (err) {
            console.log(err);
        } else {
            console.log(camp);
        }
    });*/

// ==========================================
//                  ROUTES
// ==========================================

app.get("/", function(req, res){ 
    res.render("landing");
});

// INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){ 
    Campground.find({}, function(err, camps){
        if (err) {
            console.log(err);
        } else {
            res.render("index", {campgrounds:camps});
        }
    });
});

// CREATE - add new campground to database
app.post("/campgrounds", function(req, res){
    var name    = req.body.name;
    var image   = req.body.image;
    var desc    = req.body.description;
    var newCamp = {name:name, image:image, description: desc};
    
    Campground.create(newCamp, function(err, camp){
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
    
});

//NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res) {
    res.render("new"); 
});

app.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id, function(err, found){
        if (err) {
            console.log(err);
        } else {
            res.render("show", {campground:found});
        }
    });
})

// ======================================================

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started!");
});