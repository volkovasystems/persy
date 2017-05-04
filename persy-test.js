const assert = require( "assert" );
const persy = require( "./persy.js" );

assert.ok( persy( "hello-world", { "hello": "world" }, true ) );

persy( "yeah-world", { "yeah": "world" } )
	( function done( ){
		console.log( arguments );
	} );

console.log( "ok" );
