beforeEach(() => {
	jasmine.addMatchers({
		toContainText: function () {
            return {
				compare: function (actual, expectedText) {
					let actualText = actual.textContent;
					return {
						pass: actualText.indexOf(expectedText) > -1,
						get message() { return 'Expected ' + actualText + ' to contain ' + expectedText; }
					};
				}
			};
        },

		toHaveText: function () {
			return {
				compare: function (actual, expectedText) {
					let actualText = actual.textContent;
					return {
						pass: actualText == expectedText,
						get message() { return 'Expected ' + actualText + ' to equal ' + expectedText; }
					};
				}
			}
		}
	});
});