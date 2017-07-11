
const assert = require( "assert" );
const fs = require( "fs" );
const persy = require( "./persy.js" );

assert.equal( persy( "test.json", { "hello": "world" }, true ), true, "should be true" );

fs.unlinkSync( "test.json" );

persy( "test.json", { "yeah": "world" } )
	( function done( error, result ){
		assert.equal( result, true, "should be true" );

		fs.unlinkSync( "test.json" );

		console.log( "ok" );
	} );
