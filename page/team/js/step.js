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

    $('.project-next').click(function () {
        let pname = $('#pname').val();
        if($pname.length === 0){
            layer.msg('请选择项目');
            return false;
        }
        //存储项目

    });

    // add
    $('#dev-next').click(function () {
        let $name = $('#name'),
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
});