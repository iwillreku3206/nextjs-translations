import { Translations, localeFromJSON } from "../src";

test("construct a Translations object", () => {
	const translations = new Translations({
		defaultLocale: "en",
		locales: [
			localeFromJSON("en", {
				"hello": "Hello!",
				"hello-name": "Hello, %%name%%!",
			})
		],
	});

	expect(translations).toBeInstanceOf(Translations);
	expect(translations.locales).toBeInstanceOf(Array);
	expect(translations.locales[0]).toStrictEqual({
		id: "en",
		translations: {
			"hello": "Hello!",
			"hello-name": "Hello, %%name%%!",
		}
	});
	expect(translations.defaultLocale).toBe("en");
});

test("construct a Translations object with automatic default locale", () => {
	const translations = new Translations({
		locales: [
			localeFromJSON("en", {
				"hello": "Hello!",
				"hello-name": "Hello, %%name%%!",
			})
		],
	});

	expect(translations).toBeInstanceOf(Translations);
	expect(translations.locales).toBeInstanceOf(Array);
	expect(translations.locales[0]).toStrictEqual({
		id: "en",
		translations: {
			"hello": "Hello!",
			"hello-name": "Hello, %%name%%!",
		}
	});
	expect(translations.defaultLocale).toBe("en");
});

test("construct a Translations object with no locales", () => {
	expect(() => {
		new Translations({
			locales: [],
		});
	}).toThrowError();
});

test("construct a Translations object with an invalid defaultLocale", () => {
	expect(() => {
		new Translations({
			defaultLocale: "en",
			locales: [
				localeFromJSON("zh", {
					"hello": "你好！",
					"hello-name": "你好，%%name%%！",
				})
			]
		});
	}).toThrowError();
});

test("find language", () => {
	const translations = new Translations({
		defaultLocale: "en",
		locales: [
			localeFromJSON("en", {
				"hello": "Hello!",
				"hello-name": "Hello, %%name%%!",
			}),
			localeFromJSON("zh", {
				"hello": "你好！",
				"hello-name": "你好，%%name%%！",
			}),
			localeFromJSON("zh-cn", {
				"hello": "你好！",
				"hello-name": "你好，%%name%%！",
			}),
			localeFromJSON("en_us", {
				"hello": "Hello!",
				"hello-name": "Hello, %%name%%!",
			}),
			localeFromJSON("fr", {
				"hello": "Bonjour!",
				"hello-name": "Bonjour, %%name%%!",
			})
		]
	});

	expect(translations.findLanguage({ code: "en", quality: 1 })).toBe("en");
	expect(translations.findLanguage({ code: "en", region: "US", quality: 1 })).toBe("en_us");
	expect(translations.findLanguage({ code: "zh", quality: 1 })).toBe("zh");
	expect(translations.findLanguage({ code: "zh", region: "CN", quality: 1 })).toBe("zh-cn");
	expect(translations.findLanguage({ code: "fr", region: "FR", quality: 1 })).toBe("fr");
});

test("find locale list", () => {
	const translations = new Translations({
		defaultLocale: "en",
		locales: [
			localeFromJSON("en", {
				"hello": "Hello!",
				"hello-name": "Hello, %%name%%!",
			}),
			localeFromJSON("zh", {
				"hello": "你好！",
				"hello-name": "你好，%%name%%！",
			}),
		]
	});

	expect(translations.getLocaleList()).toStrictEqual(["en", "zh"]);
});
