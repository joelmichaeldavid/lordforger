# LordForger

Project repository for the **LordForger** game by **7LeafPocket**.

## Documentation
- See `docs/README.md` for the doc map.
- Foundational project notes live in `docs/LordForger_Project_Sources.md`.
- Session kickoff plan: `docs/production/SESSION_1.md`
- Session 1.1 plan (decisions, scope, handoffs): `docs/production/SESSION_1_1.md`
- Session 1.1 issue templates: `docs/production/ISSUES_SESSION_1_1.md`
- Multi-agent workflow: `docs/design/MULTI_AGENT_WORKFLOW.md`

## Playable Prototype (Session 1)
Open `prototype/index.html` in a browser to play the first micro-loop:
- choose a hex
- get an encounter
- pick Engage / Observe / Avoid
- advance time and watch Hearthvale change


## Where to play it
- On desktop/laptop: open `prototype/index.html` directly in a web browser.
- In VS Code: right-click `prototype/index.html` and choose your browser preview/open option.
- If you want, we can next deploy this to a simple static URL (GitHub Pages) so you can open it from iPad too.

## About playing “in chat”
This chat cannot embed and execute interactive browser game UIs directly. We can still iterate here by:
- changing code together,
- giving you exact run/open steps,
- and (optionally) publishing a shareable web link.


## Deploy to GitHub Pages (for iPad access)
This repository includes an automatic Pages deploy workflow at `.github/workflows/deploy-pages.yml`.

### One-time setup in GitHub
1. Open your repo on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source = GitHub Actions**.
4. Make sure your default branch is `main` (or update the workflow trigger branch).

### Resulting URL
After the workflow runs on `main`, your prototype will be available at:
`https://<your-github-username>.github.io/<repo-name>/`

For this repo, that should look like:
`https://<your-github-username>.github.io/lordforger/`
