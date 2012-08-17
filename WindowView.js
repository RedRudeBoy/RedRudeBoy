App.Views.WindowView = Backbone.View.extend({
	author: function() { return 'Leninux'},
	toString: function() { return 'WindowView' },
	id: function() { return 'WindowView' },
	initialize: function() {
		
	},
	render: function() {
		$(this.el).html( '<h1>window</h1>' );
		this.renderGitHub();
		return this;
	},
	renderGitHub: function() {
		var el = $('<div id="GitHubRRBWidget" class="github-widget" data-repo="'+App.gitRepo()+'"></div>');
		App.renderGitHubWidget(el);
		$(this.el).append(el);
		return this;
	}
});
