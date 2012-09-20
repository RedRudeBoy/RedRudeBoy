App.Collections.Menu = Backbone.Collection.extend({
	author: function() { return 'Leninux' },
	toString: function() { return 'Menu' },
	id: function() { return 'Menu' },
//	model: Models.MenuItem,
	initialize: function() {
		if(_.has(App,'menuItems')) {
			var menuItem;
			_.each(App.menuItems, function(menuItemJSON) {
//				this.create(menuItemJSON);
				menuItem = new App.Models.MenuItem(menuItemJSON);
				App.log(menuItem);
				this.add(menuItem);
				App.log('pushed');
			}, this);
			App.log(this+' finish initialize');
			App.log(this);
		} else {
			App.log(this+': menuItems not found!');
		}
	}
});
