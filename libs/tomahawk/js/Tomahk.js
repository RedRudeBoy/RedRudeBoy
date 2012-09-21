var playdarReady = false;

var Tomahk = {

    // The playlist url if this is a playlist
    jspfUrl: "",

    // an array of resolvers to process
    resolvers: [],

    // results
    results: {},

    // internal bookkeeping
    queries: {},
    queryProgress: {},

    listeners: {
        "resultAdded": [],
        "nextResolver": []
    },

    autoplay: false,

    addEventListener : function( eventName, callback )
    {
        for ( var i in this.listeners )
        {
            if ( eventName == i )
            {
                this.listeners[i].push( callback );
                break;
            };
        };
    },

    removeEventListener : function( type, fn )
    {
        if ( typeof this.listeners[type] != 'undefined' )
        {
            for ( var i = 0, l; l = thislisteners[type][i]; i++ )
            {
                if ( l == fn )
                    break;
            }
            this.listeners[type].splice( i, 1 );
        }
    },

    dispatchEvent : function( type, object )
    {
        if ( typeof this.listeners[type] != 'undefined' && this.listeners[type].length )
        {
            var array = this.listeners[type].slice();
            for ( var i = 0, l; l = array[i]; i++ )
            {
                l.apply( undefined, object );
            }
            return true;
        }

        return false;
    },

    init: function()
    {
        var that = this;
        Tomahk.currentUrl = window.location.href;

        Tomahawk.addTrackResults = function( data )
        {
            var uuid = data.qid;
            if ( that.queries[uuid] === undefined || that.queryProgress[uuid] === undefined )
            {
                console.log( "Got results added for track QID we're not waiting for: " + data.qid );
                return;
            }

            var resolver = that.resolvers[that.queryProgress[uuid].currentResolverIndex];

            if ( data["results"].length && data["results"][0] !== undefined )
            {
                that.addResult( uuid, data["results"][0], resolver );
            }
            else
            {
                //console.log( "No results for this resolver: " + resolver.settings.name );
            }
            that.nextResolver( uuid );
        };
    },

    // return the current resolver
    currentResolver: function()
    {
        return this.resolvers[Tomahk.currentResolverIndex];
    },

    // set the protocol url
    setProtocolUrl: function( url )
    {
        this.protocolUrl = url;
    },

    // get a git name from a string
    stringToGitName: function( name )
    {
        return name.toLowerCase().replace( ".", "" ).replace( " ", "" );
    },

    // called when ready
    ready: function()
    {
        if ( player.hasTomahawk )
        {
            $('body').removeClass( "no-tomahawk" );
        }
        else
        {
            $('body').addClass( "no-tomahawk" );
        }
    },

    // open the protocol url
    openTomahawk: function ( title, artist )
    {
        document.location.href = "tomahawk://play/track/?title=" + encodeURIComponent( title ) + "&artist=" + encodeURIComponent( artist );
    },

    openTomahawkPlaylist: function ()
    {
        document.location.href = "tomahawk://playlist/import/?jspf=" + encodeURIComponent( this.jspfUrl );
    },

    // open a url
    openUrl: function( url, newWindow )
    {
        if ( newWindow === undefined )
        {
            newWindow = true;
        }
        if ( newWindow )
        {
            window.open( url );
        }
        else
        {
            window.location = url;
        }
    },

    // perform the search
    search: function( track, object, ready )
    {
        var that = this;

        if ( ready !== true )
        {
            $(document).ready( function()
            {
                that.search( track, object, true );
            });
            return;
        }

        for ( i in track )
        {
            this[i] = track[i];
        }

        var uuid = this.uuid();
        if ( playdarReady === false )
        {
            $(document).bind( "playdarReady", function()
            {
                that.search( track, object );
            });
            return uuid;
        }
        if ( false && player.hasTomahawk && Playdar.client.is_authed() )
        {   
            Playdar.client.resolve( track.artist, track.title );
            return uuid;
        }
        if ( object )
            object.uuid( uuid );

        this.queries[ uuid ] = track;
        $('#searchResults').addClass( "visible" );
        this.nextResolver( uuid, object );

        return uuid;
    },

    // slide in an icon
    slideInIcon: function( id )
    {
        var width = $( "#searchAnimation" ).width()
        var obj = $( "#" + id );

        obj.css( "position", "relative" )
            .css( "left", width )
            .animate({ left: 0, }, 2000 );
    },

    resolverTimeout:undefined,

    // process the next resolver
    nextResolver: function( uuid, object )
    {
        clearTimeout(this.resolverTimeout);
        if ( uuid === undefined )
            return;

        if ( this.queryProgress[uuid] == undefined  )
            this.queryProgress[uuid] = { currentResolverIndex: -1 };

        // increment index
        this.queryProgress[uuid].currentResolverIndex++;
        var track = this.queries[uuid];
        // if there are not still left to do
        if ( this.queryProgress[uuid].currentResolverIndex >= this.resolvers.length )
        {
            // Tomahk.showSearchProgress();
            this.dispatchEvent( "nextResolver", [uuid, undefined] );
            if ( object && typeof object.onComplete === "function" )
                object.onComplete();

            return;
        }
        // get the current resolver
        var resolver = this.resolvers[this.queryProgress[uuid].currentResolverIndex];
        // resolve it
        var that = this;
        that.resolverTimeout = setTimeout(function() {
            
            if ($('#playlist').length == 0) {
                Tomahawk.addTrackResults({
                    results: [],
                    qid: uuid
                });
                //that.dispatchEvent( "nextResolver", [uuid, resolver, object] );
            }
        }, resolver.settings.timeout * 1000);
        resolver.resolve( uuid, track.artist, track.album, track.title, object );
         
        // show the progress to the user
        this.dispatchEvent( "nextResolver", [uuid, resolver, object] );
    },

    // get the icon of the resolver
    getResolverIconSrc: function ( resolver )
    {
        if ( resolver.settings !== undefined )
           return player.icon( resolver.settings.name );
        else
           return player.icon( resolver );
    },

    // add the resolver to be prcessed
    addResolver: function( resolver )
    {
        resolver.init();
        this.resolvers.push( resolver );
    },

    getCurrentResolverIndex: function( uuid )
    {
        return this.queryProgress[uuid] ? this.queryProgress[uuid].currentResolverIndex : 0;
    },

    getCurrentResolver: function( uuid )
    {
        if ( this.queryProgress[uuid] === undefined )
            return;

        return this.resolvers[this.queryProgress[uuid].currentResolverIndex];
    },

    addResult: function( uuid, result, resolver, object )
    {
        if ( uuid === undefined || result === undefined )
            return;

        var results = this.results[uuid] ? this.results[uuid] : [];
        results.push( { "resolver": resolver, "result": result } )
        this.results[uuid] = results;

        this.dispatchEvent( "resultAdded", [uuid, result, resolver, object] );
    },

    // get the first result for a certain uuid
    getResult: function( uuid, resolver )
    {
        if ( this.results[uuid] === undefined )
            return;

        var results = this.results[uuid];
        if ( results.length === 0 )
            return;

        if ( resolver !== undefined && resolver !== "" )
        {
            for( var i = 0; i < results.length; i += 1 )
            {
                if ( results[i].resolver.settings.name === resolver )
                    return results[i].result;
            }
        }

        return results[0].result;
    },

    uuid: function ()
    {
        var S4 = function()
        {
           return ( ( ( 1 + Math.random() ) * 0x10000 ) | 0 ).toString( 16 ).substring( 1 );
        };
        return ( S4() + S4() + "-" + S4() + "-" +S4() + "-" + S4() + "-" + S4() + S4() + S4() );
    }
}


