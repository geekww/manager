$(function () {
    layui.use('laydate', function() {
        var laydate = layui.laydate;

        //常规用法
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

    layui.use('table', function() {
        var table = layui.table;

        //方法级渲染
        table.render({
            elem: '#view',
            url: '',
            cols: [[
                {field: 'room', title: '会议室', align: 'center'} ,
                {field: 'department', title: '预定部门', align: 'center'},
                {field: 'time', title: '预定时间', align: 'center'}
            ]],
            id: 'tableReload',
            page: true,
            height: 315
        });
    });
});