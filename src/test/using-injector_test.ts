import {APP_ID} from '@angular/core';
import {
	describe,
	expect,
	inject,
	it
} from '@angular/core/testing';

describe('default test injector', () => {
	it('should provide default id', inject([APP_ID], (id) => {
		expect(id).toBe('a');
	}));
});