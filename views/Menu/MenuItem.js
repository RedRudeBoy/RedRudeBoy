App.Models.MenuItem = Backbone.Model.extend({
	toString: function() { return 'MenuItem' },
//	id: function() { return 'MenuItem' },
	defaults: {
		'url' : '',
		'name' : '',
		'year' : 0
	},
	initialize: function() {
	}
});
