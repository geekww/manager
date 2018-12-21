$(function () {
    // 渲染表单
    layui.use(['form'], function() {}

    );
    //初始化任务创建
    $.ajax({
        type:'post',
        url:'/manager/page/team/jsp/getHr.jsp',
        success: function (res) {
            let resObj = $.parseJSON(res);
            let manager = '',
                pname = '',
                page = '',
                back = '',
                test = '';
            for(let i=0; i<resObj.pname.length;i++){
                pname +='<option value="'+resObj.pname[i].pname+'">'+resObj.pname[i].pname+'</option>'
            }
            $('#pname').append(pname);
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

    $('#project-next').click(function () {
        let pname = $('#pname').val();
        if(pname.length === 0){
            layer.msg('请选择项目');
            return false;
        }
        //存储项目
        $('.select-project').hide();
        $('.select-dev').show();
    });

    $('#dev-last').click(function () {
        //存储项目
        $('.select-dev').hide();
        $('.select-project').show();

    });

    $('#dev-next').click(function () {
        let $page = $('#page .layui-form-checked span'),
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
        var str = '';
        for(let i=0;i<$page.length;i++){
            str +='<div class="layui-form-item">' +
                '    <div class="layui-inline">' +
                '        <label class="layui-form-label">'+$page.eq(i).text()+'：</label>' +
                '        <div class="layui-input-block">' +
                '            <input type="text" autocomplete="off" class="layui-input duty" data-dev="'+$page.eq(i).text()+'" data-duty="前端工程师" placeholder="填写职责">' +
                '        </div>' +
                '    </div>' +
                '</div>';
        }
        for(let i=0;i<$back.length;i++){
            str +='<div class="layui-form-item">' +
                '    <div class="layui-inline">' +
                '        <label class="layui-form-label">'+$back.eq(i).text()+'：</label>' +
                '        <div class="layui-input-block">' +
                '            <input type="text" autocomplete="off" class="layui-input duty" data-dev="'+$back.eq(i).text()+'" data-duty="后端工程师" placeholder="填写职责">' +
                '        </div>' +
                '    </div>' +
                '</div>';
        }
        for(let i=0;i<$test.length;i++){
            str +='<div class="layui-form-item">' +
                '    <div class="layui-inline">' +
                '        <label class="layui-form-label">'+$test.eq(i).text()+'：</label>' +
                '        <div class="layui-input-block">' +
                '            <input type="text" autocomplete="off" class="layui-input duty" data-dev="'+$test.eq(i).text()+'" data-duty="测试工程师" placeholder="填写职责">' +
                '        </div>' +
                '    </div>' +
                '</div>';
        }
        //存储人员信息
        $('#duty-box').append(str);
        $('.select-dev').hide();
        $('.select-finish').show();
    });

    $('#create').click(function () {
        let duty = $('.duty');
        for(let i=0;i<duty.length;i++){
            if(!duty.eq(i).val()){
                layer.msg('请填写具体职责');
                return false;
            }
        }
        for(let i=0;i<duty.length;i++){
            $.ajax({
                type:'post',
                url:'/manager/page/team/jsp/add.jsp',
                data:{
                    pname:$('#pname').val(),
                    dev:duty.eq(i).attr('data-dev'),
                    duty:duty.eq(i).attr('data-duty'),
                    detail:duty.eq(i).val(),
                },
                success:function (res) {

                },
                error:function () {
                    layer.msg('网络错误');
                },
            });
        }
        // 存储key
        $.ajax({
            type:'post',
            url:'/manager/page/team/jsp/addkey.jsp',
            data:{
                pname:$('#pname').val(),
            },
            success:function (res) {
                layer.msg('创建成功');
            },
            error:function () {
                layer.msg('网络错误');
            },
        });



        // setTimeout(function () {
        //     window.location.reload()
        // },2000);
    });
});
