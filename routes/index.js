var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/info', function(req, res, next) {
  res.send('Hello from send...');
});
router.get('/mydata', function(req, res, next) {
  res.send('My name : Mamdouh Abbas Salama Farh.');
});
router.get('/mydata/:id', function(req, res, next) {
	var name=['ممدوح','سهير','زهراء','محمد',"أحمد","عمر"]
	var age=[44,40,15,12,10,7]
	var x=req.params.id;
	var y=name[x]
	var z=age[x]
  res.send("اسمي: "+y+" و عمري :"+z);
});
router.get('/info/:id', function(req, res, next) {
	var name=['ممدوح','سهير','زهراء','محمد',"أحمد","عمر"]
	var age=[44,40,15,12,10,7]
	var x=req.params.id;
	var y=name[x]
	var z=age[x]
	var m="Hello Mamdouh ...."
  res.render('info',{name:y,age:z});
});

module.exports = router;
