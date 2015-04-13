var Card = Backbone.Model.extend({
    defaults: {
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
    }
});

var CardView = Backbone.View.extend({
    tagName: 'li',
    className: 'card',

    initialize: function(attrs) {
        this.id = attrs('model') ? 'card-' + attrs('model').id : null;
        this.listenTo(this.model, "change", this.render);
    },

    render: function() {
        this.$el.html();
        return this;
    }
});