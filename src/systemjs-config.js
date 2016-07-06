(function (global) {
	// map tells the System loader where to look for things
	var map = {
		'app': 'app',
		'@angular': '../node_modules/@angular',
		'rxjs': '../node_modules/rxjs'
	};

	// packages tells the System loader how to load when no filename and/or no extension
	var packages = {
		'app': { main: 'bootstrap.js', defaultExtension: 'js' },
		'rxjs': { defaultExtension: 'js' }
	};

	var ngPackageNames = [
		'common',
		'compiler',
		'core',
		'platform-browser',
		'platform-browser-dynamic'
	];

	// Add package entries for angular packages
	ngPackageNames.forEach(function (pkgName) {
		packages['@angular/' + pkgName] = { main: "/bundles/" + pkgName + '.umd.js', defaultExtension: 'js' };
	});

	var config = {
		map: map,
		packages: packages
	};

	System.config(config);
})(this);