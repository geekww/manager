$(function () {
    $('#login-btn').click(function () {
        // 登录校验
        var _validatePost = function(){
            var $uid = $('#uid'),
                $password =  $('#password');

            if(!$uid.val()){
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
                    uid: $('#uid').val(),
                    password: $('#password').val()
                },
                success:function (res) {
                    let resObj = $.parseJSON(res);
                    layer.msg(resObj.msg);
                    if(resObj.code === '1'){
                        setTimeout(function () {
                            window.location.href = "/manager/page/main/index.html";
                        },2000);
                    }
                }
            });
        }
    });
});