var express             = require("express");
var mongoose            = require("mongoose");
var bodyParser          = require("body-parser");
var methodOverride      = require("method-override");
var expressSanitizer    = require("express-sanitizer");

var app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());

/* =====================================================
                    DATABASE
======================================================== */
mongoose.connect("mongodb://localhost/restful_blog");

var blogSchema = new mongoose.Schema({
   body:    String,
   title:   String,
   image:   String,
   createdAt: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

/*Blog.create({
    title: "Test Blog",
    image: "data:image/jpeg;base64,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",
    body: "Hello this is my test blog!"
});*/

/* =====================================================
                     ROUTES
======================================================== */

app.get("/", function(req, res) {
    res.redirect("/blogs");
});

// INDEX ROUTE
app.get("/blogs", function(req, res){
    var blogs = Blog.find({}, function(err, blogs){
       if (err) {
           console.log(err);
       } else {
            res.render("index", {blogs: blogs});
       }
    });
});

// NEW ROUTE
app.get("/blogs/new", function(req, res) {
    res.render("new");
});

// CREATE ROUTE
app.post("/blogs", function(req, res){
   req.body.blog.body = req.sanitize(req.body.blog.body);
   Blog.create(req.body.blog, function(err, newBlog){
      if (err) {
         console.log(err);
      } else {
        res.redirect("/blogs"); 
      }
    });
});

// SHOW ROUTE
app.get("/blogs/:id", function(req, res) {
   Blog.findById(req.params.id, function(err, foundBlog){
        if (err) {
            console.log(err);
            res.redirect("/blogs");
        } else {
            res.render("show", {blog: foundBlog});
        }
   });
});

// EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog){
       if (err) {
           console.log(err);
       } else {
           res.render("edit", {blog: foundBlog});
       }
    });
});

// UPDATE ROUTE
app.put("/blogs/:id", function(req, res){
   req.body.blog.body = req.sanitize(req.body.blog.body);
   Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
      if (err) {
          res.redirect("/blogs");
      } else {
          res.redirect("/blogs/" + req.params.id);
      }
   });
});

// DELETE ROUTE
app.delete("/blogs/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err){
       if (err) {
           console.log(err);
       }
       res.redirect("/blogs");
    });
});


/* ===================================================== */

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is up!");
});