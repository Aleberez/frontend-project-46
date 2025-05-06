install: 
	npm ci
lint:
	npx eslint .

gendiff:
	node bin/gendiff.js

publish:
	npm publish --dry-run

run:
	node bin/gendiff.js __fixtures__/file1.json __fixtures__/file2.json

test:
	npm test

test-coverage:
	npx jest --coverage

lint-fix:
	npx eslint . --fix