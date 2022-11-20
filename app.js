const express = require("express");

/*in order to read HTTP POST data , we have to use "body-parser"
node module. body-parser is a piece of express middleware that reads a
form's input and stores it as a javascript object accessible through req.body*/
const bodyParser = require("body-parser");


const app = express();
let items =[/*"Buy Food","Cook Food","Eat Food"*/];
let workItems = [];
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get("/",function(req,res)
{
  let today =new Date();
  //res.send(today);
  let options =
  {
    weekday: "long",
    day: "numeric",
    month: "long",
    year :"numeric"
  };
/* toLocaleDateString allows us to format date converts date to string*/
  let day = today.toLocaleDateString("hi-IN", options);
  res.render("list", {listTitle:day, newListItems: items});
});


app.post("/", function(req, res)
{
  let item = req.body.newItem;
  if(req.body.list === "work")
  {
    workItems.push(item);
    res.redirect("/work");
  }
  else
  {
    items.push(item);
    res.redirect("/");
  }

});

app.get("/work", function(req,res){
  res.render("list", {listTitle : "Work List", newListItems : workItems});
})

app.post("/work", function(req, res)
{
  let item = req.body.newItem;
  workItems.push(item);
  res.render("/work");
})

app.listen(5000,function(){
  console.log("running on port 3000");
});
