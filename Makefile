# Cerid AI marketing site — thin task runner.
#
# Deliberately minimal: the build, lint and test commands live in package.json
# and are invoked through npm. The one thing that genuinely needs a target is
# `push`, because the naive `git push` is a trap here (see below).

.PHONY: help push install-hooks validate

help: ## Show available targets
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
	  | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-16s\033[0m %s\n", $$1, $$2}'

push: ## Validate FIRST, then push (avoids the hook holding the remote connection open)
	@bash scripts/safe-push.sh $(ARGS)

install-hooks: ## Point git at scripts/hooks (pre-commit + pre-push)
	@git config core.hooksPath scripts/hooks
	@echo "core.hooksPath = scripts/hooks"

validate: ## Run the same checks the pre-push hook runs, without pushing
	@bash scripts/hooks/pre-push --validate-only
