var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { 
  	title: 'this is in router file',
  	nowTime:new Date(),
  	testData:{
  		data1:'test'
  	}
  	});
});

// 新增一个路由
router.get('/other', function(req, res, next) {
	res.render('other',{
		text:'hello world',
		text2:'this is text 2',
		supplies: ['mop', 'broom', 'duster']
	})

  // res.send('hello,world!');
  
});

module.exports = router;

