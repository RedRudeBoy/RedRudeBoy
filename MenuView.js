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
		var output = '';
		_.each(this._items(),function(value, key) {
			output += '<li><a href="'+value+'"></a>'+key+'</li>';
		}, this);
		$(this.el).html( output );
		return this;
	},
	_items: function() {
		return {
			'Home' : 'http://www.jamaicaska.es',
			'Logout' : 'http://www.google.com'
		}
	}
});
