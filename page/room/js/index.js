$(function () {
    $('#search').click(function () {
        layui.use('table', function() {
            var table = layui.table;

            table.render({
                elem: '#view',
                url: '',
                cols: [[
                    {field: 'room', title: '会议室编号', align: 'center'} ,
                    {field: 'time', title: '预定时间段', align: 'center'},
                    {field: 'department', title: '预定部门', align: 'center'},
                    {field: 'name', title: '预定人', align: 'center'}
                ]],
                page: true,
                height: 315
            });
        });
    });
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
    layui.use('form',function(){});
});