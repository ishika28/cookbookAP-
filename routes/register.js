const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");



const Register = require("../models/register");

//route for adding register
router.post("/", (req, res) => {
  const register = new Register({
    register_fullname: req.body.register_fullname,
    register_email:req.body.register_email,
    register_password:req.body.register_password
   
  });
  register
    .save()
    .then(result => {
      res.status(201).json({
        response: "Registered Successfully"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        response: err
      });
    });
});

//route for getting all register
router.get("/", function(req, res) {
  register.find()
    .exec()
    .then(function(register) {
      res.send(register);
    })
    .catch(function(e) {
      res.send(e);
    });
});


module.exports = router;
