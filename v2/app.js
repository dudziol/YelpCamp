var app = require("express")();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

 var campgrounds = [
        {name: "Salmon Creek", image: "https://pixabay.com/get/eb35b70b2df6033ed1584d05fb1d4e97e07ee3d21cac104497f2c77ea3eab1b0_340.jpg"},
        {name: "Kamil Dudek", image: "https://pixabay.com/get/ec31b90f2af61c22d2524518b7444795ea76e5d004b0144397f6c67da0e9bd_340.jpg"},
        {name: "Ziomeczek Ziomalski", image: "https://pixabay.com/get/ea36b70928f21c22d2524518b7444795ea76e5d004b0144397f6c67da0e9bd_340.jpg"},
        ];


app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds: campgrounds});
})

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
})

app.get("/campgrounds/new", function(req, res){
    res.render("new");
})

app.listen(3000, function(){
	console.log("The server is running!");
});