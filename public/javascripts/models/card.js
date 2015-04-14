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

    initialize: function(attrs) {
        this.listenTo(this.model, "change", this.render);
    },

    render: function() {
        this.$el.html(this.template(this.model.attributes));
        return this;
    }
});