import {DeprecatedFormsModule} from '@angular/common';
import {provide} from '@angular/core';
import {
	async,
	ComponentFixture,
	fakeAsync,
	inject,
	TestBed,
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
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [GreetingComponent],
			providers: [
				provide(LoginService, { useClass: MockLoginService }),
				UserService
			],
			imports: [DeprecatedFormsModule]
		});
	});

	describe('without overriding', () => {
		beforeEach(async(() => {
			TestBed.compileComponents();
		}));

		it('should ask for PIN', async(() => {
			let fixture = TestBed.createComponent(GreetingComponent);
			fixture.detectChanges();
			let compiled = fixture.debugElement.nativeElement;

			expect(compiled).toContainText('Enter PIN');
			expect(compiled.querySelector('h3')).toHaveText('Status: Enter PIN');
		}));

		it('should change the greeting', async(() => {
			let fixture = TestBed.createComponent(GreetingComponent);
			fixture.detectChanges();

			fixture.debugElement.componentInstance.greeting = 'Foobar';

			fixture.detectChanges();
			let compiled = fixture.debugElement.nativeElement;
			expect(compiled.querySelector('h3')).toHaveText('Status: Foobar');
		}));

		it('should accept pin', async(() => {
			let fixture = TestBed.createComponent(GreetingComponent);
			fixture.detectChanges();
			let compiled = fixture.debugElement.nativeElement;
			compiled.querySelector('button').click();

			fixture.debugElement.componentInstance.pending.then(() => {
				fixture.detectChanges();
				expect(compiled.querySelector('h3')).toHaveText('Status: Welcome!');
			});
		}));

		it('should accept pin (with whenStable)', async(() => {
			let fixture = TestBed.createComponent(GreetingComponent);
			fixture.detectChanges();
			let compiled = fixture.debugElement.nativeElement;
			compiled.querySelector('button').click();

			fixture.whenStable().then(() => {
				fixture.detectChanges();
				expect(compiled.querySelector('h3')).toHaveText('Status: Welcome!');
			});
		}));

		it('should accept pin (with fakeAsync)', fakeAsync(() => {
			let fixture = TestBed.createComponent(GreetingComponent);

			let compiled = fixture.debugElement.nativeElement;
			compiled.querySelector('button').click();

			tick();
			fixture.detectChanges();
			expect(compiled.querySelector('h3')).toHaveText('Status: Welcome!');
		}));
	});

	describe('overriding', () => {
		it('should override the template', async(() => {
			TestBed
				.overrideComponent(GreetingComponent, {
					set: {
						template: `<span>Foo {{greeting}}<span>`
					}
				})
				.compileComponents().then(() => {
					let fixture = TestBed.createComponent(GreetingComponent);
					fixture.detectChanges();

					let compiled = fixture.debugElement.nativeElement;
					expect(compiled).toHaveText('Foo Enter PIN');
				});
		}));
	});
});