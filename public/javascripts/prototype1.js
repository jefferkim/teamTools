KISSY.add('prototype', function (S, RichBase, DD ,Resizeable) {

    var $ = S.all;

    var Prototype = RichBase.extend({

        initializer: function () {
            this.access_token = S.Cookie.get("access_token");
            this._E("body",this.events);

        },

        _E:function (el, events) {
            var self = this;
            $(el).detach();
            for (var key in events) {
                var method = this[events[key]];
                if (!method) throw new Error('Event "' + events[key] + '" does not exist');
                var match = key.match(/^(\S+)\s*(.*)$/);
                var eventName = match[1], selector = match[2];
                if (selector === '') {
                    return;
                } else {
                    $(el).delegate( eventName,selector, (function(method) {
                        return function(e) {
                            method.call(self, e , this);
                        }
                    })(method));
                }
            }
        },


        events: {
            "click #J-addLink": "addHotspot",
            "click .file": "selectFile",
            "click #J-delete": "deleteFile"
        },

        addHotspot:function(e){
            e.preventDefault();
            var self = this;
            if(self.drag){

                alert("当前热点区域未设置");
                return;
            }
            var currentId = "#J-page"+self.selectObj.attr("data-id");
            console.log(self.get('dragNodeHtml'));
            $(self.get('dragNodeHtml')).prependTo(currentId);



            self.drag=new DD.Draggable({
                node:currentId+" .hotspot",
                cursor:'move',
                move:true
            });

            self.drag.on("dragend", function(ev) {

                var c = ev.drag;
                var node = c.get('dragNode');

            });


           // self.drag.plug(Proxy);

            self.resize = new Resizeable({
                node:currentId+" .hotspot",
                handlers:["tr","tl","br","bl"],
                minHeight:20,
                minWidth:20
            });

            console.log(self.drag);

            self.resize.on("resizeEnd",function(ev){
                console.log(ev.dd);

                self.addEffectShow();
            })

        },

        addEffectShow:function(){



        },

        selectFile: function (e) {
            e.preventDefault();
            var self = this;
            $(".file").removeClass("selected");
            var t = self.selectObj = $(e.currentTarget);
            t.addClass("selected");
            self.selectedId = t.attr("data-id");     //tofix
            var offset = self.selectObj.offset();
            console.log(offset);

            $("#J-contextMenuItems").offset({left:offset.left,top:offset.top-30}).show();

        },

        deleteFile: function (e) {
            e.preventDefault();
            var self = this;

            S.IO({
                url: "/file/delete",
                data: {
                    "direct": false,
                    "fileId": self.selectedId,
                    "access_token": self.access_token
                },
                type: 'post',
                success: function (result) {
                    if (result.suc) {
                        self.selectObj.remove();

                    }else{

                    }
                }

            });
        },

        destructor: function () {
            var self = this;
                self.drag.destroy();
        }

    }, {
        ATTRS: {
            node: {
                setter: function (v) {
                    return $("body").all(v);
                }
            },

            dragNodeHtml:{
                value:'<div class="hotspot"></div>'
            },

            prefixCls: {
                value: 'ks-'
            },

            minWidth: {
                value: 0
            },

            minHeight: {
                value: 0
            },

            maxWidth: {
                value: Number['MAX_VALUE']
            },

            maxHeight: {
                value: Number['MAX_VALUE']
            },

            handlers: {
                // t,tr,r,br,b,bl,l,tl
                value: []
            }
        }
    });

    return Prototype;

}, {requires: [ "rich-base","dd","resizable"] });






