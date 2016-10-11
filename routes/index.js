const urls={
	home:'/'
}
module.exports=function(app){
	app.get(urls.home,function(req,res){
		res.render('index',{
			title:'谢小飞的财务管理系统'
		})
	})
}

