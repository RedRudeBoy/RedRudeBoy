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
window.App = {};
App.debug = true;
App.Views = {};
//App.Collections = {};
//App.Models = {};
$(document).ready(function() {
	App = new RedRudeBoyApp();
});
		</script>
		<? /* Backbone App */ ?>
		<script type="text/javascript" src="WindowView.js" charset="UTF-8"></script>
		<script type="text/javascript" src="MenuView.js" charset="UTF-8"></script>
		<script type="text/javascript" src="App.js" charset="UTF-8"></script>
	</head>
	<body>
	</body>
</html>
