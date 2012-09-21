$(document).ready( function()
{
    var mp3Only = true;
    try
    {
        var fo = new ActiveXObject( 'ShockwaveFlash.ShockwaveFlash' );
        if ( fo )
            mp3Only = false;
    }
    catch( e )
    {
        if ( navigator.mimeTypes["application/x-shockwave-flash"] != undefined )
            mp3Only = false;
    }


    try { Tomahk.addResolver( SoundcloudResolver ); } catch ( e ) { console.log( e ); }
    try { Tomahk.addResolver( OfficialfmResolver ); } catch ( e ) { console.log( e ); }
    try { Tomahk.addResolver( LastfmResolver ); } catch ( e ) { console.log( e ); }
    try { Tomahk.addResolver( JamendoResolver ); } catch ( e ) { console.log( e ); }
    if ( !mp3Only )
    {
        try { Tomahk.addResolver( YoutubeResolver ); } catch ( e ) { console.log( e ); }
        try { Tomahk.addResolver( RdioResolver ); } catch ( e ) { console.log( e ); }
    }
    try { Tomahk.addResolver( SpotifyMetadataResolver ); } catch ( e ) { console.log( e ); }
    try { Tomahk.addResolver( DeezerResolver ); } catch ( e ) { console.log( e ); }
    try { Tomahk.addResolver( ExfmResolver ); } catch ( e ) { console.log( e ); }
//    try { Tomahk.addResolver( DilandauResolver ); } catch ( e ) { console.log( e ); }
});



