App.Views.MenuView = Backbone.View.extend({
	tagName: 'li',
	className: '',
	id: '',
//	attributes: {
//		'a' : 'e'
//	},
	author: function() { return 'Leninux'},
	toString: function() { return 'MenuView' },
	initialize: function() {
		
	},
	render: function() {
		return this;
	}
});
