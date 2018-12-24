$(function () {
    //获取团队
    $.ajax({
        type:'post',
        url:'/manager/page/team/jsp/teamShow.jsp',
        success:function (res) {
            let resObj = $.parseJSON(res);
            let str = '';
            for(let i=0;i<resObj.data.length;i++){
                let pname = resObj.data[i].pname;
                let pid = resObj.data[i].pid;
                str +='<div class="card-view">' +
                    '    <div class="layui-card">' +
                    '        <div class="layui-card-header">'+pname+'</div>' +
                    '        <div class="edit-box">' +
                    // '           <a class="layui-btn layui-btn-xs edit-team">编辑</a>'+
                    '           <a class="layui-btn layui-btn-danger layui-btn-xs del-team" data-pid="'+pid+'">删除</a>'+
                    '        </div>'+
                    '        <div class="layui-card-body">' +
                    '            <table class="layui-table">' +
                    '                <thead>' +
                    '                <tr>' +
                    '                    <th>角色</th>' +
                    '                    <th>人员</th>' +
                    '                    <th>项目职责</th>' +
                    '                </tr>' +
                    '                </thead>' +
                    '                <tbody>' +
                    listRander(resObj.data[i].row)+
                    '                </tbody>' +
                    '            </table>' +
                    '        </div>' +
                    '    </div>' +
                    '</div>';
            }
            $('.card').append(str);

            //删除
            $('.del-team').click(function () {
                let $pid = $(this).attr('data-pid');
                layer.confirm('确定删除当前任务？', function(index){
                    // 删除数据
                    $.ajax({
                        type:'post',
                        url:'/manager/page/team/jsp/delTeam.jsp',
                        data:{
                            pid: $pid,
                        },
                        success: function (res) {
                            let resObj = $.parseJSON(res);
                            // layer.msg(resObj.msg);
                        },
                        error:function () {
                            layer.msg('网络错误');
                        }
                    });
                    $.ajax({
                        type:'post',
                        url:'/manager/page/team/jsp/delTeamKey.jsp',
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
                // layer.open({
                //     title: '是否删除？',
                //     content: '',
                //     success: function () {
                //
                //     }
                // });
            });
            // 编辑
            $('.edit-team').click(function () {

            });
        },
        error:function () {
            layer.msg('网络错误');
        },
    });
    // 列表渲染方法
    function listRander(obj) {
        let list = '';
        for(let i=0;i<obj.length;i++){
            list +='<tr>' +
                   '<td>'+obj[i].duty+'</td>' +
                   '<td>'+obj[i].dev+'</td>' +
                   '<td>'+obj[i].detail+'</td>' +
                   '</tr>';
        }
        return list;
    }
});
