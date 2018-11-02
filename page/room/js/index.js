$(function () {
    $('#search').click(function () {
        let date = $('#date').val();
        if(!date){
            layer.msg('请选择日期');
            return false;
        }
        layui.use('table', function() {
            var table = layui.table;

            table.render({
                elem: '#view',
                url: '/manager/page/room/jsp/show.jsp?date='+date,
                cols: [[
                    {field: 'room', title: '会议室编号', align: 'center',width:150} ,
                    {field: 'time', title: '预定时间段', align: 'center',width:250},
                    {field: 'department', title: '预定部门', align: 'center',width:150},
                    {field: 'user', title: '预定人', align: 'center',width:150}
                ]],
                done: function(res){

                },
                page: true,
                height: 315
            });
        });
    });
    $('#order').click(function () {
        let $room = $('#room'),
            $department = $('#department'),
            $user = $('#user'),
            $date = $('#date'),
            $time = $('#time').find('input');

        if(!$room.val()){
            layer.msg('请输入会议室编号');
            return false;
        }
        if(!$department.val()){
            layer.msg('请输入预定部门');
            return false;
        }
        if(!$user.val()){
            layer.msg('请输入预定人姓名');
            return false;
        }
        if(!$date.val()){
            layer.msg('请选择日期');
            return false;
        }
        if(!$time.val()){
            layer.msg('请选择时间段');
            return false;
        }

        $.ajax({
            type: "post",
            url: '/manager/page/room/jsp/order.jsp',
            data: {
                room:$room.val(),
                department:$department.val(),
                user:$user.val(),
                date:$date.val(),
                time:$time.val(),
            },
            success: function (res) {
                var resObj = $.parseJSON(res);
                layer.msg(resObj.msg);
            },
            error:function () {
                layer.msg('网络错误');
            }
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