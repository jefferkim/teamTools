KISSY.add('sidebar', function (S, RichBase, O) {

    var $ = S.all;


    var Sidebar = RichBase.extend({

        initializer: function () {
            this._E("html", this.events);

        },

        _E: function (el, events) {
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
                    $(el).delegate(eventName, selector, (function (method) {
                        return function (e) {
                            method.call(self, e, this);
                        }
                    })(method));
                }
            }
        },


        events: {
            "click #J-addDirBtn": "addDirPopup",
            "click #J-addDir-cancel": "cancelAdd",
            "click #J-addDir-confirm": "addDir"
        },


        addDirPopup: function (e) {
            e.preventDefault();

            this.addDirDialog = new O.Dialog({
                width: 400,
                headerContent: '',
                bodyContent: '<div class="pop-add-dir"><h2>添加目录</h2><div class="add-dir"><input type="text" name="" id="J-inputDirName"/></div></div><div class="ft"><a href="#" id="J-addDir-cancel" class="btn dialog-cancel">取消</a><a href="#" id="J-addDir-confirm" class="btn dialog-confirm">确定</a> </div>',
                mask: true,
                align: {
                    points: ['cc', 'cc']
                }
            });

            this.addDirDialog.show();

            var target = e.currentTarget;
            var id = $(target).attr("data-id");

        },

        cancelAdd: function (e) {
            e.preventDefault();
            this.addDirDialog.destroy();


        },

        addDir: function (e) {
            e.preventDefault();
            var self = this;
            var mainDir = S.Cookie.get('mainDir');
            var name = $("#J-inputDirName").val();//TODO:校验
            var pathArr = window.location.pathname.split("/");
            var pathDirId = pathArr[pathArr.length-1];
            var pid = mainDir ? mainDir :(pathDirId?pathDirId:"");
            S.IO({
                url:'/file/addDir',
                type:"post",
                data:{
                    dirName:name,
                    pid:pid
                },
                success:function(result){
                    if (result.suc) {
                       self.addDirDialog.destroy();
                        window.location.reload();


                    } else {

                    }
                }
            })


        },

        destructor: function () {
            var self = this;

        }

    }, {
        ATTRS: {
            node: {
                setter: function (v) {
                    return $(v);
                }
            },

            prefixCls: {
                value: 'ks-'
            }

        }
    });

    return Sidebar;

}, {requires: [ "rich-base", 'overlay'] });






