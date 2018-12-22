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
                str +='<div class="card-view">' +
                    '    <div class="layui-card">' +
                    '        <div class="layui-card-header">'+pname+'</div>' +
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
