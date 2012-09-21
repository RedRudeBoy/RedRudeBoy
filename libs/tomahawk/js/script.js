/* Author: 

*/






(function($) {




	var echonest = {
		api_key: "",
		getSuggestedNames: function(name, callback) {
			$.getJSON("http://developer.echonest.com/api/v4/artist/suggest?api_key=GPQCPTGUIZ43M2FSV&name="+name+"&results=8", function(data){
				callback(data);
			});
		},

		getSuggestedTracks: function(artist, callback) {
			$.getJSON("http://developer.echonest.com/api/v4/artist/suggest?api_key=GPQCPTGUIZ43M2FSV&name="+artist+"&results=8", function(data){
				if (data.response.artists[0] != undefined) {
					var id = data.response.artists[0].id;
					$.getJSON("http://developer.echonest.com/api/v4/artist/songs?api_key=GPQCPTGUIZ43M2FSV&id="+id+"&format=json&start=0&results=100", function(data) {
						callback(data);
					});
				}
			});
		}
	}

        var lastfm = {

            getSuggestedTracks: function(artist, callback) {
                    $.getJSON("http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist="+artist+"&api_key=a81521f42db5b48e3a474f30d1c9814d&format=json", function(data){
                        callback(data);
                    });
            },

            getImages: function(artist) {
                return "http://ws.audioscrobbler.com/2.0/?method=artist.imageredirect&artist="+escape( artist )+"&autocorrect=1&size=largesquare&api_key=a81521f42db5b48e3a474f30d1c9814d";
            },

            setBG: function(artist) {
                return;

                var src = this.getImages(artist);
                var $img = $('<img/>');

                function resizeBG() {
                	if ($(window).width() > $(window).height()) {
	                    $img.width($(window).width());
	                    if ($img.height() > $(window).height()) {
	                        $img.css('margin-top',($(window).height() - $img.height()) / 2)
	                    }
                	} else {
                		$img.height($(window).height());
	                    if ($img.width() > $(window).width()) {
	                        $img.css('margin-left',($(window).width() - $img.width()) / 2)
	                    }
                	}
                }

                $img.load(function() {
                    $img.addClass('loaded');
                    resizeBG();
                });
                resizeBG();
                $img.addClass("bg");
                $img.attr("src", src);
                $('body').append($img);

            }
        }

	function getArtistImage(artist) {
		return "http://ws.audioscrobbler.com/2.0/?method=artist.imageredirect&artist="+escape(artist)+"&autocorrect=1&size=largesquare&api_key=a81521f42db5b48e3a474f30d1c9814d";
	}

	function setArtistImage(artist) {
		var src = getArtistImage(artist);
		$('.stage #artistThumb').load(function() {
			$(this).animate({opacity:0.8});
		}).attr("src",src);
	}

	function setBG() {
		var src = "/img/bg/15_m_backstreet.jpg";

		var $credit = $('<a id="credit" href="http://www.flickr.com/photos/10563720@N03">Photo: Abe and Liina Novy</a>');
		$('body').append($credit);

		var $img = $('<img/>');

		function resizeBG() {
			$img.width($(window).width());
			if ($img.height() > $(window).height()) {
				$img.css('margin-top',($(window).height() - $img.height()) / 2)
			}
		}

		$img.load(function() {
			$img.addClass('loaded');
			resizeBG();
		})
		$img.addClass("bg");
		$img.attr("src", src);
		$('body').append($img);
	}

	if ($('#splash').length > 0)
		setBG();


	function setupInputLabels() {

		$('input').focus(function() {
			var $this = $(this);
			$this.parent().addClass("focus");
			$('label[for="'+$this.attr("id")+'"]').hide();
		}).blur(function(){
			var $this = $(this);
			if ($this.val() === "") {
			$this.parent().removeClass("focus");
				if ($this.val() === "")
					$('label[for="'+$this.attr("id")+'"]').show();
			}
		})
	}

	setupInputLabels();

	function splash() {
		var first = $('.stage#first');
		var second = $('.stage#second');
		var form = $('#splash form');
		var first_input = first.find("input");

		form.submit(function(e) {
			if (second.find('input').val() === "") {
				e.preventDefault();
			}

		})

		$(document).ready(function() {
			var t = setTimeout(function() {
				first.css('margin-left', -$(window).width())
				first.animate({'margin-left':-350}, 500);
			}, 1000);
		})

		first.find('.button').click(function(e) {
			if (first.find('input').val() != "") {
				$('h1').html("Now, name one of their tracks");
				$('#suggestions .artists').empty().css("display","none");
				setArtistImage(first_input.val());
				first.addClass('done');
				//first.animate({'margin-top':0}, 1000);
				var t = setTimeout(function() {


					second.css('margin-left', -$(window).width())
					second.animate({'margin-left':-350}, 500, null, function() {
						second.find("input").focus();
						$('#suggestions .tracks').css("display","block").css('opacity',0).fadeIn().css("display","block");
						display_track_suggestions(first_input.val());

					});
				}, 400);
				//second.addClass('active');
			}
			e.preventDefault();
		});

		first.find('input').keypress( function ( e )
		{
                    // enter key
                    if ((e.keyCode == 13))
                    {
                        e.preventDefault();
                        first.find('.button').click();
                        return false;
                    }
                });

		var suggestedSongs;

		function suggest_tracks_from_string(string) {
			var possibleSongs = [];
			$('#suggestions .artists').empty().hide();
			$('#suggestions .tracks').empty();
			for (var i=0; i< suggestedSongs.length;i++) {
                    
				if (suggestedSongs[i].name.indexOf(string) > -1) {
					possibleSongs.push(1);
					displaySingleTrackSuggestion(suggestedSongs[i].name);
				}

			}
			$('#suggestions .tracks').css("opacity",0).css("display","block").fadeIn();
		}

		var tabindex = 7;

		function displaySingleTrackSuggestion(title) {
			title = title.replace(/ *\([^)]*\) */g, "");
			tabindex++;
			var $li = $("<li><a href='#' tabindex='"+tabindex+"'><span class='name'>"+title+"</span></a></li>");
			$li.find("a").click(function() {
				second.find("input").val($(this).find(".name").html());
				second.find('.button').click();
				return false;
			})

			$('#suggestions .tracks').append($li);
		}

		function display_track_suggestions(artist) {
/*			echonest.getSuggestedTracks(artist, function(data) {
				suggestedSongs = data.response.songs;

				console.log(data);
				$('#suggestions .tracks').empty();

				for (var i = 0; i < 8; i++) {
					if (data.response.songs[i] === undefined) {
						return;
					}
					displaySingleTrackSuggestion(data.response.songs[i].title);
				}
			});*/

                        lastfm.getSuggestedTracks(artist, function(data) {
                                suggestedSongs = data.toptracks.track;

                                console.log(data);
                                $('#suggestions .tracks').empty();

                                for (var i = 0; i < 8; i++) {
                                        if (data.toptracks.track[i] === undefined) {
                                                return;
                                        }
                                        displaySingleTrackSuggestion(data.toptracks.track[i].name);
                                }
                        });
		}

		function display_suggestions(artist) {
			echonest.getSuggestedNames(artist, function(data) {
				$('#suggestions .artists').empty();

				for (var i = 0;i<data.response.artists.length;i++) {
					var tabindex = 2+i;
					var $li = $("<li><a href='#' tabindex='"+tabindex+"'><span class='image'><img src='"+getArtistImage(data.response.artists[i].name)+"'/></span><span class='name'>"+data.response.artists[i].name+"</span></a></li>");
					$li.find("a").click(function() {
						first_input.val($(this).find(".name").html());
						first.find('.button').click();

						return false;
					})

					$('#suggestions .artists').append($li);
				}
			});
		}

                first_input.keyup( function ( e )
                {
                    //alert(e.keyCode);
                    if ( e.keyCode == 9 )
                    {
                        // focus from tab
                        e.preventDefault();
                        first.find('.button').click();
                    }
                    else
                    {
                        display_suggestions( first_input.val() );
                    }
                });

                second.find('input').keyup( function ( e )
                {
                    //alert(e.keyCode);
                    if ( e.keyCode == 13 )
                    {
                        // enter key
                        form.submit();
                    }
                    else if ( e.keyCode == 9 )
                    {
                        // focus from tab
                        e.preventDefault();
	        	first.find('.button').click();
                    }
                    else
                    {
                        suggest_tracks_from_string( $(this).val() );
                    }
                });
        }

        splash();



})(jQuery);
