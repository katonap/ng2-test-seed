import {APP_ID} from '@angular/core';
import {inject} from '@angular/core/testing';


describe('default test injector', () => {
	it('should provide default id', inject([APP_ID], (id: string) => {
		expect(id).toBe('a');
	}));
});