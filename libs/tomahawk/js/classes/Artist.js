var Artist = function(data) {
	
	var artist = {	
		title: "",
		img:"",
		els: {
			songs: "#playlistcontainer .playlistTracks",
			relatedArtists: "#relatedArtists .relatedArtists",
			albums: "#albums .albums"
		},
		getUrl: function() {
			return "/artist/"+encodeURIComponent(this.title);
		},
		getImage: function() {
			if (this.title === undefined) { return ""; }
        	return "http://ws.audioscrobbler.com/2.0/?method=artist.imageredirect&artist=" +encodeURIComponent( this.title.replace('\'','') )+ "&autocorrect=1&size=largesquare&api_key=a81521f42db5b48e3a474f30d1c9814d";
		},
		init: function() {
			for (i in this.els) {
				this.els[i] = $(this.els[i]);
			}
		},
		renderSongs: function() {
			var that = this;
			that.topTracks(function(tracks) {
				var playlist = new Playlist();
				playlist.addTracks(tracks, "lastfm");
				playlist.render(that.els.songs);

				playlist.resolve();

				var i = 0;
				var t = setTimeout(function() {
					that.els.songs.find(".playlist-track").parent().each(function() {
						var $this = $(this);
						if (i >= 10) {
							$this.hide();
						}
						that.els.songs.bind("expand", function() {
							$this.show();
						});
						i++;
					});

					if (that.els.songs.find(".playlist-track").length > 10) {
						var li = $("<li class='btn btn-success'>Click here to view "+(that.els.songs.find(".playlist-track").length-10)+" other songs.</li>")
						li.click(function() {
							li.remove();
							that.els.songs.trigger("expand");
						})
						that.els.songs.append(li)
					}

				}, 500);


			})
		},
		renderTrack: function(track){

		},
		renderAlbums: function() {
			var that = this;
			this.topAlbums(function(albums) {

				if (albums === undefined) albums = {
					length:0
				};
			
				for (var i = 0; i< albums.length; i++) {

					if (albums[i].name !== that.title) {
						var album = new Album({
							title: albums[i].name,
							img: albums[i].image[albums[i].image.length-1]['#text'],
							artist:that
						});
						album.renderSummary(that.els.albums);
					}
				}
				if (albums.length === undefined) {
					var img = this.getImage();
					var img = albums.image[albums.image.length-1]['#text'];
					var album = new Album({
						title: albums.name,
						img: img,
						artist:that
					});
					album.renderSummary(that.els.albums);	
				}

				fadeImages();

				if (albums.length === 0 || albums === undefined) {
					that.els.albums.parents('section').hide();
				}

			})
		},
		renderRelatedArtists: function(element) {
			if (element === undefined) {
				element = this.els.relatedArtists;
			}
			var that = this;
			that.relatedArtists(function(artists) {
				var max = 10;
				for (var i = 0;i<artists.length;i++) {
					if (i >= max) break;

					var artist = new Artist({
						title: artists[i].name
					});
					artist.renderSummary(element);
				}
				fadeImages();

			})
		},
		renderSummary: function(parent) {
			var element = "<li class='cover'><a href='"+this.getUrl()+"'><img src='"+this.getImage()+"'/><span class='details'><h3>"+this.title+"</h3></span></a></li>";
			element = $(element);
			element.attr("title", this.title);
			element.tooltip();
			parent.append(element);

		},
		renderMain: function() {
			this.renderSongs();
			this.renderRelatedArtists();
			this.renderAlbums();

		},

		topAlbums: function(onSuccess) {
			var url = "http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist="+this.title+"&api_key=a81521f42db5b48e3a474f30d1c9814d&format=json";
			$.getJSON(url, function(data){
                
                onSuccess(data.topalbums.album);
            });	

		},

		topTracks: function(onSuccess) {
			$.getJSON("http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist="+this.title+"&api_key=a81521f42db5b48e3a474f30d1c9814d&format=json", function(data){
                onSuccess(data.toptracks.track);
            });	
		},
		relatedArtists: function(onSuccess) {
			$.getJSON("http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist="+this.title+"&api_key=a81521f42db5b48e3a474f30d1c9814d&format=json", function(data){
                onSuccess(data.similarartists.artist);
            });
		},

	}
	for (i in data) {
		artist[i] = data[i];
	}
	artist.init();




	return artist;
}