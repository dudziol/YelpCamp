var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
	{
		name: "Under The Stars",
		image: "https://pixabay.com/get/ec31b90f2af61c22d2524518b7444795ea76e5d004b0144393f0c778a1ebbd_340.jpg",
		description: "blah blah blah"
	},
	{
		name: "Skyview",
		image: "https://pixabay.com/get/ea36b7062bf6093ed1584d05fb1d4e97e07ee3d21cac104497f6c17fa6ebb3b0_340.jpg",
		description: "blah blah blah"
	},
	{
		name: "Misty Forest",
		image: "https://farm2.staticflickr.com/1255/767161131_39e0688cd2.jpg",
		description: "blah blah blah"
	},
];


function seedDB(){
	// Remove all campgrounds
	Campground.remove({}, function(err){
		if(err){
			console.log(err);
		}
		console.log("removed campgrounds")
		// add a few campgrounds
		data.forEach(function(seed){
			Campground.create(seed, function(err, campground){
				if(err){
					console.log(err);
				}else{
					console.log("added a CG");
					// create a comment
					Comment.create(
						{
						text: "This place is sooo great, but I wish...",
						author: "Homer"
						}, function(err, comment){
							if(err){
								console.log(err)
							} else{
								campground.comments.push(comment);
								campground.save();
								console.log("Created new comment");
							}	
						}
					)
				}
			});
		});
	});
}

module.exports = seedDB;