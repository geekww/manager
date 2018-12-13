$(function () {
    $('#submit').click(function () {
        let $name = $('#name'),
            $uid = $('#uid'),
            $sex = $('#sex'),
            $tel = $('#tel'),
            $position = $('#position'),
            isPhone = /^1[3456789]\d{9}$/;

        if(!$name.val()){
            layer.msg('请输入姓名');
            return false;
        }
        if(!$uid.val()){
            layer.msg('请输入工号');
            return false;
        }
        if(!$sex.val()){
            layer.msg('请输入性别');
            return false;
        }
        if(!isPhone.test($tel.val())){
            layer.msg('请输入有效电话号码');
            return false;
        }
        if(!$position.val()){
            layer.msg('请输入职位');
            return false;
        }

        $.ajax({
            type: "post",
            url: '/manager/page/dev/jsp/add.jsp',
            data: {
                name:$name.val(),
                uid:$uid.val(),
                sex:$sex.val(),
                tel:$tel.val(),
                position:$position.val(),
            },
            success: function (res) {
                let resObj = $.parseJSON(res);
                layer.msg(resObj.msg);
            },
            error:function () {
                layer.msg('网络错误');
            }
        });


    });
    layui.use(['laydate','table','form'], function() {
        let laydate = layui.laydate,
            table = layui.table;

            table.render({
                elem: '#view',
                url: '/manager/page/dev/jsp/show.jsp',
                cols: [[
                    {field: 'uid', title: '工号', align: 'center',width:150} ,
                    {field: 'name', title: '姓名', align: 'center',width:250},
                    {field: 'sex', title: '性别', align: 'center',width:150},
                    {field: 'tel', title: '电话号码', align: 'center',width:150},
                    {field: 'position', title: '职位', align: 'center',width:150}
                ]],
                done: function(res){

                },
                page: true,
                height: 315
            });

        laydate.render({
            elem: '#date'
        });
        laydate.render({
            elem: '#start'
            ,type: 'time'
            ,format: 'H点m分'
        });
        laydate.render({
            elem: '#end'
            ,type: 'time'
            ,format: 'H点m分'
        });
    });
});