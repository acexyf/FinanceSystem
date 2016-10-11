const urls={
	index:'/',
	home:'/home'
}
module.exports=function(app){
	app.get(urls.index,function(req,res){
		res.render('index',{
			title:'登陆'
		})
	});
	app.get(urls.index,function(req,res){
		
	});
	app.get(urls.home,function(req,res){
		res.render('home',{
			title:'谢小飞的财务管理系统'
		})
	});
}

