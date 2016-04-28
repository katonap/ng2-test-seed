import {
	async,
	beforeEachProviders,
	ddescribe,
	describe,
	expect,
	iit,
	inject,
	it,
	TestComponentBuilder
} from 'angular2/testing';
import {Component} from 'angular2/core';

import {BorderComponent} from '../app/border-component';

@Component({
	template: '',
	directives: [BorderComponent]
})
class TestComponent { }

describe('greeting component', () => {
	it('should wrap content', async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
		tcb.overrideTemplate(TestComponent, '<my-fancy-border>Content</my-fancy-border>')
			.createAsync(TestComponent).then((fixture) => {
				fixture.detectChanges();
				let compiled = fixture.nativeElement;

				expect(compiled).toContainText('Content');
			});
	})));

	it('should include a title', async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
		tcb.overrideTemplate(TestComponent, '<my-fancy-border title="ABC"></my-fancy-border>')
			.createAsync(TestComponent).then((fixture) => {
				fixture.detectChanges();
				let compiled = fixture.nativeElement;

				expect(compiled).toContainText('ABC');
			});
	})));
});
