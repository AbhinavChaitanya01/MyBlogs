//jshint esversion:6
var _ = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { kebabCase } = require('lodash');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
app.set('view engine', 'ejs');
// posts array to store the posts that we compose
let posts=[];
app.use(bodyParser.urlencoded({extended: true}));
// made public so that we can use css on our pages in the public directory
app.use(express.static("public"));
// The home route using "/"
app.get("/",function(req,res){
  let hm= "Home";
  // js object sent to render when at home.ejs
  res.render('home',{
    // key: value pairs keyname has to be matching to the variable name in the ejs file
    homeText:hm,
    HomeStarting:homeStartingContent,
    // The array listitem on home.ejs gets the posts array.
    listItem:posts,
  })
})
// to render to our /about route page
app.get("/about",function(req,res){
  res.render('about',{
    aboutText: "About",
    aboutContent: aboutContent,
  })
})
// to render to our /content route page
app.get("/contact",function(req,res){
  res.render('contact',{
    contactText: "Contact US",
    contactContent: contactContent,
  })
})
app.get("/compose",function(req,res){
  res.render('compose',{

  });
});
// see express route parameters in documentation
app.get("/posts/:postName",function(req,res){
  for(var i=0;i<posts.length;i++){
    // using lodash to make the route name independent of lowercase/ kebabcase/ uppercase/ snakecase, etc; and thus ease of access
    const toMatchTitle=_.lowerCase(posts[i].title);
    const givenTitle=_.lowerCase(req.params.postName);
    if(toMatchTitle===givenTitle){
      res.render("post",{
        blogTitle: posts[i].title,
        blogContent: posts[i].content,
      })
    }
  }
})
app.post("/compose",function(req,res){
  const post={
    title: req.body.postTitle,
    content: req.body.postBody
  }
  posts.push(post);// pushes the composed item into our posts array to be published in the homepage
  res.redirect("/");
})
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
