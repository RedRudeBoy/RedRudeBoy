var Album = function(data) {
	var album = {
		title: "",
		img: undefined,
		artist: undefined,
		getImage: function() {
			if (this.img === undefined) {
				if (this.artist !== undefined) {
					this.img = this.artist.getImage();
				}
			}
			return this.img;
		},
		getUrl: function() {
			return "/album/"+encodeURIComponent(this.artist.title)+"/"+encodeURIComponent(this.title);
		},
		playlist: undefined,

		renderSummary: function(parent) {
			var element = "<li class='cover'><a href='"+this.getUrl()+"'><img src='"+this.getImage()+"'/><span class='details'><h3>"+this.title+"</h3><h4>"+this.artist.title+"</h4></span></a></li>";
      		element = $(element);
      		element.css("display","none");

      		var img = element.find("img");
      		
      		img.on("load", function() {
      			element.css("display","block");
      		});
      		if (img[0].complete) {
      			element.css("display","block");
      		}
			element.attr("title", this.title+"<br/>"+this.artist.title);
	        parent.append(element);	

	        fadeImages(element)
		},
		renderCover: function(element) {
			if (element === undefined) {
				element = $('#cover a img');
			}
			element.attr("src", this.getImage());

		},
		renderTracks: function(element) {

			var that = this;
			if (this.playlist === undefined) {
				this.fetchInfo(function(playlist) {
					playlist.render(element);
					that.resolve();
					that.renderCover();



				});
			} else {
				this.playlist.render(element);
				this.resolve();
				this.renderCover();
				
			}
		},
		resolve: function() {
			this.playlist.resolve();
		},
		tomahawkUri: function() {
			return "tomahawk://view/album?artist="+encodeURIComponent(this.artist.title)+"&name="+encodeURIComponent(this.title);
		},
		notFound: function() {
			$('#requiresTomahawk .tomahawk-uri').attr("href", this.tomahawkUri());
			$('#requiresTomahawk').modal()
		},
		fetchInfo: function(callback) {
			var url = "http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=b25b959554ed76058ac220b7b2e0a026&artist="+(this.artist.title)+"&album="+(this.title)+"&format=json";
			var that = this;
			$.getJSON(url, function(data){
				if (data.message === "Album not found") {
					var playlist = new Playlist();
					playlist.title = that.title;
					playlist.creator = that.artist.title;
					that.playlist = playlist;
					callback(playlist);	
					that.notFound();
				} else {

					that.img = data.album.image[data.album.image.length - 1]['#text'];
					if (data.album.tracks !== undefined && data.album.tracks.track !== undefined) {
						for (var i = 0; i < data.album.tracks.track.length; i++) {
							var track = new Track();
						}
						var playlist = new Playlist();
						playlist.title = that.title;
						playlist.creator = that.artist.title;
						playlist.addTracks(data.album.tracks.track, "lastfm", that);
						that.playlist = playlist;
						callback(playlist);
					}else {
						var playlist = new Playlist();
						playlist.title = that.title;
						playlist.creator = that.artist.title;
						that.playlist = playlist;
						callback(playlist);	
						that.notFound();
					}
				}
			})
		}
	}

	for (i in data) {
		album[i] = data[i];
	}

	if (typeof album.artist !== "object") {
		album.artist = new Artist({title:album.artist});
	}


	return album;
}