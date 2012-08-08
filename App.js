RedRudeBoyApp = Backbone.View.extend({
	el: 'body',
	//I dont know if its better to have the attributes like this:
//	author: 'Arnau-Leninux / RedRudeBoy',
	//But I prefer to use like a function for coherence with toString
	author: function() { return 'Arnau-Leninux / RedRudeBoy' },
	authorWeb: function() { return 'http://www.jamaicaska.es' },
	toString: function() { return 'RedRudeBoyWeb' },
	gitRepo: function() { return 'RedRudeBoy/RedRudeBoy' },
	gitUrl: function() { return 'https://github.com/'+this.gitRepo()+'.git' },
	gitWeb: function() { return 'https://github.com/'+this.gitRepo() },
	basePath: function() { return window.location.protocol + "//" + window.location.host },
	debug: false,
	initialize: function() {
		if (_.has(this.options,'debug')) this.debug = this.options.debug;
		
		this.log('Initializing '+this);
		
		//declare the vars where all the instances are gonna be
		this.models = new Object();
		this.collections = new Object();
		this.views = new Object();
	},
	initApp: function() {
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
	render: function() {
		var output = '';
		var viewEl;
		var viewHTML = '';
		_.each(this._renderViews(),function(view) {
			//I don't understand why this is needed, but outerhtml is not supported
			//for firefox, and I don't wanna print 
			viewEl = view.render().el;
			viewHTML = $( viewEl ).clone().wrap('<p>').parent().html();
//			viewHTML = '<div id="'+view+'Container">' + viewHTML + '</div>';
			output += viewHTML;
		}, this);
		$(this.el).html(output);
		return this;
//		$(this.el).html(this.template(this.model.toJSON()));
	},
	_renderViews: function() {
		return [
			this.views.menuView,
			this.views.windowView
		];
	},
	renderFooter: function() {
		var output = '<footer>';
		output += this._renderLicense();
		output += '<p>Code at <a href="'+App.gitWeb()+'">GitHub</></p>';
		output += '</footer>';
		return output;
	},
	_renderLicense: function() {
		var output = '<a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/deed.ca"><img alt="Llicència de Creative Commons" style="border-width:0" src="http://i.creativecommons.org/l/by-sa/3.0/80x15.png" /></a>';
		output += '<br />';
		output += '<span xmlns:dct="http://purl.org/dc/terms/" property="dct:title">'+App.toString()+'</span>';
		output += ' de <a xmlns:cc="http://creativecommons.org/ns#" href="'+App.basePath()+'" property="cc:attributionName" rel="cc:attributionURL">'+App.author()+'</a>';
		output += ' està subjecta a una llicència de <a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/deed.ca">Reconeixement-CompartirIgual 3.0 No adaptada de Creative Commons</a>';
		return output;
	},
	_renderGitProfile: function() {
		return '<div class="github-widget" data-repo="'+App.gitRepo()+'"></div>';
	}
});