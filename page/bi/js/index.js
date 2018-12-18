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

    let uid = getCookie('uid');
    $.ajax({
        type: "post",
        url: '/manager/page/bi/jsp/show.jsp?uid='+uid,
        success: function (res) {
            // 报表渲染
            let resObj = $.parseJSON(res);
            $('#total').text(resObj.total);
            let finish = Math.round(parseInt(resObj.finish) / parseInt(resObj.total) *100) +'%';
            let delay = Math.round(parseInt(resObj.delay) / parseInt(resObj.total) *100) +'%';
            $('#finish').attr('lay-percent',finish);
            $('#delay').attr('lay-percent',delay);

            // 任务渲染
            var taskStr = "";
            for(let i=0;i<resObj.task.length;i++){
                if (i===0){
                    taskStr +='<li class="layui-timeline-item">' +
                        '<i class="layui-icon layui-timeline-axis"></i>' +
                        '<div class="layui-timeline-content layui-text">' +
                        '    <div class="layui-timeline-title">' +
                        resObj.task[i].task+
                        '        <p>状态：'+resObj.task[i].state+'</p>' +
                        '        <p>计划完成：'+resObj.task[i].planefinish+'</p>' +
                        '    </div>' +
                        '</div>' +
                        '</li>';
                }else {
                    taskStr +='<li class="layui-timeline-item">' +
                        '    <i class="layui-icon layui-timeline-axis"></i>' +
                        '    <div class="layui-timeline-content layui-text">' +
                        '    <div class="layui-timeline-title">' +
                        resObj.task[i].task+
                        '        <p>状态：'+resObj.task[i].state+'</p>' +
                        '        <p>计划完成：'+resObj.task[i].planefinish+'</p>' +
                        '    </div>' +
                        '    </div>' +
                        '</li>'
                }
            }
            $('#taskRender').append(taskStr);
        },
        error:function () {
            layer.msg('网络错误');
        }
    });

    function getCookie(name) {
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }
});
