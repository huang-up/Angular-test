var crypto = require('crypto');
var express = require('express');
var router = express.Router();

/* GET home page. */
module.exports =function(app){
	var users = require('./users.js');
	// app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.static('public'));
	app.get('/', function(req, res) {
  		if(req.session.user){
  			res.render('index', {username: req.session.username,
  								           msg: req.session.msg});
  		}else{
  			req.session.msg = 'Access denied!';
  			res.redirect('/login');
  		}
	});
	app.get('/user', function(req, res) {
  		if(req.session.user){
  			res.render('user', {msg: req.session.msg});
  		}else{
  			req.session.msg = 'Access denied!';
  			res.redirect('/login');
  		}
	}); 
	app.get('/signup', function(req, res) {
  		if(req.session.user){
  			res.redirect('/');
  		}
  		res.render('signup', {msg: req.session.msg});
	}); 
	app.get('/login', function(req, res) {
  		if(req.session.user){
  			res.redirect('/');
  		}
  		res.render('login', {msg: req.session.msg});
	});
	app.get('/logout', function(req, res) {
  		req.session.destroy(function(){  //这里function不能带参数
  			res.redirect('/login');
  		});
	}); 
	app.post('/signup', users.signup);
	app.post('/user/update', users.updateUser);
	app.post('/user/delete', users.deleteUser);
	app.post('/login', users.login);
	app.get('/user/profile', users.getUserProfile);

}

