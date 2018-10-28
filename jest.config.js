module.exports = {
	moduleFileExtensions: [
		"js",
		"json",
		"jsx",
		"ts",
		"tsx",
		"vue"
	],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1'
	},
	setupTestFrameworkScriptFile: "<rootDir>/jest.setup.js",
	snapshotSerializers: [
		'jest-serializer-vue'
	],
	testMatch: [
		'**/tests/unit/**/*.spec.(js|jsx|ts|tsx)'
	],
	testURL: 'http://localhost/',
	transform: {
		'^.+\\.vue$': 'vue-jest',
		'.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
		'^.+\\.tsx?$': 'ts-jest'
	}
}
