var Playlist = function() {

	var playlist = {
		title: "",
		creator: "",
		tracks: [],

		addTrack: function(title, artist, album) {
			var track = new Track({
				title:title,
				artist:artist,
				album:album
			});


			this.tracks.push(track);
		},

		saveForm: function() {
			var html = "<form action='http://toma.hk/' method='post'>";
			for (var i = 0; i < this.tracks.length;i++) {
				html += "<input type='hidden' name='artists[]' value='"+this.tracks[i].artist.title+"'/>";
				html += "<input type='hidden' name='tracks[]' value='"+this.tracks[i].title+"'/>";
			}
			html += "<input type='text' name='title' placeholder='Playlist Title' />";
			html += "<input type='text' name='creator' placeholder='Your Name' />";

			html += "<button type='submit'>Save Playlist</button>";
		},

		addTracks: function(tracks, source, album) {
			for (var i = 0; i < tracks.length;i++) {
				if (source == "lastfm") {
					this.addTrack(tracks[i].name, tracks[i].artist.name, album);
				} else {
					this.addTrack(tracks[i].title, tracks[i].artist, tracks[i].album);
				}
			}
		},

		resolve: function() {
			for (var i = 0; i < this.tracks.length; i++) {
				this.tracks[i].resolve();
			}
		},

		render: function(element) {
			if (typeof element !== "object") {
				element = $(element);
			}

			for (var i = 0;i<this.tracks.length;i++) {
				this.tracks[i].render(element);
			}

			if (this.tracks.length === 0) {
				element.parents("section").hide();
			}
			


		},

	}

	return playlist;
}
