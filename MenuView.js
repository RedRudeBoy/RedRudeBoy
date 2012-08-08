Views.MenuView = Backbone.View.extend({
	author: function() { return 'Leninux'},
	toString: function() { return 'MenuView' },
	id: function() { return 'MenuView' },
	tagName: 'nav',
	className: 'menuViewClass',
//	attributes: {
//		'a' : 'e'
//	},
	initialize: function() {
		this.menu = new Collections.Menu();
		App.log(this.menu+' created:');
		App.log(this.menu);
	},
	render: function() {
		var output = '<a href="'+App.authorWeb()+'" rel="author" class="author">'+App.author()+'</a>';
		output += '<menu>';
		var menuItems = this.menu.models;
		_.each(menuItems,function(menuItem) {
			output += '<li><a href="'+menuItem.get('url')+'">'+menuItem.get('name')+'</a></li>';
		}, this);
		output += '</menu>';
		output += App.renderFooter();
		$(this.el).html( output );
		return this;
	}
});
