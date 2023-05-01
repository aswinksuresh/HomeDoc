const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const port = process.env.PORT || 3000;
const Register = require("./models/registers");
const Auths = require("./models/auth");
const bcrypt = require('bcrypt');//new code
const static_path = path.join(__dirname, "../public");
const templates_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",templates_path);
hbs.registerPartials(partials_path);



app.get("/",(req, res) => {
    res.render("index")
});

app.get("/register", (req, res)=>{
    res.render("register");
})
app.post("/register", async(req, res)=>{
    
    try {
        const registerUser = new Register({
            
             name:req.body.name,
             email:req.body.email,
             password:req.body.password

        })
       const registered= await registerUser.save();
       res.status(201).render("login");
        //const password = req.body.password;
        
        
    } catch (error) {
        res.status(400).send(error)
        console.log(error);
    }
})
app.get("/login", (req, res)=>{
    res.render("login");
})
app.get("/index", (req, res)=>{
    res.render("index");
})
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await Auths.findOne({ email });
      console.log(user);
      if (!user) {
        return res.status(401).send('Invalid email or password');
      }
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).send('Invalid email or password');
      }
      res.send('Login successful');
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });


    

app.listen(port, () => {
    console.log("Server is running at port no ${port}");
})
const mongoose = require('mongoose');
const dbUrl ="mongodb+srv://aswin:aswin2002@cluster0.nvwem9d.mongodb.net/?retryWrites=true&w=majority"

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
   .connect(dbUrl, connectionParams)
   .then(() => {
    console.log('MongoDB Atlas connected');
  })
  .catch((err) => {
    console.error(err);
  });