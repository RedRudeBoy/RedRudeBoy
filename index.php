<!DOCTYPE html>
<html>
	<head>
		<?php /* @todo: Info tags created in App.init */ ?>
		<title>RedRudeBoy</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<meta charset="utf-8">
		<meta name="description" content="RedRudeBoy,Leninux,Arnau-Lenin,JamaicaSka">
		<meta name="author" content="RedRudeBoy" />
		<?php /* JavaScript Libs */ ?>
		<script type="text/javascript" src="libs/jquery/jquery-1.7.2.min.js" charset="UTF-8"></script>
		<script type="text/javascript" src="libs/underscore/underscore-min.js" charset="UTF-8"></script>
		<script type="text/javascript" src="libs/backbone/backbone-min.js" charset="UTF-8"></script>
		<script type="text/javascript" src="https://raw.github.com/JoelSutherland/GitHub-jQuery-Repo-Widget/master/jquery.githubRepoWidget.min.js"></script>
		<?php /* App init */ ?>
		<script type="text/javascript">
//declare the vars where all the classes are gonna be
window.App = new Object();
App.Models = new Object();
App.Collections = new Object();
App.Views = new Object();

$(document).ready(function() {
	
	_.extend(App,new RedRudeBoyApp({
		debug: true
	}));
	App.initApp();
});
		</script>
		<?php /* Backbone App */ ?>
		<script type="text/javascript" src="menuItems.json"></script>
		<script type="text/javascript" src="MenuItem.js" charset="UTF-8"></script>
		<script type="text/javascript" src="Menu.js" charset="UTF-8"></script>
		<script type="text/javascript" src="MenuView.js" charset="UTF-8"></script>
		<script type="text/javascript" src="WindowView.js" charset="UTF-8"></script>
		<script type="text/javascript" src="App.js" charset="UTF-8"></script>
		<?php /* Less Styles (for compile in CSS use: libs/bin/lessc styles.less > styles.css) */ ?>
		<link rel="stylesheet/less" type="text/css" href="WindowView.less">
		<link rel="stylesheet/less" type="text/css" href="MenuView.less">
		<link rel="stylesheet/less" type="text/css" href="App.less">
		<script src="libs/less/dist/less-1.3.0.min.js" type="text/javascript"></script>
	</head>
	<body>
	</body>
</html>
