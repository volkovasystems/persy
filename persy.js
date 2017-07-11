/*;
	@module-license:
		The MIT License (MIT)
		@mit-license

		Copyright (@c) 2017 Richeve Siodina Bebedor
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
			"contributors": [
				"John Lenon Maghanoy <johnlenonmaghanoy@gmail.com>"
			],
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
			"falzy": "falzy",
			"kept": "kept",
			"protype": "protype",
			"scrivi": "scrivi",
			"touche": "touche",
			"zelf": "zelf"
		}
	@end-include
*/

const calcify = require( "calcify" );
const falzy = require( "falzy" );
const kept = require( "kept" );
const protype = require( "protype" );
const scrivi = require( "scrivi" );
const touche = require( "touche" );
const zelf = require( "zelf" );

const JSON_FILE_PATTERN = /\.json$/;

const persy = function persy( path, object, synchronous ){
	/*;
		@meta-configuration:
			{
				"path:required": "string",
				"object:required": [
					"object",
					"string"
				],
				"synchronous": "boolean"
			}
		@end-meta-configuration
	*/

	if( falzy( path ) || typeof path != "string" ){
		throw new Error( "invalid path" );
	}

	if( falzy( object ) || !protype( object, OBJECT + STRING ) ){
		throw new Error( "invalid object" );
	}

	if( !JSON_FILE_PATTERN.test( path ) ){
		path = `${ path }.json`;
	}

	try{
		object = calcify( object );

	}catch( error ){
		throw new Error( `cannot stringify object, ${ error.stack }` );
	}

	if( synchronous === true ){
		try{
			if( !kept( path, true ) ){
				touche( path, true );
			}

			return scrivi( path, object, true );

		}catch( error ){
			throw new Error( `cannot persist json object, ${ error.stack }` );
		}

	}else{
		let catcher = kept.bind( zelf( this ) )( path )
			.then( function done( error, exist ){
				if( !exist ){
					return touche( path )( function done( error ){
						if( error instanceof Error ){
							return catcher.pass( new Error( `cannot persist json object, ${ error.stack }` ), false );
						}

						return scrivi( path, object )( function done( error, result ){
							if( error instanceof Error ){
								return catcher.pass( new Error( `cannot persist json object, ${ error.stack }` ), false );
							}

							return catcher.pass( null, true );
						} );
					} );
				}

				return scrivi( path, object )( function done( error, result ){
					if( error instanceof Error ){
						return catcher.pass( new Error( `cannot persist json object, ${ error.stack }` ), false );
					}

					return catcher.pass( null, true );
				} );
			} );

		return catcher;

	}
};

module.exports = persy;
