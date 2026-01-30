const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register
router.post("/register", async (req,res) => {
  try{

    const {name,email,password} = req.body;

    if(!name || !email || !password){
      return res.status(400).json("All fields required");
    }

    let user = await User.findOne({email});
    if(user) return res.status(400).json("User exists");

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);

    user = new User({name,email,password:hash});
    await user.save();

    res.json("Registered Successfully");

  }catch(err){
    console.error(err);
    res.status(500).json("Server Error");
  }
});

// Login
router.post("/login", async (req,res)=>{
  try{

    const {email,password} = req.body;

    if(!email || !password){
      return res.status(400).json("All fields required");
    }

    const user = await User.findOne({email});
    if(!user) return res.status(400).json("Invalid Credentials");

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch) return res.status(400).json("Invalid Credentials");

    const token = jwt.sign(
      {user:{id:user.id}},
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({token});

  }catch(err){
    console.error(err);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
