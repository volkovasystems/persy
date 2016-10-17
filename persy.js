/*;
	@module-license:
		The MIT License (MIT)
		@mit-license

		Copyright (@c) 2016 Richeve Siodina Bebedor
		@email: richeve.bebedor@gmail.com

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	@end-module-license

	@module-configuration:
		{
			"package": "persy",
			"path": "persy/persy.js",
			"file": "persy.js",
			"module": "persy",
			"author": "Richeve S. Bebedor",
			"eMail": "richeve.bebedor@gmail.com",
			"repository": "https://github.com:volkovasystems/persy.git",
			"test": "persy-test.js",
			"global": true
		}
	@end-module-configuration

	@module-documentation:
		Persist JSON object.

		JSON file must be existing.
		JSON object must not be empty.

		This will replace contents of JSON file.
	@end-module-documentation

	@include:
		{
			"calcify": "calcify",
			"empt": "empt",
			"scrivi": "scrivi",
			"zelf": "zelf"
		}
	@end-include
*/

var calcify = require( "calcify" );
var empt = require( "empt" );
var scrivi = require( "scrivi" );
var zelf = require( "zelf" );

var persy = function persy( path, object, synchronous ){
	/*;
		@meta-configuration:
			{
				"path:required": "string",
				"object:required": "object",
				"synchronous": "boolean"
			}
		@end-meta-configuration
	*/

	if( typeof path != "string" ){
		throw new Error( "invalid path" );
	}

	if( !path ){
		throw new Error( "no given path" );
	}

	if( typeof object != "object" ){
		throw new Error( "invalid object" );
	}

	if( !object ){
		throw new Error( "no given object" );
	}

	if( empt( object ) ){
		throw new Error( "empty object" );
	}

	if( !( /\.json$/ ).test( path ) ){
		path = path + ".json";
	}

	try{
		object = calcify( object );

	}catch( error ){
		throw new Error( "error transforming object, " + error.message );
	}

	return scrivi.bind( zelf( this ) )( path, object, synchronous );
};

module.exports = persy;
