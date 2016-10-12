const urls = {
    index: '/',
    home: '/home'
}
import person from '../password.js';

module.exports = function(app) {
    app.get(urls.index, function(req, res) {
        res.render('index', {
            title: '登陆'
        })
    });
    app.post(urls.index, function(req, res) {
        var username = req.param('username'),
            pwd = req.param('password');
        if(!username&&!pwd){
        	res.json({"status":false,"flag":0})
        }
        else{
        	if(username!=person.username){
        		res.json({"status":false,"flag":2})
        	}
        	else{
        		if(pwd!=person.password){
        			res.json({"status":false,"flag":3})
        		}
        		else{
        			res.json({"status":true,"flag":1})
        		}
        	}
        }
    });
    app.get(urls.home, function(req, res) {
        res.render('home', {
            title: '谢小飞的财务管理系统'
        })
    });
}
