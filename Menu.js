Collections.Menu = Backbone.Collection.extend({
	author: function() { return 'Leninux' },
	toString: function() { return 'Menu' },
	id: function() { return 'Menu' },
//	model: Models.MenuItem,
	initialize: function() {
		if(_.has(window,'menuItems')) {
			var menuItem;
			var self = this;
			_.each(window.menuItems, function(menuItemJSON) {
//				this.create(menuItemJSON);
				menuItem = new Models.MenuItem(menuItemJSON);
				App.log(menuItem);
				self.add(menuItem);
				App.log('pushed');
			}, this);
			App.log(this+' finish initialize');
			App.log(this);
		} else {
			App.log(this+': menuItems not found!');
		}
	}
});
