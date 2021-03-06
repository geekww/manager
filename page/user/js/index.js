$(function () {
    $('#submit').click(function () {
        let isKey = /^\d{3,16}$/;//验证3-16位数字
        let $uid = $('#uid'),
            $oldKey = $('#oldKey'),
            $newKey = $('#newKey'),
            $repKey = $('#repKey');

        if(!$uid.val()){
            layer.msg('请输入工号');
            return false;
        }
        if(!isKey.test($oldKey.val())){
            layer.msg('请输入原密码（3-16位英文数字）');
            return false;
        }
        if(!isKey.test($newKey.val())){
            layer.msg('请输入新密码（3-16位英文数字）');
            return false;
        }
        if(!isKey.test($repKey.val())){
            layer.msg('确认密码（3-16位英文数字）');
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
            url: '/manager/page/user/jsp/pwd.jsp',
            data: {
                uid:$uid.val(),
                oldKey:$oldKey.val(),
                newKey:$newKey.val(),
                repKey:$repKey.val()
            },
            success: function (res) {
                var resObj = $.parseJSON(res);
                layer.msg(resObj.msg);
            },
            error:function () {
                layer.msg('网络错误');
            }
        });
    });

    layui.use(['form', 'table'], function() {
        let table = layui.table;
        let uid = getCookie('uid');

        //表格渲染
        table.render({
            elem: '#view',
            url: '/manager/page/user/jsp/show.jsp?uid='+uid,
            cols: [[
                {field:'name', title: '我的姓名',align:'center', width:200},
                {field:'sex', title: '性别',align:'center', width:200},
                {field:'tel', title: '电话号码',align:'center', width:150},
                {field:'position', title: '职责',align:'center', width:150},
            ]],
            done: function(res){

            },
            page: true,
            height: 315,
        });
    });
    function getCookie(name) {
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }
});
