const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const User = require("../models/register");

//route for getting all register
router.post("/", function(req, res) {
    const email = req.body.register_email;
    const password = req.body.register_password;

    console.log(req.body);
    console.log(email);
    console.log(password);

  User.findOne({
    
    register_email:email,
    register_password:password
  })
    .exec()
    .then(function(result) {
        if(result == null){
            res.json({response:"Invalid credentials"})
        }else{
      res.json({response:"Success"});
        }
    })
    .catch(function(e) {
      res.send(e);
    });
});


module.exports = router;
