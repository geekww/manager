$(function () {
    $('#search').click(function () {
        let name = $('#name').val();

        layui.use('table', function(){
            var table = layui.table;

            //方法级渲染
            table.render({
                elem: '#view'
                ,url: '/manager/page/user/jsp/show.jsp?name='+name
                ,cols: [[
                    {field:'uid', title: '工号',align:'center'}
                    ,{field:'name', title: '姓名',align:'center'}
                    ,{field:'sex', title: '性别',align:'center'}
                    ,{field:'age', title: '年龄',align:'center'}
                    ,{field:'tel', title: '电话号码',align:'center'}
                    ,{field:'addr', title: '家庭住址',align:'center'}
                    ,{field:'department', title: '所属部门',align:'center'}
                ]]
                ,page: true
                ,height: 315
            });
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