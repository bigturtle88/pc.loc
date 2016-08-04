/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var AppTodo = {
    defaultUrl: 'http://' + window.location.hostname,
    restUrl: 'http://' + window.location.hostname + '/deadlines',
    restUrlComments: 'http://' + window.location.hostname + '/comments',
    init: function () {
        var _this = this;
        _this.InitTodo(_this);
    },
    conversionREST: function (form) {
        var o = {};
        var a = $(form).serializeArray();
        var nameArray = {};
        $.each(a, function () {
            if (this.name !== '_csrf') {
                nameArray = this.name.split(/\[(.*?)\]/);
            }
            if (o[this.name !== undefined]) {
                if (!o[this.name.push]) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name.push](this.value || '');
            } else {
                o[nameArray[1]] = this.value || '';
            }
        });
        return o;
    },
    InitTodo: function (_this) {

        if ($('#todoTable').length) {
            _this.TodoIndex(_this);
        } else {
            _this.TodoView(_this);
            _this.CommentsIndex(_this)
        }
        $(document).on('click', '.glyphicon-unchecked', _this.InitCheckedDeadline.bind(event));
        $(document).on('click', '.glyphicon-check', _this.InitUncheckedDeadline.bind(event));
    },
    TodoIndex: function (_this) {
        var nameTable = '#todoTable';
        $.ajax({
            method: 'GET',
            url: _this.restUrl,
            dataType: 'json',
            //  data: this.conversionREST(form),
            success: function (data, textStatus, jqXHR) {
                _this.TodoRender(data, nameTable);
            },
            error: function (jqXHR, textStatus, errorThrown) {

                console.log("Error: TodoIndex");
            }
        })
    },
    CommentsIndex: function (_this) {
        var deadlineId = $('#deadlineView').attr('data-id');
        var nameTable = '#commentsView'
        $.ajax({
            method: 'GET',
            url: _this.restUrlComments + '?id=' + deadlineId,
            dataType: 'json',
            success: function (data, textStatus, jqXHR) {
                _this.CommentsRender(data, nameTable);
            },
            error: function (jqXHR, textStatus, errorThrown) {

                console.log("Error: TodoIndex");
            }
        })
    },
    TodoView: function (_this) {
        var nameTable = '#deadlineView';
        var deadlineObj = {};
        var deadlineId = $('#deadlineView').attr('data-id');
        $.ajax({
            method: 'GET',
            url: _this.restUrl + '/' + deadlineId,
            dataType: 'json',
            //  data: this.conversionREST(form),
            success: function (data, textStatus, jqXHR) {
                deadlineObj[0] = data;
                _this.TodoRender(deadlineObj, nameTable);
            },
            error: function (jqXHR, textStatus, errorThrown) {

                console.log("Error: TodoView");
            }
        })
    },
    TodoRender: function (data, nameTable) {

        var styleChecked = 'glyphicon glyphicon-check';
        var styleUnchecked = 'glyphicon glyphicon-unchecked';
        var stylCheckedState = null;
        $(nameTable).html('');
        $.each(data, function (key, val) {
            stylCheckedState = '';
            styleCheckedState = (val.status == 1) ? styleChecked : styleUnchecked;
            val.text = (val.status == 1) ? "<del>" + val.text + "</del>" : val.text;
            val.text = (nameTable == '#deadlineView') ? val.text
                    : '<a href="todo/deadline-view?id=' + val.id + '" >' + val.text + '</a>';
            val.comments_count = (nameTable == '#deadlineView') ? '' : val.comments_count;

            $(nameTable).append('<li data-id="' + val.id + '">\n\
                            <div class="panel panel-success">\n\
                            <div class="panel-body">\n\
                            <div class="col-xs-2"><a href="#" >\n\
                            <span class="' + styleCheckedState + '"   data-id="' + val.id + '">\n\
                            </span></a></div><div class="col-xs-5">'
                    + val.text + '</a></div>\n\
                            <div class="col-xs-3">' + val.deadline_date + '</div>\n\
                            <div class="col-xs-2"><span class="badge">' + val.comments_count + '</span></div></div>\n\
                            </div></li>');
        }
        );

    },
    CommentsRender: function (data, nameTable) {


        $(nameTable).html('');
        $.each(data, function (key, val) {
            $(nameTable).append('<li data-id="' + val.id + '">\n\
                            <div class="panel  panel-info">\n\
                            <div class="panel-body">\n\
                            <div class="col-xs-2"></div><div class="col-xs-5">'
                    + val.text + '</a></div>\n\
                            <div class="col-xs-3">' + val.date_create + '</div>\n\
                            <div class="col-xs-2"> </div></div>\n\
                            </div></li>');
        }
        );

    },
    CreateDeadline: function (data) {

        console.log(AppTodo.conversionREST(data));
        $.ajax({
            method: 'POST',
            url: AppTodo.restUrl,
            dataType: 'json',
            data: AppTodo.conversionREST(data),
            success: function (data, textStatus, jqXHR) {

                console.log("Ok: AddDeadline");
                AppTodo.init();
            },
            error: function (jqXHR, textStatus, errorThrown) {

                console.log("Error: AddDeadline");
            }
        });

    },
    CreateComment: function (data) {
        $.ajax({
            method: 'POST',
            url: AppTodo.restUrlComments,
            dataType: 'json',
            data: AppTodo.conversionREST(data),
            success: function (data, textStatus, jqXHR) {

                console.log("Ok: AddComment");
                AppTodo.init();
            },
            error: function (jqXHR, textStatus, errorThrown) {

                console.log("Error: AddComment");
            }
        });

    },
    UpdateDeadline: function (id, status) {

        var _status = {};
        _status['status'] = JSON.stringify(status);
        $.ajax({
            method: 'PUT',
            url: AppTodo.restUrl + '/' + id,
            dataType: 'json',
            data: _status,
            success: function (data, textStatus, jqXHR) {

                console.log("Ok: UpdateDeadline");

            },
            error: function (jqXHR, textStatus, errorThrown) {

                console.log("Error: UpdateDeadline");
            }
        })
    },
    InitUncheckedDeadline: function (event) {
        event.stopPropagation();
        var target = $(event.target);
        var id = target.attr('data-id');
        var status = 0;

        AppTodo.UpdateDeadline(id, status);
        AppTodo.init();
    },
    InitCheckedDeadline: function (event) {
        event.stopPropagation()
        var target = $(event.target);
        var id = target.attr('data-id');
        var status = 1;



        AppTodo.UpdateDeadline(id, status);
        AppTodo.init();
    }
}
AppTodo.init();