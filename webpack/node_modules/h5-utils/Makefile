commit = 'update version'

publish:
	npm version ${version}
	npm publish
	git push origin master
	git push origin --tags

patch:
	make publish version=patch

minor:
	make publish version=minor

major:
	make publish version=major