$(function () {
    $('#search').click(function () {
        let task = $('#task').val();
        if(!task){
            layer.msg('请输入任务名');
            return false;
        }

        layui.use('table', function(){
            var table = layui.table;

            table.render({
                elem: '#view',
                url: '/manager/page/task/jsp/show.jsp?task='+task,
                cols: [[
                    {field:'id', title: 'id',align:'center',width:100},
                    {field:'belong', title: '项目',align:'center',width:180},
                    {field:'task', title: '任务名',align:'center',width:200},
                    {field:'createtime', title: '创建时间',align:'center',width:110},
                    {field:'planefinish', title: '计划完成时间',align:'center',width:120},
                    {field:'fzr', title: '负责人',align:'center',width:80},
                    {field:'cjz', title: '创建者',align:'center',width:80},
                    {field:'state', title: '任务状态',align:'center',width:90},
                    {field:'dsc', title: '任务描述',align:'center',width:200},
                    {fixed: 'right', title:'操作', toolbar: '#toolbar', align:'center',width:150}
                ]],
                done: function(res){

                },
                page: true,
                height: 315,
                // toolbar:true,
            });
        });
    });

    $('#add').click(function () {
        let $task = $('#task'),
            $belong = $('#belong'),
            $create = $('#create'),
            $planeFinish = $('#planeFinish'),
            $fzr = $('#fzr'),
            $dsc= $('#dsc');

        if(!$task.val()){
            layer.msg('请填写任务名');
            return false;
        }
        if(!$belong.val()){
            layer.msg('请选择任务所属项目');
            return false;
        }
        if(!$create.val()){
            layer.msg('请填写创建时间');
            return false;
        }
        if(!$planeFinish.val()){
            layer.msg('请填写计划完成时间');
            return false;
        }
        if(!$fzr.val()){
            layer.msg('请填写负责人');
            return false;
        }
        if(!$dsc.val()){
            layer.msg('请填写任务详情');
            return false;
        }

        $.ajax({
            type:'post',
            url:'/manager/page/task/jsp/add.jsp',
            data:{
                task:$task.val(),
                belong:$belong.val(),
                create:$create.val(),
                planeFinish:$planeFinish.val(),
                fzr:$fzr.val(),
                dsc:$dsc.val()
            },
            success:function (res) {
                var resObj = $.parseJSON(res);
                layer.msg(resObj.msg);
                setTimeout(function () {
                    window.location.reload()
                },2000);
            },
            error:function () {
                layer.msg('网络错误');
            },
        });
    });

    layui.use(['form', 'laydate', 'table'], function() {
        let laydate = layui.laydate,
            form = layui.form,
            table = layui.table;

        //日期渲染
        laydate.render({
            elem: '#create'
        });
        laydate.render({
            elem: '#planeFinish'
        });

        //渲染表格
        table.render({
            elem: '#view',
            url: '/manager/page/task/jsp/show.jsp',
            cols: [[
                {field:'id', title: 'id',align:'center',width:100},
                {field:'belong', title: '项目',align:'center',width:180},
                {field:'task', title: '任务名',align:'center',width:200},
                {field:'createtime', title: '创建时间',align:'center',width:110},
                {field:'planefinish', title: '计划完成时间',align:'center',width:120},
                {field:'fzr', title: '负责人',align:'center',width:80},
                {field:'state', title: '任务状态',align:'center',width:90},
                {field:'dsc', title: '任务描述',align:'center',width:200},
                {fixed: 'right', title:'操作', toolbar: '#toolbar',align:'center', width:150},
                {field:'uid', title: '负责人工号',align:'center',width:200},
            ]],
            done: function(res){

            },
            page: true,
            height: 315,
            // toolbar:true,
        });

        //更新删除
        table.on('tool(view)', function(obj){
            let data = obj.data;
            if(obj.event === 'del'){
                layer.confirm('确定删除当前任务？', function(index){
                    let $id = data.id;
                    // 删除数据
                    $.ajax({
                        type:'post',
                        url:'/manager/page/task/jsp/delTask.jsp',
                        data:{
                            id: $id,
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
                let str = '';

                $.ajax({
                    type:'post',
                    url:'/manager/page/task/jsp/getProject.jsp',
                    success: function (res) {
                        let resObj = $.parseJSON(res);
                        for(let i=0; i<resObj.datahr.length;i++){
                            str +='<option value="'+resObj.datahr[i].uid+'">'+resObj.datahr[i].name+'</option>'
                        }

                        layer.open({
                            title: '更新任务进度',
                            content: '<form>' +
                                '<label style="width: 70px;display: inline-block;">任务状态：</label>' +
                                '<select id="di-state" style="padding: 4px;font-size: 14px;margin-bottom: 10px;width: 75px;">' +
                                '<option>进行中</option><option>测试</option><option>完成</option><option>关闭</option><option>重启</option>' +
                                '</select><span class="record-btn">维护记录</span><br>' +
                                '<label style="width: 70px;display: inline-block;margin-bottom: 10px;">指派给：</label>' +
                                '<select id="di-fzr" style="padding: 4px;font-size: 14px;width: 75px;">' +
                                str+
                                '</select><br>' +
                                '<label style="width: 70px;display: inline-block;">操作日期：</label>' +
                                '<input type="text" id="di-date" autocomplete="off" style="padding: 4px;font-size: 14px;margin-bottom: 10px;width: 100px;"><br>' +
                                '<label style="width: 70px;display: inline-block;vertical-align: top;">任务描述：</label>' +
                                '<textarea id="dsc" style="width: 150px;height: 70px;"></textarea>'+
                                '</form>',
                            success:function () {
                                // 获取当前日期
                                let date = new Date();
                                let line = "-";
                                let year = date.getFullYear();
                                let month = date.getMonth() + 1;
                                let day = date.getDate();
                                if (month >= 1 && month <= 9) {
                                    month = "0" + month;
                                }
                                if (day >= 0 && day <= 9) {
                                    day = "0" + day;
                                }
                                let todayDate = year + line + month + line + day;
                                $('#di-date').val(todayDate);
                                $('#di-state').val(data.state);
                                $('#dsc').val(data.dsc);
                                $('#di-fzr').val(data.uid);

                                $('.layui-layer-btn0').click(function () {
                                    var $tid = data.id,
                                        $oldState = data.state,
                                        $oldFzr = data.fzr,
                                        $state = $('#di-state'),
                                        $fzr = $('#di-fzr'),
                                        $date = $('#di-date'),
                                        $dsc = $('#dsc').val();

                                    $.ajax({
                                        type:'post',
                                        url:'/manager/page/task/jsp/updateTask.jsp',
                                        data:{
                                            tid:$tid,
                                            state:$state.val(),
                                            fzr:$fzr.val(),
                                            date:$date.val(),
                                            dsc:$dsc
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

                                $('.record-btn').click(function () {
                                    let recordStr = '<ul class="layui-timeline">';

                                    $.ajax({
                                        type:'post',
                                        url:'/manager/page/task/jsp/getTaskRecord.jsp',
                                        data:{
                                            tid:data.id
                                        },
                                        success: function (res) {
                                            let resObj = $.parseJSON(res);
                                            if(resObj.data.length === 0){
                                                layer.msg('暂未查询到修改记录');
                                            }else {
                                                for(let i=0;i<resObj.data.length;i++){
                                                    recordStr +='<li class="layui-timeline-item">' +
                                                        '<i class="layui-icon layui-timeline-axis"></i>' +
                                                        '<div class="layui-timeline-content layui-text">' +
                                                        '<h3 class="layui-timeline-title">'+resObj.data[i].date+'</h3>' +
                                                        '<p>责任人：'+resObj.data[i].fzr+'</p>' +
                                                        '<p>状态：'+resObj.data[i].state+'</p>' +
                                                        '<p>任务描述：'+resObj.data[i].dsc+'</p>' +
                                                        '</div>' +
                                                        '</li>';
                                                }
                                                recordStr +='<li class="layui-timeline-item">' +
                                                    '<i class="layui-icon layui-timeline-axis"></i>' +
                                                    '<div class="layui-timeline-content layui-text">' +
                                                    '<div class="layui-timeline-title">已全部显示</div>' +
                                                    '</div>' +
                                                    '</li>' +
                                                    '</ul>';

                                                layer.open({
                                                    title: '维护记录',
                                                    area: ['350px','400px'],
                                                    btn: 0,
                                                    content: recordStr
                                                });
                                            }
                                        },
                                        error:function () {
                                            layer.msg('网络错误');
                                        }
                                    });
                                });

                                layui.use('laydate', function(){
                                    let laydate = layui.laydate;

                                    //日期渲染
                                    laydate.render({
                                        elem: '#di-date'
                                    });
                                });
                            }
                        });
                    },
                    error:function () {
                        layer.msg('网络错误');
                    }
                });
            }
        });
    });

    //初始化任务创建
    $.ajax({
        type:'post',
        url:'/manager/page/task/jsp/getProject.jsp',
        success: function (res) {
            let resObj = $.parseJSON(res);
            let str = '',
                strhr = '';
            for(let i=0; i<resObj.data.length;i++){
                str +='<option value="'+resObj.data[i].pid+'">'+resObj.data[i].pname+'</option>'
            }
            for(let i=0; i<resObj.datahr.length;i++){
                strhr +='<option value="'+resObj.datahr[i].uid+'">'+resObj.datahr[i].name+'</option>'
            }
            $('#belong').append(str);
            $('#fzr').append(strhr);

            renderForm();
        },
        error:function () {
            layer.msg('网络错误');
        }
    });
    //重新渲染表单
    function renderForm(){
        layui.use('form', function(){
            var form = layui.form;
            form.render();
        });
    }
});

