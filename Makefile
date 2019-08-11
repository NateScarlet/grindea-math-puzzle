
.PHONY: all test deploy

all: build

gh-pages/.git:
	git fetch -fn origin gh-pages:gh-pages
	git branch --set-upstream-to=origin/gh-pages gh-pages
	rm -rf gh-pages/*
	git worktree add -f gh-pages gh-pages

test:
	npm run test:unit

dist: src/* src/*/*
	rm -rf dist
	npm run build

deploy: gh-pages/.git dist
	./scripts/deploy.sh
