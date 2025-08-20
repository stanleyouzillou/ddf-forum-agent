# Windsurf + SolidBook scaffold for DDDForum (Hacker News style)

This scaffold contains a set of Markdown files, Windsurf rules, workflows and memory guidance to help an agentic IDE (Windsurf / Cascade) bootstrap and iterate a DDD-inspired Hacker-News clone (DDDForum).  
Use this as the canonical workspace-level instructions committed to your repo so Windsurf can follow consistent rules and repeatable workflows.

Files included:
- `.windsurf/rules.md` — persistent rules for the agent (coding standards, repo commands, boundaries).
- `.windsurf/memories.md` — suggested team-level memories the agent should keep.
- `.windsurf/workflows/create-post.md` — example workflow: implement the "Create Post" vertical slice (walking skeleton → TDD → CI).
- `WORKFLOW.md` — project-level iterative flow (acceptance-first, walking skeleton, double-loop TDD).
- `GHERKIN_GUIDE.md` — how to write acceptance tests (Gherkin) the agent will consume.
- `TESTING_STRATEGY.md` — unit / integration / e2e split and commands.
- `FILE_LAYOUT.md` — recommended feature-driven project layout.
- `CI_CD.md` — minimal CI guidance and commands for GitHub Actions.
- `SAMPLE_GHERKIN.feature` — starter Gherkin feature for "Create Post".
- `CONTRIBUTING.md` — how humans should interact with the agent.

How to use
1. Commit this directory to the repo root (`.windsurf/*` + top-level MD files).
2. Start Windsurf/Cascade in the workspace. The agent will:
   - Load `.windsurf/rules.md` (always-on constraints).
   - Load `.windsurf/memories.md` (team preferences & long-lived context).
   - Expose workflows under `/` commands (e.g. `/create-post`) and run them when requested.
3. Run workflows from Cascade by invoking slash commands or ask the agent to run the workflow by name.

This scaffold follows the SolidBook principles: feature-driven vertical slices, acceptance-first, walking skeleton, TDD, continuous refactor and CI. Keep acceptance tests (Gherkin) as the single source-of-truth for feature acceptance.
