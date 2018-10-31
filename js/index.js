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
            window.location.href = "page/main/index.html";
        }
    });
});