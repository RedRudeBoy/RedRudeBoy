EXAudioSwfUrl = "http://toma.hk/js/EXAudio/EXAudio.swf";
var exAudio = new EXAudio();

var qid = "";

if ( window.autoplay == undefined )
    var autoplay = false;


var playNextResolver = function()
{
    var resolverIcon = $('#cover .resolver').attr( "src" );
    $('#singleResultsList img[src="'+resolverIcon+'"]').parents( "li" ).next().find( "img" ).click();
}


var onResultAdded = function( uuid, result, resolver )
{
    if ( result === undefined )
        return;

    if ( result.track === undefined )
    {
        result.track = result.title;
    }

    window.embeddedAPI.resolverFound(resolver, result);

    if ( player.hasTomahawk && !$('#cover').hasClass("playable") & !Playdar.client.is_authed() )
    {
        $('#cover').addClass( "playable" );
        var img = "<img src='"+player.icon("tomahawk")+"' class='resolver' />";
        $('#cover').append( img );

        renderSingleIcon( uuid, "tomahawk", result.artist, result.track );

        if ( autoplay !== undefined && autoplay == true )
        {
            var t = setTimeout( function()
            {
                $('#cover a').click();
            }, 500 );
        }
    }

    if ( !$('#cover').hasClass( "playable" ) )
    {
        var img = "<img src='"+Tomahk.getResolverIconSrc( resolver )+"' class='resolver' />";
        $('#cover').append( img );
        if ( autoplay !== undefined && autoplay == true )
        {
            var t = setTimeout( function()
            {
                $('#cover a').click();
            }, 500 );
        }
    }
    $('#cover').addClass( "playable" );
    if ( resolver.settings !== undefined )
        renderSingleIcon( uuid, resolver.settings.name, result.artist, result.track );
    else
        renderSingleIcon( uuid, resolver, result.artist, result.track, result );
};


var onNextResolver = function( uuid, resolver )
{
  //  console.log( uuid );
    var pct = ( ( Tomahk.getCurrentResolverIndex( uuid ) + 1 ) / Tomahk.resolvers.length ) * 100.0;
    pct = pct > 100 ? 100 : pct;

    $( "#searchBar" ).animate(
      {
        width: pct + "%",
      }, 600 );

    var status = $('#searchStatus');
    var resolver = Tomahk.getCurrentResolver( uuid );

    if ( Tomahk.getCurrentResolverIndex( uuid ) >= Tomahk.resolvers.length || resolver === undefined )
    {
        return status.html( "Finished Searching" );
    }

    var id = "img" + Tomahk.stringToGitName( resolver.settings.name );
    var icon = $('<img title="'+resolver.settings.name+'" class="resolver-icon" id="'+id+'" src="'+Tomahk.getResolverIconSrc( resolver )+'" />');

    icon.tooltip( {placement:"bottom"} );
    status.html( "Searching " + resolver.settings.name );
    $('#searchAnimation').append( icon );
    Tomahk.slideInIcon( id );
};


// render a single icon in the player section
var renderSingleIcon = function ( uuid, resolverName, artist, track, result )
{
    $( "#img" + Tomahk.stringToGitName( resolverName ) ).addClass( "active" );
    var entry = $("<li>"+
        "<a class='small_resolver_icon' data-resolver='"+resolverName+"' data-uuid='"+uuid+"' title=''>"+
            "<span class='artist'>"+artist+"</span>"+
            "<span class='title'>"+track+"</span>"+
            "<span class='resolver-icon'><img src='"+player.icon( resolverName )+"'></span>"+
            "<span class='resolver'>["+resolverName+"]</span>"+
        "</a></li>");
    entry.find('a').attr("title", artist+"<br/>"+track+"<br/>"+resolverName).tooltip( {placement:"bottom"} );
    $('#singleResultsList').append( entry );
    entry.find(".small_resolver_icon").click( function( e )
    {
        var resolver = $(this).data( "resolver" );
        e.preventDefault();
        var inApp = (resolver === "tomahawk" ) ? true : false;
        var uuid = $(this).data( "uuid" );

        player.play( uuid, inApp, resolver, result );
    });
};


playdarReady = false;
Playdar.auth_details.receiverurl = "http://"+window.location.host+'/playdar_auth.html';

Playdar.setupClient(
{
    onStat: function( status )
    {
        if ( status )
        {
            if ( !status.authenticated )
            {
                //$('#status').html(Playdar.client.get_auth_link_html('Connect to Tomahawk'));
            }
            player.setTomahawkInstalled();
            //player.showLogin();
        }

        playdarReady = true;
        $(document).trigger( "playdarReady" );

        Tomahk.ready();
    },
    onAuth: function ()
    {
        //window.location.reload();
        // At this point, we can query the Playdar API for a track and start polling for matches.
        //Playdar.client.resolve(track.artist, track.title);
    },
    onResults: function ( response, lastPoll )
    {
        console.log( 'Polling ' + response.qid );
        if ( lastPoll )
        {
            // Take a look at the final response.
            console.dir( response );
            if ( response.results.length > 0 )
            {
                for ( var i = 0; i < response.results.length; i++ )
                {
                    player.playdarResponses[response.results[i].sid] = response.results[i];
                    Tomahk.addResult( response.results[i].sid, response.results[i], response.results[i].source );
                }

                renderSingleIcon( "meh"+response.qid, "tomahawk", response.query.artist, response.query.track );
            }
        }
    }
});

Playdar.USE_STATUS_BAR = false;
Playdar.client.go();

Tomahk.addEventListener( "resultAdded", onResultAdded );
Tomahk.addEventListener( "nextResolver", onNextResolver );

$(document).ready( function()
{
    $('[rel="tooltip"]').tooltip( {placement:"bottom"} );

    Tomahk.init();

    var cover = $('#cover');
    cover.find('a').click( function()
    {
        if ( cover.hasClass( "playing" ) )
        {
            cover.removeClass( "playing" );
            player.pause();
            cover.addClass( "paused" );
        }
        else {
            if ( cover.hasClass( "paused" ) )
            {
                cover.removeClass( "paused" );
                cover.addClass( "playing" );
                player.unpause();
                return;
            }

            var index = 0;
            var resolverImage = $('#cover .resolver').attr( "src" );
            var i = 0;
            $('#singleResultsList a').each( function()
            {
                if ( resolverImage === $(this).find( "img" ).attr( "src" ) )
                {
                   $(this).click();
                }
            });
        }
    });
});
