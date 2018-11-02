$(function () {
    // show
    layui.use('table', function(){
        var table = layui.table;

        table.render({
            elem: '#view',
            url: '/manager/page/department/jsp/departmentShow.jsp',
            cols: [[
                {field:'departid', title: '部门编号',align:'center', width:150}
                ,{field:'departname', title: '部门名',align:'center', width:150}
                ,{field:'total', title: '总人数',align:'center', width:80}
                ,{field:'date', title: '成立日期',align:'center', width:150}
                ,{field:'bz', title: '备注',align:'center', width:350}
                ,{fixed: 'right', title:'操作',align:'center', toolbar: '#toolbar', width:150}
            ]],
            done: function(res){

            },
            page: true,
            height: 315,
        });
    });
    $('#search').click(function () {
        let department = $('#department').val();
        if(!department){
            layer.msg('请输入部门编号');
            return false;
        }

        layui.use('table', function(){
            var table = layui.table;

            table.render({
                elem: '#view',
                url: '/manager/page/department/jsp/userShow.jsp?department='+department,
                cols: [[
                    {field:'uid', title: '工号',align:'center', width:150}
                    ,{field:'name', title: '姓名',align:'center', width:150}
                    ,{field:'position', title: '岗位',align:'center', width:150}
                    ,{field:'tel', title: '电话号码',align:'center', width:150}
                    ,{field:'rzdate', title: '入职时间',align:'center', width:150}
                ]],
                done: function(res){

                },
                page: true,
                height: 315
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