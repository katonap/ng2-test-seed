import {Component} from '@angular/core';
import {
	async,
	beforeEachProviders,
	ddescribe,
	describe,
	expect,
	iit,
	inject,
	it
} from '@angular/core/testing';
import {ComponentFixture, TestComponentBuilder} from '@angular/compiler/testing';

import {BorderComponent} from '../app/border-component';

@Component({
	template: '',
	directives: [BorderComponent]
})
class TestComponent { }

describe('greeting component', () => {
	it('should wrap content', async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
		tcb.overrideTemplate(TestComponent, '<my-fancy-border>Content</my-fancy-border>')
			.createAsync(TestComponent).then((fixture: ComponentFixture<TestComponent>) => {
				fixture.detectChanges();
				let compiled = fixture.nativeElement;

				expect(compiled).toContainText('Content');
			});
	})));

	it('should include a title', async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
		tcb.overrideTemplate(TestComponent, '<my-fancy-border title="ABC"></my-fancy-border>')
			.createAsync(TestComponent).then((fixture: ComponentFixture<TestComponent>) => {
				fixture.detectChanges();
				let compiled = fixture.nativeElement;

				expect(compiled).toContainText('ABC');
			});
	})));
});
