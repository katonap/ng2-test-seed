import {Component} from '@angular/core';
import {
	async,
	ComponentFixture,
	inject,
	TestBed
} from '@angular/core/testing';

import {BorderComponent} from '../app/border-component';

@Component({
	template: '',
	directives: [BorderComponent]
})
class TestComponent { }

describe('border component', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TestComponent]
		});
	});

	it('should wrap content', async(() => {
		TestBed.overrideComponent(TestComponent, {
			set: {
				template: '<my-fancy-border>Content</my-fancy-border>'
			}
		});

		TestBed.compileComponents().then(() => {
			let fixture = TestBed.createComponent(TestComponent);
			fixture.detectChanges();
			let compiled = fixture.debugElement.nativeElement;

			expect(compiled).toContainText('Content');
		});
	}));

	it('should include a title', async(() => {
		TestBed.overrideComponent(TestComponent, {
			set: {
				template: '<my-fancy-border title="ABC"></my-fancy-border>'
			}
		});

		TestBed.compileComponents().then(() => {
			let fixture = TestBed.createComponent(TestComponent);
			fixture.detectChanges();
			let compiled = fixture.debugElement.nativeElement;

			expect(compiled).toContainText('ABC');
		});
	}));
});