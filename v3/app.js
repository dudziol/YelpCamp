var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});
var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "Blueberries!",
//         image: "https://cdn.pixabay.com/photo/2018/04/28/16/12/blueberry-3357568_960_720.jpg",
//         description: "Yummys Berries!"

//     },function(err, campground){
//         if(err){
//             console.log(err);
//         } else{
//             console.log(campground);
//         }
//     });

app.get("/", function(req, res){
    res.render("landing");
});

// INDEX ROUTE
app.get("/campgrounds", function(req, res){
    // Get all CGs from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
             res.render("index", {campgrounds: allCampgrounds});
        }
    });
});

// CREATE ROUTE
app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    // Create new CG and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err)
        }else{
            res.redirect("/campgrounds");
        }
    });
});

// NEW ROUTE
app.get("/campgrounds/new", function(req, res){
    res.render("new");
});

// SHOW ROUTE
app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            res.render("show", {campground: foundCampground});
        }
    });
});

app.listen(3000, function(){
	console.log("The server is running!");
});