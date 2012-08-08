RedRudeBoyApp = Backbone.View.extend({
	el: 'body',
	author: function() { return 'Leninux'},
	toString: function() { return 'RedRudeBoyApp' },
	initialize: function() {
		this.menuView = new App.Views.MenuView();
		this.windowView = new App.Views.WindowView();
		this.render();
	},
//	template: function() {
//		return _.template("hello: <%= name %>");
//	},
	render: function() {
		debugger;
		var output =
'<div id="menuViewContainer">'+this.menuView.render().el+'</div>'+
'<div id="windowViewContainer">'+this.windowView.render().el+'</div>';
		$(this.el).html(output);
		return this;
//		$(this.el).html(this.template(this.model.toJSON()));
	},
	console: function(msg) {
		if(_.isBoolean(App.debug) && App.debug && _.has(console, 'log')) {
			console.log(msg);
		}
	}
});