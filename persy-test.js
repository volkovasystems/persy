const assert = require( "assert" );
const persy = require( "./persy.js" );

assert.equal( persy( "hello-world", { "hello": "world" }, true ), true, "should be true" );

persy( "yeah-world", { "yeah": "world" } )
	( function done( error, result ){
		assert.equal( result, true, "should be true" );
	} );

console.log( "ok" );
