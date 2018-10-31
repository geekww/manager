$(function () {
    $('#login-btn').click(function () {
        // 登录校验
        var _validatePost = function(){
            var $userName = $('#username'),
                $password =  $('#password');

            if(!$userName.val()){
                layer.msg('请输入您的账号');
                return false;
            }
            if(!$password.val()){
                layer.msg('请输入您的密码');
                return false;
            }
            return true;
        };
        if(_validatePost()){
            $.ajax({
                type:'post',
                url:'/manager/jsp/login.jsp',
                data:{
                    username: $('#username').val(),
                    password: $('#password').val()
                },
                success:function (data) {
                    if(data.code === 1){
                        layer.msg(data.msg);
                        setTimeout(function () {
                            window.location.href = "page/main/index.html";
                        },2000);
                    }
                }
            });

        }
    });
});