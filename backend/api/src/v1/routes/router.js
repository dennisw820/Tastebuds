// Resources
const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller.js');
const authController = require('../../../../middleware/authenticate.js');

// Landing Route
router.route('/')
    .get(authController.authenticate, controller.getHome)
    .post();

// Signin Route
router.route('/signin')
    .get(controller.getHome)
    .post(controller.handleLogIn);

// Home Route
router.route('/welcome')
    .get(function(req, res) {
        res.render('welcome.ejs');
    });

// Signup Route ***
router.route('/signup')
    .get((req,res) => {
        res.render('signup.ejs');
    })
    .post(controller.handleSignUp);

// Password Reset
router.route('/password-reset')
    .get(function(req,res){
        res.render('password-reset.ejs');
    })
    .post();

// Forgot Password
router.route('/forgot-password')
    .get(function(req,res){
        res.render('forgot-passwd.ejs');
    })
    .post();

// Profile
router.route('/profile')
    .get(function(req,res){
        res.render('profile.ejs');
    })
    .post();

// Food
router.route('/food-menu')
    .get(function(req,res){
        // food = JSON.parse(foodAPI);
        // dishes = food.map((el) => {
        //     return replaceTemplate(foodTemplate, el).join('');
        // });
        // console.log(dishes);
        var dishes = '';
        res.render('foodmenu.ejs', {dishes:dishes});
    })
    .post();

// Checkout ***
router.route('/checkout')
    .get(function(req,res){
        res.render('checkout.ejs');
    })
    // .post('/checkout', controller.processPayment);

// Cart 
router.route('/cart')
    .get(function(req,res){
        res.render('cart.ejs');
    })
    .post();

// Location
router.route('/location')
    .get((req, res) => {
        // var map = require('./private/Javascript/map.js');
        // var location = require('./private/Javascript/location.js')
        res.render('findLocation.ejs');
    })
    .post();

// Help
router.route('/help')
    .get((req, res) => {
        res.render('help.ejs');
    })
    .post();

// Reviews
router.route('/testimonials')
    .get((req, res) => {
        res.render('reviews.ejs');
    })
    .post();

// Add Review
router.route('/review')
    .get((req, res) => {
        res.render('addReview.ejs');
    })
    .post();

// About Page
router.route('/about')
    .get((req, res) => {
        res.render('about.ejs');
    });


// Contact
router.route('/contact')
    .get((req, res) => {
        res.render('contact.ejs');
    })
    .post(handleContactReq);

//  Export Router 
module.exports = router;
