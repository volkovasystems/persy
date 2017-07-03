const assert = require( "assert" );
const persy = require( "./persy.js" );

assert.equal( persy( "hello-world", { "hello": "world" }, true ), true, "should be true" );

persy( "yeah-world", { "yeah": "world" } )
	( function done( error, result ){
		console.log( arguments );
	} );

console.log( "ok" );
