KISSY.use("node,ajax", function (S, Node,ajax) {
     var $ = S.all;

     var selectedId = "";

     $(".file").on("click",function(e){
        e.preventDefault();
        $(".file").removeClass("selected");
        var currentTarget = e.currentTarget;

        $(currentTarget).addClass("selected");
        selectedId = $(currentTarget).attr("data-id");
        console.log(selectedId);

     });



     $("#J-delete").on("click",function(e){


      //    var access_token = Cookie.get("access_token");
      //    console.log(access_token);
         e.preventDefault();
         S.IO({
                dataType:'jsonp',
                url:"http://api.yunpan.alibaba.com/api/file/remove?direct=false&id="+selectedId+"&access_token="+, 
                
                jsonp:"jsoncallback",    
                success:function (data) {
                    console.log(data);
                    
                }
          
     })

      })

  })