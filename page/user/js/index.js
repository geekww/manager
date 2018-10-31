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
                {field:'id', title: '工号',align:'center'}
                ,{field:'name', title: '姓名',align:'center'}
                ,{field:'age', title: '年龄',align:'center'}
                ,{field:'addr', title: '家庭住址',align:'center'}
                ,{field:'department', title: '所属部门',align:'center'}
                ,{field:'date', title: '入职时间',align:'center'}
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
});