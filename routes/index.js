var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

//Any requests to this controller must pass through this 'use' function
//Copy and pasted from method-override
router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
      }
}))

//mongoose ....>
var mongoose=require('mongoose');
var Schema = mongoose.Schema;
var postsSchema = new Schema({
	name:String,
	email:String
});
var User=mongoose.model('users',postsSchema);
mongoose.connect('mongodb://localhost/mongo');
//------------>end of mongoose

router.get('/', function(req, res) {
	User.find(function(err,docs){
		res.render('index',{ title: 'List data',
  						users: docs });
  						 });
	});

router.get('/new', function(req, res) {
		res.render('new',{ title: 'List data'});
	});

router.post('/create', function(req, res) {
var name=req.body.name;
var email=req.body.email;

var user = new User({
  name: name,
  email: email 
				}).save(function(err,saveduser) {
				  if (err) throw err;
				  else {
				  	res.redirect('/'+ saveduser.id);
				  	console.log('User saved successfully!');
				  			}
				});
});

router.get('/:id/edit', function(req, res) {
	User.findById(req.params.id,function(err,user){
		res.render('edit',{title:'Edit PAGe',user:user});
	});
});

router.put('/update/:id', function(req, res) {
	User.findById(req.params.id,function(err,user){
	user.name=req.body.name;
	user.email=req.body.email;
	user.save(function(err) {
	  if (err) throw err;
	  console.log('User updated successfully!');
	});
	res.redirect('/'+user.id);
});
});
router.get('/del/:id', function(req, res) {
	User.findById(req.params.id,function(err,user){
	res.render('delete',{title:'deleting one', user:user})  						 });
	});

router.delete('/:id/delete', function(req, res) {
	 User.remove({_id: req.params.id},function(err){
			if(err){ throw err;}
			else {res.redirect('/')}
		// res.send('The user deleted successfully..')
   						 });
	});
router.get('/:id', function(req, res) {
	User.findById(req.params.id,function(err,user){
		res.render('show',{ title: 'Show Item',
  						user: user });
  						 });
	});
module.exports = router;

