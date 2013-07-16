KISSY.add('project', function (S, RichBase, O) {

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
            "click #J-delete-cancel": "cancelDelete"
        },


        deleteFile: function (e) {
            e.preventDefault();
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
            var id = $(target).attr("data-id");

        },

        cancelDelete: function (e) {
            e.preventDefault();
            this.deleteDialog.destroy();

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

}, {requires: [ "rich-base", 'overlay'] });






