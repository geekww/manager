$(function () {
    // show
    layui.use('table', function(){
        var table = layui.table;

        table.render({
            elem: '#view'
            ,url: ''
            ,cols: [[
                {field:'departId', title: '部门编号',align:'center', width:150}
                ,{field:'departName', title: '部门名',align:'center', width:150}
                ,{field:'total', title: '总人数',align:'center', width:80}
                ,{field:'date', title: '成立日期',align:'center', width:150}
                ,{field:'dir', title: '备注',align:'center', width:350}
                ,{fixed: 'right', title:'操作',align:'center', toolbar: '#toolbar', width:150}
            ]]
            ,page: true
            ,height: 315
        });
    });
    $('#search').click(function () {
        layui.use('table', function(){
            var table = layui.table;

            table.render({
                elem: '#view'
                ,url: ''
                ,cols: [[
                    {field:'uid', title: '工号',align:'center', width:150}
                    ,{field:'name', title: '姓名',align:'center', width:150}
                    ,{field:'position', title: '岗位',align:'center', width:150}
                    ,{field:'date', title: '入职时间',align:'center', width:150}
                ]]
                ,page: true
                ,height: 315
            });
        });
    });


    // add
    layui.use('laydate', function() {
        var laydate = layui.laydate;

        //常规用法
        laydate.render({
            elem: '#date'
        });
    });
});