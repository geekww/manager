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
            url: '/manager/page/team/jsp/show.jsp',
            cols: [[
                {field:'name', title: '项目名',align:'center', width:200},
                {field:'manager', title: '项目经理',align:'center', width:150},
                {field:'page', title: '前端开发',align:'center', width:150},
                {field:'back', title: '后端开发',align:'center', width:150},
                {field:'test', title: '测试',align:'center', width:150},
                {fixed: 'right', title:'操作', toolbar: '#toolbar',align:'center', width:150}
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
                    let $name = data.name;
                    // 删除数据
                    $.ajax({
                        type:'post',
                        url:'/manager/page/team/jsp/delTeam.jsp',
                        data:{
                            name: $name,
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

                                    if(!$name){
                                        layer.msg('请输入项目名');
                                        return false;
                                    }

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
        let $name = $('#name'),
            $manager = $('#manager'),
            $page = $('#page .layui-form-checked span'),
            $back = $('#back .layui-form-checked span'),
            $test = $('#test .layui-form-checked span');
        if($page.length ===0){
            layer.msg('请勾选前端开发人员');
            return false;
        }
        if($back.length ===0){
            layer.msg('请勾选后端开发人员');
            return false;
        }
        if($test.length ===0){
            layer.msg('请勾选测试人员');
            return false;
        }
        let pageStr = '',
            backStr = '',
            testStr = '';
        for(let i=0;i<$page.length;i++){
            if(i === $page.length-1){
                pageStr += $page.eq(i).text();
            }else {
                pageStr += $page.eq(i).text() +'、';
            }
        }
        for(let i=0;i<$back.length;i++){
            if(i === $back.length-1){
                backStr += $back.eq(i).text();
            }else {
                backStr += $back.eq(i).text() +'、';
            }
        }
        for(let i=0;i<$test.length;i++){
            if(i === $test.length-1){
                testStr += $test.eq(i).text();
            }else {
                testStr += $test.eq(i).text() +'、';
            }
        }
        $.ajax({
            type:'post',
            url:'/manager/page/team/jsp/add.jsp',
            data:{
                name:$name.val(),
                manager:$manager.val(),
                page:pageStr,
                back:backStr,
                test:testStr
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
        url:'/manager/page/team/jsp/getHr.jsp',
        success: function (res) {
            let resObj = $.parseJSON(res);
            let manager = '',
                name = '',
                page = '',
                back = '',
                test = '';
            for(let i=0; i<resObj.name.length;i++){
                name +='<option value="'+resObj.name[i].name+'">'+resObj.name[i].name+'</option>'
            }
            $('#name').append(name);
            for(let i=0; i<resObj.manager.length;i++){
                manager +='<option value="'+resObj.manager[i].name+'">'+resObj.manager[i].name+'</option>'
            }
            $('#manager').append(manager);
            for(let i=0; i<resObj.page.length;i++){
                page +='<input type="checkbox" class="page" lay-skin="primary" title="'+resObj.page[i].name+'">'
            }
            $('#page').append(page);
            for(let i=0; i<resObj.back.length;i++){
                back +='<input type="checkbox" class="back" lay-skin="primary" title="'+resObj.back[i].name+'">'
            }
            $('#back').append(back);
            for(let i=0; i<resObj.test.length;i++){
                test +='<input type="checkbox" class="page" lay-skin="primary" title="'+resObj.test[i].name+'">'
            }
            $('#test').append(test);
        },
        error:function () {
            layer.msg('网络错误');
        }
    });
});
