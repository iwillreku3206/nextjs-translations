import { localeFromJSON } from "../src";

test("creates a valid locale from JSON", () => {
	const locale = localeFromJSON("en", {
		"hello": "Hello",
		"hello_with_name": "Hello, %%name%%!"
	});

	expect(locale).toEqual({
		id: "en",
		translations: {
			"hello": "Hello",
			"hello_with_name": "Hello, %%name%%!"
		}
	});
});

test("throws error if JSON values are not string", () => {
	const fn = () => {
		localeFromJSON("en", {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			"test": 1234
		});
	};
	expect(fn).toThrowError();
});
