Models.MenuItem = Backbone.Model.extend({
	author: function() { return 'Leninux' },
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
