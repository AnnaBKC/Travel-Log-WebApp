const express = require("express");
const app = express();
const multer = require('multer');
const fs = require('fs');
const mongoose = require("mongoose");
const UserModel = require("./models/Users");
const PostModel = require("./models/Post");

var todayDate = new Date().toISOString().slice(0, 19);

const cors = require("cors");
const { path } = require("express/lib/application");

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      let extArray = file.mimetype.split("/");
      let extension = extArray[extArray.length - 1];
      cb(null, Date.now() + '.' + extension)
    }
})

const upload = multer({ storage: storage })

app.use(express.json());
app.use(cors());

mongoose.connect(
    "<insert_mongodb_address"
);

app.get("/getUsers", (req, res) => {
    UserModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

app.patch("/updateUser", (req, res) => {
    let updateUser;
    if(req.body.first_name.length != 0 && req.body.last_name.length != 0 
        && req.body.email.length != 0){
        updateUser = {
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            email : req.body.email
        }
    }
    else if(req.body.first_name.length != 0 && req.body.last_name.length != 0){
        updateUser = {
            first_name : req.body.first_name,
            last_name : req.body.last_name
        }
    }
    else if(req.body.first_name.length != 0 && req.body.email.length != 0){
        updateUser = {
            first_name : req.body.first_name,
            email : req.body.email
        }
    }
    else if(req.body.email.length != 0 && req.body.last_name.length != 0){
        updateUser = {
            first_name : req.body.first_name,
            email : req.body.email
        }
    }
    else if(req.body.first_name.length != 0){
        updateUser = {
            first_name : req.body.first_name
        }
    }
    else if(req.body.last_name.length != 0){
        updateUser = {
            last_name : req.body.last_name
        }
    }
    else if(req.body.email.length != 0){
        updateUser = {
            email : req.body.email
        }
    }
    UserModel.findOneAndUpdate({_id: req.body.userId}, 
        updateUser, 
            {runValidators:true}, (err, result) => {
        if (err) {
            res.sendStatus(400);
        } else {
            res.sendStatus(200);
            console.log("Success updating!!!")
        }
    });
});

app.delete("/deleteUser", (req, res) => {
    UserModel.findByIdAndDelete({_id: req.query.id}, (err, result) => {
        if (err) {
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
            console.log("Success Deleting User!!!")
        }
    });
});

app.get("/Posts", (req, res) => {
    PostModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            {req.query.filter == "RecentPosts" ? 
            res.json(result.sort((a,b) => b.date - a.date)) :
            res.json(result.sort((a,b) => a.date - b.date)) } 
        }
    });
});

app.post("/createUser", async (req, res) => {
    const user = req.body;
    //user.username = user.username.tolower();
    const newUser = new UserModel(user);
    await newUser.save();
    res.json(user);
});

app.post("/loginAuth", async(req, res) => {
    const credentials = req.body;
    console.log(credentials);
    const attempt = await UserModel.findOne( {username: req.body.username} );
    console.log(attempt);
    try{
        if(attempt.password === credentials.password){
            res.sendStatus(200);
        }
        else{
            res.sendStatus(400)
        }
    }
    catch(err){
        res.sendStatus(400);
    }
})


app.post("/submitPost", upload.single('uploadFile'), async (req, res) => {
    const post = req.body;
    post["date"] = todayDate;
    post["userId"] = "1345"
    if(typeof req.file !== 'undefined' && req.file !== null){
        post['photo'] = fs.readFileSync('./uploads/' + req.file.filename);
        post['filetype'] = req.file.mimetype;
        fs.unlink('./uploads/' + req.file.filename, (err) => {
            if(err) throw err;
        });
    }
    if(post["recom"] === "True"){
        post["recom"] = true;
    }
    else{
        post["recom"] = false;
    }
    const newPost = new PostModel(post);
    await newPost.save(function (err) {
        if (err) 
            res.sendStatus(400);
        else
            res.sendStatus(200);

    });    
});

app.get("/getUser", async(req, res) => {
    let userInfo = await UserModel.findOne( {username: req.query.user} ).lean();
    try{
        if(userInfo){
            delete userInfo.password;
            res.json(userInfo);
        }
        else{
            res.sendStatus(400)
        }
    }
    catch(err){
        res.sendStatus(400);
    }
    console.log("called");
})

app.listen(process.env.PORT || 5000, () => {
    console.log("SERVER RUNNING");
});

