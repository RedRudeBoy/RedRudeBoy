Views.WindowView = Backbone.View.extend({
	author: function() { return 'Leninux'},
	toString: function() { return 'WindowView' },
	id: function() { return 'WindowView' },
	initialize: function() {
		
	},
	render: function() {
		$(this.el).html( '<h1>window</h1>' );
		return this;
	}
});
