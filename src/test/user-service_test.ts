import {provide} from '@angular/core';
import {
	addProviders,
	async,
	fakeAsync,
	inject,
	tick
} from '@angular/core/testing';

import {UserService} from '../app/user-service';
import {LoginService} from '../app/login-service';



describe('user service', () => {
	beforeEach(() => {
		addProviders([LoginService, UserService]);
	});

	it('should validate pins', inject([UserService], (service: UserService) => {
		service.pin = 12345;
		expect(service.isValidPin()).toBe(false);

		service.pin = 0;
		expect(service.isValidPin()).toBe(true);

		service.pin = 9999;
		expect(service.isValidPin()).toBe(true);

		service.pin = -50;
		expect(service.isValidPin()).toBe(false);
	}));

	it('should greet when pin is wrong', async(inject([UserService], (service: UserService) => {
		service.pin = 9999;
		service.getGreeting().then((greeting) => {
			expect(greeting).toEqual('Login failure!');
		});
	})), 3000);

	it('should greet when pin is right', async(inject([UserService], (service: UserService) => {
		service.pin = 2015;
		service.getGreeting().then((greeting) => {
			expect(greeting).toEqual('Welcome!');
		});
	})), 3000);
});

class MockLoginService implements LoginService {
	public login(pin: number): Promise<boolean> {
		return Promise.resolve(true);
	}
}

describe('with mocked login', () => {
	beforeEach(() => {
		addProviders([provide(LoginService, { useClass: MockLoginService }), UserService]);
	});

	it('should greet', async(inject([UserService], (service: UserService) => {
		service.getGreeting().then((greeting) => {
			expect(greeting).toEqual('Welcome!');
		});
	})));
});

describe('with fake async', () => {
	beforeEach(() => {
		addProviders([LoginService, UserService]);
	});

	it('should greet (with fakeAsync)', fakeAsync(inject([UserService], (service: UserService) => {
		let greeting: string;
		service.getGreeting().then((value) => {
			greeting = value;
		});

		tick(2000);
		expect(greeting).toEqual('Login failure!');
	})));
});
