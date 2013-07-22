KISSY.add('project', function (S, RichBase, O, QRCode) {

    var $ = S.all;


    var Project = RichBase.extend({

        initializer: function () {
            this.access_token = S.Cookie.get("access_token");
            this._E("body", this.events);

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
            "click .delete-project": "deleteFile",
            "click #J-delete-cancel": "cancelDelete",
            "click #J-delete-confirm": "deleteNow",
            "click .J-viewQR": "viewQR",
            "click #J-jump":"popLinkList",
            "click .ks-overlay-mask-shown": "closePop"
        },


        deleteFile: function (e) {
            e.preventDefault();

            this.deleteDialog = new O.Dialog({
                width: 400,
                headerContent: '',
                bodyContent: '<div class="d-tip">删除文件夹不会删除淘云盘的数据，在当前页面将不会显示</div><div class="ft"><a href="#" id="J-delete-cancel" class="btn dialog-cancel">取消</a><a href="#" id="J-delete-confirm" class="btn dialog-confirm">确定</a> </div>',
                mask: true,
                align: {
                    points: ['cc', 'cc']
                }
            });

            this.deleteDialog.show();

            var target = e.currentTarget;
            console.log($(target).parent("li"));

            this.pid = $(target).parent("li").attr("data-id");


        },

        deleteNow: function (e) {

            e.preventDefault();

            var self = this;
            var id = this.pid;


            S.IO({
                url: '/file/remove',
                type: "post",
                data: {
                    id: id
                },
                success: function (result) {

                    if (result.suc) {
                        self.deleteDialog.destroy();
                        window.location.reload();

                    } else {

                    }
                }
            })


        },






        closePop: function (e) {
            e.preventDefault();
            this.QRDialog.destroy();
        },


        cancelDelete: function (e) {
            e.preventDefault();
            this.deleteDialog.destroy();

        },

        viewQR: function (e) {
            e.preventDefault();

            var target = e.currentTarget;
            var qrText = $(target).attr("data-url");
            $("#qrcode").html("");


            this.QRDialog = new O.Dialog({
                width: 400,
                headerContent: '',
                bodyContent: '<div class="qr-pop"><div id="J-qrcode"></div><div class="tips">扫描二维码，在手机上浏览</div></div>',
                mask: true,
                align: {
                    points: ['cc', 'cc']
                }
            });

            this.QRDialog.show();


            var qrcode = new QRCode("J-qrcode", {
                text: window.location + qrText,
                width: 304,
                height: 304,
                colorDark: "#000000",
                colorLight: "#ffffff"
            });

            this.pid = $(target).parent("li").attr("data-id");

        },

        destructor: function () {
            var self = this;
            self.drag.destroy();
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
            }

        }
    });

    return Project;

}, {requires: [ "rich-base", 'overlay', 'gallery/qrcode/1.0/'] });






