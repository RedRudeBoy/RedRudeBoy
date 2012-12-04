RedRudeBoy Webpage
==================
I will create my website using backbone & less, the web is very simple... the interesting part is the architecture of the software


Roadmap / @todo
---------------
* WindowManager: A collection of WindowViews, WindowManagerGUI, ¿grid system?
	* WindowView: has one of this instances:
		* WindowPageView (SinglePage)
		* WindowItemsView (Collection of items)
		* WindowIframeView (item-iframe/extern)
* MenuView: add minify/transparency support
* MenuItem: Add Restaurant, Multifinestra, Live Statistics & wheather plugin from jamaicaska.es
Nexts Steps:
* Item/Box/webElement/wEl: Model & View, save/load a to file
	* TextBox
	* Image
	* Menu
	* Media (See below)
	* Ajaxplorer, apis...
* Media: (Is important to separate the Providers & the Showers)
	* MediaModel: images, musics, video... with a getHead function with a URI, type, description, thumbnail...
	* MediaCollection: a list of models, with Save&Load.
	* MediaManager: a collection of all the models? Ajax requests...
	* MediaView: one global? one for each media type? 
	* MediaPlayer: the functional part, speak with events
Future:
* Searcher
* Translate
* MemoryManager
* Proxy?
Others:
* Add info of the software in package.json (or composer.json), and in App.js take the info from there
* W3C validator? Add images of libs I use?
* RequireJS? AMD modules?
* Code with an WYSIWYG?

Useful documentation
--------------------
### For clone & start submodules (backbone, underscore, less)
	git submodule update --init
(jQuery doesn't have the compiled files in the repo, so I only copy the important files)

### [For add submodules] [git-scm]
	git submodule add git@github.com:schacon/rack.git rack

### [Backbone can generate Memory Leaks] [chaplin-leaks]

[git-scm]: http://git-scm.com/book/en/Git-Tools-Submodules
[chaplin-leaks]: https://github.com/chaplinjs/chaplin/tree/4a7c2f598db57bb2f3e45e77500a8071f5abd09c#memory-management-and-object-disposal