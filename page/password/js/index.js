$(function () {
    $('#submit').click(function () {
        var isKey = /^\d{3,16}$/;//验证3-16位数字
        var $oldKey = $('#oldKey'),
            $newKey = $('#newKey'),
            $repKey = $('#repKey');

        if(!isKey.test($oldKey.val()) && !isKey.test($newKey.val()) && !isKey.test($repKey.val())){
            layer.msg('请输入有效3-16位密码');
            return false;
        }
        if($oldKey.val() === $newKey.val()){
            layer.msg('新密码与旧密码重复');
            return false;
        }
        if($newKey.val() !== $repKey.val()){
            layer.msg('新密码两次输入不一致');
            return false;
        }

        $.ajax({
            type: "post",
            url: '',
            data: {
                oldKey:$oldKey.val(),
                newKey:$newKey.val(),
                repKey:$repKey.val()
            },
            success: function (data) {
                layer.msg('修改成功');
            },
            error:function () {
                layer.msg('网络错误');
            }
        });
    });
});