Playdar.auth_details.receiverurl = "http://"+window.location.host+'/playdar_auth.html';


$(document).bind( "runplaydar", function()
{
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

            //console.log( "test" );
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
});


Playdar.USE_STATUS_BAR = false;
if (Playdar.client)
    Playdar.client.go();


$(document).on( "keypress", function( e )
{
    if ( $("input:focus").length > 0 )
        return true;

    if ( e.keyCode === 32 )
    {
        e.preventDefault();
        $('#cover').click();
    }
});


function getAverageRGB( imgEl )
{
    var blockSize = 5, // only visit every 5 pixels
        defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
        canvas = document.createElement( 'canvas' ),
        context = canvas.getContext && canvas.getContext( '2d' ),
        data, width, height,
        i = -4,
        length,
        rgb = {r:0,g:0,b:0},
        count = 0;

    if ( !context )
        return defaultRGB;

    height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

    context.drawImage( imgEl, 0, 0 );

    try
    {
        data = context.getImageData( 0, 0, width, height );
    }
    catch( e )
    {
        console.log( e );
        console.log( "error" );
        /* security error, img on diff domain */
        return defaultRGB;
    }

    length = data.data.length;

    while ( ( i += blockSize * 4 ) < length )
    {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i+1];
        rgb.b += data.data[i+2];
    }

    // ~~ used to floor values
    rgb.r = ~~(rgb.r / count);
    rgb.g = ~~(rgb.g / count);
    rgb.b = ~~(rgb.b / count);

    return rgb;
}
