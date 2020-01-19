const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function(req, res, cb) {
    cb(null, "./uploads");
  },
  filename: function(req, file, cb) {
    let ext = path.extname(file.originalname);
    cb(null, "products" + Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    //accept
    cb(null, true);
  } else {
    //reject a file
    cb(new Error("File format not supported"), false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10 //10MB
  },
  fileFilter: fileFilter
});

const Product = require("../models/products");

//route for adding products
router.post("/", upload.single("product_image"), (req, res) => {
  const product = new Product({
    product_name: req.body.product_name,
    product_price: req.body.product_price,
    product_rating:req.body.product_rating,
    product_image: req.file.path
  });
  product
    .save()
    .then(result => {
      res.status(201).json({
        message: "Product Added Successfully"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: err
      });
    });
});

//route for getting all products
router.get("/", function(req, res) {
  Product.find()
    .exec()
    .then(function(product) {
      res.send(product);
    })
    .catch(function(e) {
      res.send(e);
    });
});

router.get("/:product_category", function(req, res) {
    Product.find({product_category:req.params.product_category})
      .exec()
      .then(function(product) {
        res.send(product);
      })
      .catch(function(e) {
        res.send(e);
      });
  });
  

//route for getting product by id
router.get("/:id", function(req, res) {
  Product.findById(req.params.id)
    .then(function(product) {
      res.send(product);
    })
    .catch(function(e) {
      res.send(e);
    });
});

module.exports = router;
