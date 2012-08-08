<!DOCTYPE html>
<html>
	<head>
		<title>RedRudeBoy</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<? /* JavaScript Libs */ ?>
		<script type="text/javascript" src="libs/jquery/jquery-1.7.2.min.js" charset="UTF-8"></script>
		<script type="text/javascript" src="libs/underscore/underscore-min.js" charset="UTF-8"></script>
		<script type="text/javascript" src="libs/backbone/backbone-min.js" charset="UTF-8"></script>
		<? /* App init */ ?>
		<script type="text/javascript">
//declare the vars where all the classes are gonna be
window.Models = new Object();
window.Collections = new Object();
window.Views = new Object();

$(document).ready(function() {
	window.App = new RedRudeBoyApp({
		debug: true
	});
});
		</script>
		<? /* Backbone App */ ?>
		<script type="text/javascript" src="WindowView.js" charset="UTF-8"></script>
		<script type="text/javascript" src="MenuView.js" charset="UTF-8"></script>
		<script type="text/javascript" src="App.js" charset="UTF-8"></script>
		<? /* Less Styles (for compile in CSS use: libs/bin/lessc styles.less > styles.css) */ ?>
		<link rel="stylesheet/less" type="text/css" href="WindowView.less">
		<link rel="stylesheet/less" type="text/css" href="MenuView.less">
		<link rel="stylesheet/less" type="text/css" href="App.less">
		<script src="libs/dist/less-1.3.0.min.js" type="text/javascript"></script>
	</head>
	<body>
	</body>
</html>
