$(function () {
    $('#search').click(function () {
        let name = $('#name').val();
        if(!name){
            layer.msg('请输入工号');
            return false;
        }

        layui.use('table', function(){
            var table = layui.table;

            //方法级渲染
            table.render({
                elem: '#view',
                url: '/manager/page/user/jsp/show.jsp?name='+name,
                cols: [[
                    {field:'uid', title: '工号',align:'center',width:100},
                    {field:'name', title: '姓名',align:'center',width:120},
                    {field:'sex', title: '性别',align:'center',width:100},
                    {field:'age', title: '年龄',align:'center',width:100},
                    {field:'tel', title: '电话号码',align:'center',width:180},
                    {field:'departname', title: '所属部门',align:'center',width:150},
                    {field:'addr', title: '家庭住址',align:'center',width:300},
                    {fixed: 'right', title:'操作',align:'center', toolbar: '#toolbar',width:150}
                ]],
                done: function(res){

                },
                page: true,
                height: 315,
                toolbar:true,
            });
        });
    });

    $('#add').click(function () {
        let $name = $('#name'),
            $uid = $('#uid'),
            $sex = $('#sex'),
            $age = $('#age'),
            $tel = $('#tel'),
            $department = $('#department'),
            $addr = $('#addr');

        // 登录校验
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
        if(!$age.val()){
            layer.msg('请输入年龄');
            return false;
        }
        if(!$tel.val()){
            layer.msg('请输入电话号码');
            return false;
        }
        if(!$department.val()){
            layer.msg('请输入部门');
            return false;
        }
        if(!$addr.val()){
            layer.msg('请输入住址');
            return false;
        }

        $.ajax({
            type:'post',
            url:'/manager/page/user/jsp/add.jsp',
            data:{
                name:$name.val(),
                uid:$uid.val(),
                sex:$sex.val(),
                age:$age.val(),
                tel:$tel.val(),
                department:$department.val(),
                addr:$addr.val()
            },
            success:function (res) {
                var resObj = $.parseJSON(res);
                layer.msg(resObj.msg);
            },
            error:function () {
                layer.msg('网络错误');
            },
        });
    });




    // layui.use('laydate', function() {
    //     var laydate = layui.laydate;
    //
    //     //常规用法
    //     laydate.render({
    //         elem: '#date'
    //     });
    // });
});