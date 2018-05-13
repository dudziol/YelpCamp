var express = require("express"),
    router = express.Router();
    Campground = require("../models/campground")

// INDEX ROUTE
router.get("/", function(req, res){
    // Get all CGs from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
             res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

// CREATE ROUTE
router.post("/", function(req, res){
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
router.get("/new", function(req, res){
    res.render("campgrounds/new");
});

// SHOW ROUTE
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

module.exports = router;