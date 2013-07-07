console.log("prototype.js");

KISSY.use("event,node,overlay,component/plugin/drag", function (S, Event, Node, O, DragPlugin) {

    var $ = S.all;

    var createDir_dialog = new O.Dialog({
        width:400,
        headerContent:'原型设置',
        bodyContent:$("#J-prototype-setting").html(),
        mask:true,
        align:{
            points:['cc', 'cc']
        }
    });


    $("#J-addInterface").on("click", function (e) {
        e.preventDefault();
        createDir_dialog.show();
    })

    var confirmDelete_dialog = new O.Dialog({
        width:400,
        // headerContent: '新建目录',
        bodyContent:'<div class="box-c">确定要删除吗<button>确定</button></div>',
        mask:true,
        align:{
            points:['cc', 'cc']
        }
    })


});
