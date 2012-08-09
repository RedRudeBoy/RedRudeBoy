RedRudeBoy Webpage
==================
For now, this repository is only for test git
I will create my website using backbone, the web will be very lame... the interesting part is the architecture of the software


Roadmap / @todo
---------------
* WindowView: create a WindowManager with an WindowPageView (SinglePage), WindowItemView (item) & WindowIframeView(item-iframe/extern) ¿grid system?
* MenuView: add minified, media manager/player, searcher & WindowManagerGUI
* Add info of the software in package.json (or composer.json)
* Add Restaurant, Multifinestra, Live Statistics & wheather plugin with windowItemView
* Providers / Showers: create MediaManagerCollection & MediaManagerView
* Code WYSIWYG
* Proxy
* W3C validator? Add images of libs I use?

Useful documentation
--------------------
### For add submodules [git-scm]
	git submodule add git@github.com:schacon/rack.git rack
### For clone & start submodules (backbone, underscore, less)
	git submodule update --init
(jQuery doesn't have the compiled files in the repo, so I copy only the files)

[git-scm]: http://git-scm.com/book/en/Git-Tools-Submodules
