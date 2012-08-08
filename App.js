RedRudeBoyApp = Backbone.View.extend({
	el: 'body',
	author: function() { return 'Leninux'},
	toString: function() { return 'RedRudeBoyApp' },
	basePath: window.location.protocol + "//" + window.location.host,
	debug: false,
	initialize: function() {
		if (_.has(this.options,'debug')) this.debug = this.options.debug;
		
		this.log('Initializing '+this);
		
		//declare the vars where all the instances are gonna be
		this.models = new Object();
		this.collections = new Object();
		this.views = new Object();
		
		this._instantiateClasses();
		this.render();
	},
	_instantiateClasses: function() {
		this.views.menuView = new Views.MenuView();
		this.views.windowView = new Views.WindowView();
	},
	log: function ( message ) {
		if ( typeof console == 'object' && this.debug) {
			console.log ( message );
		}
	},
//	template: function() {
//		return _.template("hello: <%= name %>");
//	},
	_renderViews: function() {
		return [
			this.views.menuView,
			this.views.windowView
		];
	},
	render: function() {
		var output = '';
		var viewEl;
		var viewHTML = '';
//		debugger;
		_.each(this._renderViews(),function(view) {
			//I don't understand why this is needed, but outerhtml is not supported
			//for firefox, and I don't wanna print 
			viewEl = view.render().el;
			viewHTML = $( viewEl ).clone().wrap('<p>').parent().html();
			viewHTML = '<div id="'+view+'Container">' + viewHTML + '</div>';
			output += viewHTML;
		}, this);
		this.log(output);
		$(this.el).html(output);
		return this;
//		$(this.el).html(this.template(this.model.toJSON()));
	}
});