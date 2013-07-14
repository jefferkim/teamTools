var S = KISSY;
var $ = S.all;


var selectedId = "";
var selectObj = "";
var access_token = S.Cookie.get("access_token");


$(".file").on("click", function (e) {
    e.preventDefault();
    $(".file").removeClass("selected");
    var currentTarget = e.currentTarget;

    $(currentTarget).addClass("selected");
    selectObj = $(currentTarget);
    selectedId = $(currentTarget).attr("data-id");

});



$("#J-delete").on("click", function (e) {
    e.preventDefault();
    S.IO({
        url: "/file/delete",
        data:{
          "direct":false,
          "fileId":selectedId
        },
        type:'post',
        success: function (result) {

            if(result.suc){
                selectObj.remove();

            }

        }

    })

})