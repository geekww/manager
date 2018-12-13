$(function () {
    layui.use('laydate', function() {
        var laydate = layui.laydate;

        //常规用法
        laydate.render({
            elem: '#date'
        });
    });

    layui.use('table', function(){
        var table = layui.table;

        //方法级渲染
        table.render({
            elem: '#view'
            ,url: ''
            ,cols: [[
                {field:'departName', title: '部门名',align:'center', width:150}
                ,{field:'date', title: '成立日期',align:'center', width:150}
                ,{field:'total', title: '总人数',align:'center', width:80}
                ,{field:'person', title: '部门成员',align:'center', width:350}
                ,{field:'dir', title: '备注',align:'center'}
            ]]
            ,id: 'tableReload'
            ,page: true
            ,height: 315
        });

        var $ = layui.$, active = {
            reload: function(){
                var demoReload = $('#demoReload');

                //执行重载
                table.reload('tableReload', {
                    page: {
                        curr: 1
                    }
                    ,where: {
                        key: {
                            id: demoReload.val()
                        }
                    }
                });
            }
        };

        $('.departTable .layui-btn').on('click', function(){
            var type = $(this).data('type');
            active[type] ? active[type].call(this) : '';
        });
    });

    $.ajax({
        type: "post",
        url: '/manager/page/bi/jsp/show.jsp',
        success: function (res) {
            let resObj = $.parseJSON(res);
            $('#total').text(resObj.total);
            let finish = Math.round(parseInt(resObj.finish) / parseInt(resObj.total) *100) +'%';
            let delay = Math.round(parseInt(resObj.delay) / parseInt(resObj.finish) *100) +'%';
            $('#finish').attr('lay-percent',finish);
            $('#delay').attr('lay-percent',delay);
        },
        error:function () {
            layer.msg('网络错误');
        }
    });

    layui.use('element', function(){

    });
});