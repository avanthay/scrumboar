var Card = Backbone.Model.extend({
    defaults: {
        id: null,
        title: 'new card',
        description: '',
        effort: 1,
        operator: '',
        status: 'to do'
    },

    validate: function(attrs, options) {
        var validEfforts = [1,2,3,5,8],
            validStatus = ['to do', 'in progress', 'done'];
        if (validEfforts.indexOf(attrs.effort) == -1) {
            return "effort must be in 1,2,3,5 or 8!";
        }
        if (validStatus.indexOf(attrs.status) == -1) {
            return 'status must be either "to do", "in progress" or "done"!';
        }
    },

    sync: function(method, model, options) {
        if (typeof socket == 'undefined') {
            return false;
        }
        socket.emit('card', {
            method: method,
            card: model,
            options: options,
            cid: method == 'create' ? model.cid : null
        });
    }

});


var CardView = Backbone.View.extend({

    tagName: 'li',
    className: 'card',
    template: _.template($('#card-template').html()),

    events: {
        'dblclick': 'edit',
        'click': 'handleClick'
    },

    initialize: function() {
        this.listenTo(this.model, "change", this.render);
        this.listenTo(this.model, "destroy", this.remove);
        this.listenTo(this.collection, "reset", this.remove);
    },

    render: function() {
        this.$el.html(this.template(this.model.attributes));
        this.$el.removeClass('effort-1 effort-2 effort-3 effort-5 effort-8').addClass('effort-' + this.model.get('effort'));
        return this;
    },

    handleClick: function(e) {
        if ($(e.target).data('save')) {
            this.save();
        }
    },

    edit: function() {
        if (this.$el.hasClass('card-edit')) {
            return;
        }
        this.$el.addClass('card-edit');

        this.$el.find('h5').html($('<input>').attr('type', 'text').attr('placeholder', 'Title').val(this.model.get('title')));
        this.$el.find('p.card-description').html($('<textarea>').attr('placeholder', 'A description...').val(this.model.get('description')));
        this.$el.find('p.card-effort').html(this._createSelectForEffort().val(this.model.get('effort')));
        this.$el.find('p.card-operator').html($('<input>').attr('type', 'text').attr('placeholder', 'Operator').val(this.model.get('operator')));
    },

    _createSelectForEffort: function() {
        var select = $('<select>').addClass('form-control');
        $.each([1,2,3,5,8], function(index, value) {
            select.append($('<option>').attr('value', value).text(value));
        });
        return select;
    },

    save: function() {
        console.log({
            title: this.$el.find('h5 input').val(),
            description: this.$el.find('p.card-description textarea').val(),
            effort: parseInt(this.$el.find('p.card-effort select').val()),
            operator: this.$el.find('p.card-operator input').val()
        });
        var success = this.model.save({
            title: this.$el.find('h5 input').val(),
            description: this.$el.find('p.card-description textarea').val(),
            effort: parseInt(this.$el.find('p.card-effort select').val()),
            operator: this.$el.find('p.card-operator input').val()
        });
        console.log(success);
        if (success !== false) {
            this.render().$el.removeClass('card-edit');
        }
    }

});