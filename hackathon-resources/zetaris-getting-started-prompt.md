Zetaris's getting-started prompt. Paste it into your coding tool of choice: Cursor, Claude Code or Codex.

```markdown
Use the getting-started repository at https://github.com/zetaris/getting-started/tree/44668b267ad7ee0fae25ce7588e9620121d47cae as the workspace. If it is not checked out, help me clone and open it first. Read docs/connections/client-setup.md for setup. Keep credentials in .env.local, never in this prompt or a report.

Read AGENTS.md and follow it. Run python3 scripts/preflight.py --jdbc and show me the result. Report JDBC and REST checks separately. Stop on JDBC failures and report what is missing. REST failures alone do not block JDBC. If the driver JAR path is not set, ask me for it. Once readiness checks pass, connect over JDBC to the instance configured in .env.local and confirm with SELECT 1 and SHOW LIGHTNING DATABASES.

If a local port check returns `Operation not permitted`, retry the same read-only check with approved network access before reporting the endpoint as closed. Distinguish missing Python runner dependencies (`.venv` or `jaydebeapi`) from direct Java JDBC readiness; do not install dependencies without asking.

Goal: verify SQL execution, inspect the supplied NY_TAXI and TPCDS_DB tables, then run a sample SELECT with LIMIT 5. Do not create objects.

Dry-run before creating anything and wait for my go-ahead.
```
