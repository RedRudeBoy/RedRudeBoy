var Track = function(data) {

    /* data = {
        artist :"",
        title: "",
        album: ""
    } */
    this.data = data;
    if (this.data !== undefined && this.data.artist && typeof this.data.artist != "object") {
        this.artist = new Artist({
            title:this.data.artist
        });
    }

    if (this.data !== undefined && this.data.album && typeof this.data.album != "object") {
        this.album = new Album({
            title:this.data.album
        });
    } else if (this.data !== undefined && typeof this.data.album == "object") {
        this.album = this.data.album;
    }

    this.getImage  = function() {
        if (this.album !== undefined && this.album.getImage() != "") {
            return this.album.getImage();
        }

        return this.artist.getImage();
    }

    this.getShortUrl = function(callback) {
        var url = this.getUrl()+"&redirect=false";
        console.log(url);
        $.ajax({
          url:url,
          complete: function(xhr,textstatus) {
            var url = xhr.responseText;
            url = url.replace("stage.toma.hk", "toma.hk");
            callback(url);
          }
        });
       
    }

    this.getUrl = function() {
        return "/?artist="+(this.artist.title)+"&title="+(this.data.title);
    }

    this.uuid = function(uuid) {
        this.data.uuid = uuid;
        if (this.li)
            this.li.attr("rel",uuid);
    }

    this.li = undefined;

    this.onComplete = function(data) {
        alert("finsihed: "+this.data.title);
    }

    this.onSuccess = function(data) {
        alert("found: "+this.data.title);
    }

    this.onError = function(data) {

    }

    this.cover = function() {
        return "http://ws.audioscrobbler.com/2.0/?method=artist.imageredirect&artist=" +encodeURIComponent( this.artist.title )+ "&autocorrect=1&size=largesquare&api_key=a81521f42db5b48e3a474f30d1c9814d";
    }

    this.renderSummary = function(parent) {
        if (typeof this.artist !== "object")
            this.artist = {title:this.artist};

        var img = this.cover();
        var li = $("<li class='cover'><a><img src='"+img+"'/><span class='details'><h3>"+this.data.title+"</h3><h4>"+this.artist.title+"</h4></a></li>")
        li.find("a").attr("href","http://toma.hk/?artist="+escape(this.artist.title)+"&title="+escape(this.data.title));
        li.attr("title", this.data.title + "<br/>" + this.artist.title);
        li.find("a").tooltip();
        li.css({
            width:137,
            height:137,
            display:'block',
            float:'left',
            position:"relative"
        })
        li.find('a img').css({
            width:"100%",
            height:"100%",
        })
        li.find("a *").css({
            color:'#fff',
            textOverflow:'ellipsis',
            fontSize:12,
            margin:0,
            padding:0
        })
        li.find('.details').css({
            position:'absolute',
            left:4,
            right:4,
            bottom:4,
            background:'rgba(0,0,0,0.3)',
            borderRadius:4,
            padding:5,
            textAlign:"center"
        })


        parent.append(li);
        return li;
    }

    this.render = function(parent) {
        this.li = $("<li rel='"+this.data.uuid+"' class='track-li'><a href='"+this.getUrl()+"' target='_blank' rel='tooltip' title='View track page' class='info'></a><div class=\"playlist-track\"><span class='cover'><img src='"+this.getImage()+"' /></span><span class='title'>" + this.data.title + "</span><span class='hide'> - </span><span class='artist'>" + this.data.artist + "</span></div><ul class=\"resultsList\"></ul></li>");
        var that = this;
        this.li.on("playing", function() {
            if ($('#album').length === 0) {
                $('.top #main_image').attr("src", that.cover());
                $('.top h1').html("<a href='"+that.getUrl()+"'>"+that.data.title+"</a>");
                $('.top h2').html("<a href='"+that.artist.getUrl()+"'>"+that.artist.title+"</a>");
            }
        })

        var aClicked = false;
        this.li.find("a").tooltip({placement:"bottom"}).click(function() {
            aClicked = true;
            var t = setTimeout(function(){
                aClicked = false;
            },100);
            console.log("a");
        });

        this.li.click(function(e) {
            if (aClicked) return;
            trackClicked($(this));
            return;
            $('ul.playlistTracks .playlist-track-playing').removeClass("playlist-track-playing");
            $(this).addClass("playlist-track-playing");
            $(this).find(".resultsList li:first-child").find('.small_resolver_icon').click();
        });
        parent.append(this.li);
    }

    this.resolve = function() {
        Tomahk.search({
            title: this.data.title,
            artist: this.data.artist,
            album: this.data.album,
            
        },this);
    };


    return this;
}