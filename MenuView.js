Views.MenuView = Backbone.View.extend({
	author: function() { return 'Leninux'},
	toString: function() { return 'MenuView' },
	id: function() { return 'MenuView' },
	tagName: 'ul',
	className: 'menuViewClass',
//	attributes: {
//		'a' : 'e'
//	},
	initialize: function() {
		
	},
	render: function() {
		return this;
	}
});
