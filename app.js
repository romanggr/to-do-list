const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");

let items = ["buy", "cook", "eat"];
let workItems = [];


const app = express();
app.set('view engine', 'ejs')
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"))


app.get("/", function (req, res) {
    let today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long",
    }
    let day = today.toLocaleDateString("en-US", options)
    res.render("list", {
        listTitle: day,
        newListItems: items,
    })
})

app.post("/", function (req, res) {
    let item = req.body.newItem;
    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work")
    }
    else {
        items.push(item);
        res.redirect("/")
    }
})

//----------------------------------------------------------

app.get("/work", function (req, res) {
    res.render("list", {
        listTitle: "Work List",
        newListItems: workItems,

    })
})


app.listen(3000, function () {
    console.log("server start on port 3000");
})