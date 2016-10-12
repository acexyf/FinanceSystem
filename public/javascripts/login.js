$(function(){
	var version=10,
		flags=false;
	$('#submitBtn').on('click',function(e){
		e.preventDefault();
		if(flags)
			return;
		var username=$('#username').val();
		if(!username){
			shake($('.name-box'));
			return;
		}
		var password=$('#password').val();
		if(!password){
			shake($('.pwd-box'));
			return;
		}
		$.ajax({
			url:'/',
			dataType:'json',
			type:'post',
			data:{
				username:username,
				password:password
			},
			success:function(data){
				if(data){
					if(data.status){
						//登录成功
						console.log('登录成功');
						window.location.href='/home';
					}
					else{
						if(data.flag==0){	
							//数据不完整
						}
						else if(data.flag==1){
							//验证码不对
							shake($('.code-wrapper'));
						}
						else if(data.flag==2){
							//该用户不存在
							shake($('.name-box'));
						}
						else if(data.flag==3){
							//密码不对
							shake($('.pwd-box'));
						}
					}
				}
			}
		});
	});

	function shake(item){
		flags=true;
		$(item).addClass('shake animated');
		setTimeout(function(){
			flags=false;
			$(item).removeClass('shake animated');
		},1000);
	}
})