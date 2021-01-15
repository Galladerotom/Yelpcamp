const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Campground = require('./models/campgrounds');
const seedDB = require('./seeds');

seedDB();
mongoose
  .connect("mongodb://localhost:27017/yelp_camp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB!"))
  .catch((error) => console.log(error.message));



// Campground.create(
//   {
//     name: "Fisher's Creek",
//     image:
//       "https://api.creativecommons.engineering/v1/thumbs/f0870ca7-71d2-450f-a84e-33b945bc5735",
//     description: "This is where the local fisherman makes a living. No toilets. Beautiful sunsets!"
//   },
//   (err, campground) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("New campground created");
//       console.log(campground);
//     }
//   }
// );

// var campgrounds = [{
//   name: "Salmon Creek",
//   image: "https://api.creativecommons.engineering/v1/thumbs/621886da-57e1-4ec8-ba3e-ed84cdb97826"
// }, {
//   name: "Fisher's Creek",
//   image: "https://api.creativecommons.engineering/v1/thumbs/f0870ca7-71d2-450f-a84e-33b945bc5735"
// }, {
//   name: "Jesus Creek",
//   image: "https://s3-ca-central-1.amazonaws.com/trcaca/app/uploads/2015/12/17182259/ALBION_HILLS_CAMPGROUND_414x288.jpg"
// },{
//   name: "Salmon Creek",
//   image: "https://api.creativecommons.engineering/v1/thumbs/621886da-57e1-4ec8-ba3e-ed84cdb97826"
// }, {
//   name: "Fisher's Creek",
//   image: "https://api.creativecommons.engineering/v1/thumbs/f0870ca7-71d2-450f-a84e-33b945bc5735"
// }, {
//   name: "Jesus Creek",
//   image: "https://s3-ca-central-1.amazonaws.com/trcaca/app/uploads/2015/12/17182259/ALBION_HILLS_CAMPGROUND_414x288.jpg"
// },{
//   name: "Salmon Creek",
//   image: "https://api.creativecommons.engineering/v1/thumbs/621886da-57e1-4ec8-ba3e-ed84cdb97826"
// }, {
//   name: "Fisher's Creek",
//   image: "https://api.creativecommons.engineering/v1/thumbs/f0870ca7-71d2-450f-a84e-33b945bc5735"
// }, {
//   name: "Jesus Creek",
//   image: "https://s3-ca-central-1.amazonaws.com/trcaca/app/uploads/2015/12/17182259/ALBION_HILLS_CAMPGROUND_414x288.jpg"
// }]

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get('/', (req, res) => {
  res.render('landing');
});

//INDEX - show all campgrounds
app.get('/campgrounds', (req, res) => {
  
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { campgrounds: allCampgrounds });
    }
  })
});

//create - add new campground
app.post("/campgrounds", (req, res) => {
  //get data from from
  //redirect back to /campgrounds
  const name = req.body.name;
  const image = req.body.image;
  const description = req.body.description;
  const newCampgrounds = {
    name: name,
    image: image,
    description: description
  }
  Campground.create(newCampgrounds, (err, newlyCreated) => {
    if (err) {
      console.log(err);
    } else {
       res.redirect("/campgrounds");
    }
  });
});

//NEW -- Display form to make campground
app.get("/campgrounds/new", (req, res) => {
  res.render("new");
  
});
//VIEW --view specific campground
app.get("/campgrounds/:id", (req, res) => {
  //find the campground with provided id
  Campground.findById(req.params.id, (err, foundCampground) => {
   if (err) {
     console.log(err);
   } else {
     res.render("show", {campground: foundCampground});
   } 
  });
 
  //display the information
  
});

app.listen(3000, () => {
  console.log("YelpCamp Server has started");
})