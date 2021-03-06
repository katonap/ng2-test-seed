Error.stackTraceLimit = Infinity;

__karma__.loaded = function () { };

function isJsFile(path) {
	return path.slice(-3) == '.js';
}

function isSpecFile(path) {
	return path.slice(-8) == '_test.js';
}

function isBuiltFile(path) {
	var builtPath = '/base/built/';
	return isJsFile(path) && (path.substr(0, builtPath.length) == builtPath);
}

var allSpecFiles = Object.keys(window.__karma__.files)
	.filter(isSpecFile)
	.filter(isBuiltFile);

// Load our SystemJS configuration.
System.config({
	baseURL: '/base'
});

System.config({
	map: {
		'app': 'built',
		'@angular/common': 'node_modules/@angular/common/bundles/common.umd.js',
		'@angular/compiler': 'node_modules/@angular/compiler/bundles/compiler.umd.js',
		'@angular/core': 'node_modules/@angular/core/bundles/core.umd.js',
		'@angular/forms': 'node_modules/@angular/forms/bundles/forms.umd.js',
		'@angular/platform-browser': 'node_modules/@angular/platform-browser/bundles/platform-browser.umd.js',
		'@angular/platform-browser-dynamic': 'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',

		'@angular/common/testing': 'node_modules/@angular/common/bundles/common-testing.umd.js',
		'@angular/compiler/testing': 'node_modules/@angular/compiler/bundles/compiler-testing.umd.js',
		'@angular/core/testing': 'node_modules/@angular/core/bundles/core-testing.umd.js',
		'@angular/platform-browser/testing': 'node_modules/@angular/platform-browser/bundles/platform-browser-testing.umd.js',
		'@angular/platform-browser-dynamic/testing': 'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic-testing.umd.js',

		'rxjs': 'node_modules/rxjs',
	},
	packages: {
		'app': {
			defaultExtension: 'js'
		},
		'rxjs': {
			defaultExtension: 'js'
		}
	}
});

Promise
	.all([System.import('@angular/core/testing'), System.import('@angular/platform-browser-dynamic/testing')])
	.then(function (providers) {
		var testing = providers[0];
		var testingBrowser = providers[1];

		testing.TestBed.initTestEnvironment(testingBrowser.BrowserDynamicTestingModule, testingBrowser.platformBrowserDynamicTesting());
	})
	.then(function () {
		// Finally, load all spec files.
		// This will run the tests directly.
		return Promise.all(
			allSpecFiles.map(function (moduleName) {
				return System.import(moduleName);
			}));
	})
	.then(__karma__.start, __karma__.error);