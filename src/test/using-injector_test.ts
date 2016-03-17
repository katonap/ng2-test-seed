import {APP_ID, OpaqueToken, provide} from 'angular2/core';
import {
	beforeEachProviders,
	describe,
	expect,
	inject,
	it
} from 'angular2/testing';


describe('default test injector', () => {
	beforeEachProviders(() => [
		provide(APP_ID, { useFactory: () => APP_ID })
	]);

	it('should provide default id', inject([APP_ID], (appId: OpaqueToken) => {
		expect(appId.toString()).toBe('Token AppId');
	}));
});
