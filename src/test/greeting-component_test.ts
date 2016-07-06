import {provide} from '@angular/core';
import {
	addProviders,
	async,
	ComponentFixture,
	fakeAsync,
	inject,
	TestComponentBuilder,
	tick
} from '@angular/core/testing';

import {UserService} from '../app/user-service';
import {LoginService} from '../app/login-service';
import {GreetingComponent} from '../app/greeting-component';



class MockLoginService implements LoginService {
	public login(pin: number): Promise<boolean> {
		return Promise.resolve(true);
	}
}

describe('greeting component', () => {
	let builder: TestComponentBuilder;

	beforeEach(() => {
		addProviders([
			provide(LoginService, { useClass: MockLoginService }),
			UserService
		]);
	});

	beforeEach(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
		builder = tcb;
	}));

	it('should ask for PIN', async(() => {
		builder.createAsync(GreetingComponent).then((fixture: ComponentFixture<GreetingComponent>) => {
			fixture.detectChanges();
			let compiled = fixture.nativeElement;

			expect(compiled).toContainText('Enter PIN');
			expect(compiled.querySelector('h3')).toHaveText('Status: Enter PIN');
		});
	}));

	it('should change greeting', async(() => {
		builder.createAsync(GreetingComponent).then((fixture: ComponentFixture<GreetingComponent>) => {
			fixture.detectChanges();
			(<GreetingComponent>fixture.componentInstance).greeting = "Foobar";
			fixture.detectChanges();

			let compiled = fixture.nativeElement;

			expect(compiled.querySelector('h3')).toHaveText('Status: Foobar');
		});
	}));

	it('should override the template', async(() => {
		builder
			.overrideTemplate(GreetingComponent, `<span>{{greeting}}<span>`)
			.createAsync(GreetingComponent)
			.then((fixture: ComponentFixture<GreetingComponent>) => {
				fixture.detectChanges();

				let compiled = fixture.nativeElement;

				expect(compiled).toHaveText('Enter PIN');
			});
	}));

	it('should accept pin', async(() => {
		builder.createAsync(GreetingComponent).then((fixture: ComponentFixture<GreetingComponent>) => {
			fixture.detectChanges();

			let compiled = fixture.nativeElement;
			compiled.querySelector('button').click();

			fixture.componentInstance.pending.then(() => {
				fixture.detectChanges();
				expect(compiled.querySelector('h3')).toHaveText('Status: Welcome!');
			});
		});
	}));

	it('should accept pin (with fakeAsync)', fakeAsync(() => {
		let fixture: ComponentFixture<GreetingComponent>;
		builder.createAsync(GreetingComponent).then((rootFixture: ComponentFixture<GreetingComponent>) => {
			fixture = rootFixture;
		});

		tick();

		let compiled = fixture.nativeElement;
		compiled.querySelector('button').click();
		tick();
		fixture.detectChanges();

		expect(compiled.querySelector('h3')).toHaveText('Status: Welcome!');
	}));
});