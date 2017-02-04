const persy = require( "./persy.js" );

persy( "hello-world", { "hello": "world" }, true );

persy( "yeah-world", { "yeah": "world" } )
	( function done( ){
		console.log( arguments );
	} );
