define(
	'spell/shared/build/external/jarsigner',
	[
		'spell/shared/build/external/java',

		'fs',
		'os',
		'path',
		'child_process',
		'spell/shared/build/spawnChildProcess'
	],
	function(
		java,

		fs,
		os,
		path,
		child_process,
		spawnChildProcess
		) {
		'use strict'

		var getJarsignerPath = function( environmentConfig ) {
			return path.join( environmentConfig.jdkPath, 'bin', 'jarsigner' + ( os.platform() == 'win32' ? '.exe': '' ) )
		}

		return {
			checkPrerequisite: function( environmentConfig, successCb, failCb ) {
				var jarsignerPath = getJarsignerPath( environmentConfig )

				if( !fs.existsSync( jarsignerPath ) ) {
					failCb( 'Could not find jarsigner (jdk) in ' + jarsignerPath )
					return
				}

				successCb()
			},

			run: function( environmentConfig, argv, cwd, next ) {
				spawnChildProcess(
					getJarsignerPath( environmentConfig ),
					argv,
					java.getProcessEnv( environmentConfig ),
					true,
					next
				)
			}
		}
	}
)
