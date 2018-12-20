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
                    {field: 'uid', title: '工号', align: 'center',width:120} ,
                    {field: 'name', title: '姓名', align: 'center',width:100},
                    {field: 'sex', title: '性别', align: 'center',width:80},
                    {field: 'position', title: '职位', align: 'center',width:200},
                    {field: 'tel', title: '电话号码', align: 'center',width:200},
                    {fixed: 'right', title:'操作', toolbar: '#toolbar',align:'center', width:150}
                ]],
                done: function(res){

                },
                page: true,
                height: 315
            });
        //更新删除
        table.on('tool(view)', function(obj){
            var data = obj.data;
            if(obj.event === 'del'){
                layer.confirm('确定删除当前用户？', function(index){
                    let $uid = data.uid;
                    // 删除数据
                    $.ajax({
                        type:'post',
                        url:'/manager/page/dev/jsp/delDev.jsp',
                        data:{
                            uid: $uid,
                        },
                        success: function (res) {
                            let resObj = $.parseJSON(res);
                            layer.msg(resObj.msg);
                            setTimeout(function () {
                                window.location.reload()
                            },2000);
                        },
                        error:function () {
                            layer.msg('网络错误');
                        }
                    });
                });
            } else if(obj.event === 'edit'){
                layer.open({
                    title: '修改用户信息',
                    content: '<form>' +
                        '<label style="width: 70px;display: inline-block;">职位：</label>' +
                        // '<input type="text" id="position" autocomplete="off" style="padding: 4px;font-size: 14px;margin-bottom: 10px;width: 160px;"><br>' +
                        '<select id="position" style="padding: 4px;font-size: 14px;margin-bottom: 10px;width: 160px;">' +
                        '<option value="项目经理">项目经理</option>'+
                        '<option value="前端开发工程师">前端开发工程师</option>'+
                        '<option value="后端开发工程师">后端开发工程师</option>'+
                        '<option value="测试工程师">测试工程师</option>'+
                        '</select><br>'+
                        '<label style="width: 70px;display: inline-block;">电话号码：</label>' +
                        '<input type="text" id="tel" autocomplete="off" style="padding: 4px;font-size: 14px;margin-bottom: 10px;width: 160px;"><br>' +
                        '</form>',
                    success:function () {
                        $('#position').val(data.position);
                        $('#tel').val(data.tel);

                        $('.layui-layer-btn0').click(function () {
                            let $uid = data.uid,
                                $position = $('#position').val(),
                                $tel = $('#tel').val(),
                                isPhone = /^1[3456789]\d{9}$/;

                            if(!$position){
                                layer.msg('请输入岗位');
                                return false;
                            }
                            if(!isPhone.test($tel)){
                                layer.msg('请输入有效电话号码');
                                return false;
                            }

                            $.ajax({
                                type:'post',
                                url:'/manager/page/dev/jsp/updateDev.jsp',
                                data:{
                                    uid: $uid,
                                    position: $position,
                                    tel: $tel,
                                },
                                success: function (res) {
                                    let resObj = $.parseJSON(res);
                                    layer.msg(resObj.msg);
                                    setTimeout(function () {
                                        window.location.reload()
                                    },2000);
                                },
                                error:function () {
                                    layer.msg('网络错误');
                                }
                            });
                        });
                    }
                });
            }
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