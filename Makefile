
.PHONY: all test deploy

all: build

gh-pages/.git:
	git fetch -fn origin gh-pages:gh-pages
	rm -rf gh-pages/*
	git worktree add -f gh-pages gh-pages

test:
	npm run test:unit

build:
	rm dist/*
	npm run build

deploy: gh-pages/.git build
	cp -r dist/* gh-pages/
	cd gh-pages ; echo > .nojekyll ; git add --all && git commit -m 'chore: deploy' -m '[skip ci]' && git push
