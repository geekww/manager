$(function () {
    //public
    layui.use(['form', 'laydate', 'table'], function() {
        let table = layui.table,
            laydate = layui.laydate;

        //日期渲染
        laydate.render({
            elem: '#date'
        });

        //表格渲染
        table.render({
            elem: '#view',
            url: '/manager/page/project/jsp/show.jsp',
            cols: [[
                {field:'pid', title: '项目编号',align:'center', width:150},
                {field:'name', title: '项目名',align:'center', width:200},
                {field:'date', title: '创建日期',align:'center', width:150},
                {field:'fzr', title: '负责人',align:'center', width:150},
                {field:'dsc', title: '项目描述',align:'center', width:300},
                {fixed: 'right', title:'操作', toolbar: '#toolbar', width:150}
            ]],
            done: function(res){

            },
            page: true,
            height: 315,
        });
        //更新删除
        table.on('tool(view)', function(obj){
            var data = obj.data;
            if(obj.event === 'del'){
                layer.confirm('确定删除当前项目？', function(index){
                    let $pid = data.pid;
                    // 删除数据
                    $.ajax({
                        type:'post',
                        url:'/manager/page/project/jsp/delProject.jsp',
                        data:{
                            pid: $pid,
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
                // 获取开发人员
                $.ajax({
                    type:'post',
                    url:'/manager/page/task/jsp/getHr.jsp',
                    success: function (res) {
                        let resObj = $.parseJSON(res);
                        let strhr = '';
                        for(let i=0; i<resObj.datahr.length;i++){
                            strhr +='<option value="'+resObj.datahr[i].name+'">'+resObj.datahr[i].name+'</option>'
                        }
                        layer.open({
                            title: '修改项目',
                            content: '<form>' +
                                '<label style="width: 70px;display: inline-block;">项目名：</label>' +
                                '<input type="text" id="name" autocomplete="off" style="padding: 4px;font-size: 14px;margin-bottom: 10px;width: 160px;"><br>' +
                                '<label style="width: 70px;display: inline-block;">负责人：</label>' +
                                '<select id="fzr" style="padding: 4px;font-size: 14px;margin-bottom: 10px;width: 75px;">' +
                                strhr+
                                '</select><br>' +
                                '<label style="width: 70px;display: inline-block;vertical-align: top;">项目描述：</label>' +
                                '<textarea id="dsc" style="height: 70px;"></textarea>'+
                                '</form>',
                            success:function () {
                                $('#name').val(data.name);
                                $('#fzr').val(data.fzr);
                                $('#dsc').val(data.dsc);

                                $('.layui-layer-btn0').click(function () {
                                    let $pid = data.pid,
                                        $name = $('#name').val(),
                                        $fzr = $('#fzr').val(),
                                        $dsc = $('#dsc').val();

                                    $.ajax({
                                        type:'post',
                                        url:'/manager/page/project/jsp/updateProject.jsp',
                                        data:{
                                            pid: $pid,
                                            name: $name,
                                            fzr: $fzr,
                                            dsc: $dsc
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

    // show
    $('#search').click(function () {
        let pid = $('#pid').val();
        if(!pid){
            layer.msg('请输入项目编号');
            return false;
        }

        layui.use('table', function(){
            let table = layui.table;

            table.render({
                elem: '#view',
                url: '/manager/page/project/jsp/search.jsp?pid='+pid,
                cols: [[
                    {field:'pid', title: '项目编号',align:'center', width:150},
                    {field:'name', title: '项目名',align:'center', width:250},
                    {field:'date', title: '创建日期',align:'center', width:150},
                    {field:'fzr', title: '负责人',align:'center', width:150},
                    {field:'dsc', title: '项目描述',align:'center', width:350}
                ]],
                done: function(res){
                    if(res.data.length === 0){
                        layer.msg('未查询到该项目');
                    }
                },
                page: true,
                height: 315,
            });
        });
    });

    // add
    $('#create').click(function () {
        let $pid = $('#pid'),
            $name = $('#name'),
            $fzr = $('#fzr'),
            $date = $('#date'),
            $dsc = $('#dsc');

        // 非空校验
        if(!$pid.val()){
            layer.msg('请输入项目编号');
            return false;
        }
        if(!$name.val()){
            layer.msg('请输入项目名');
            return false;
        }
        if(!$fzr.val()){
            layer.msg('请输入负责人');
            return false;
        }
        if(!$date.val()){
            layer.msg('请选择创建日期');
            return false;
        }

        $.ajax({
            type:'post',
            url:'/manager/page/project/jsp/add.jsp',
            data:{
                pid:$pid.val(),
                name:$name.val(),
                fzr:$fzr.val(),
                date:$date.val(),
                dsc:$dsc.val()
            },
            success:function (res) {
                let resObj = $.parseJSON(res);
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

    //初始化任务创建
    $.ajax({
        type:'post',
        url:'/manager/page/project/jsp/getHr.jsp',
        success: function (res) {
            let resObj = $.parseJSON(res);
            let strhr = '';
            for(let i=0; i<resObj.datahr.length;i++){
                strhr +='<option value="'+resObj.datahr[i].name+'">'+resObj.datahr[i].name+'</option>'
            }
            $('#fzr').append(strhr);
        },
        error:function () {
            layer.msg('网络错误');
        }
    });
});
