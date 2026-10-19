# GB-url dependency security repair

## Scope and baseline

Independent checkout: `/Volumes/ORICO/Documents/Codex/2026-10-19/task/GB-url`, branch `fix/dependency-security`, original HEAD `dafdaceaef5094643dd5ab43ffcb94c4ef29ae13`. No AGENTS.md found. Implementation and validation were completed locally first. The delivery stage is authorized to commit, push and merge this change; npm publication and manual alert dismissal are outside scope.

Chrome was used to inspect both pages of open Dependabot alerts: 34 total. A single authorized GitHub API read retained all details locally in github-alerts-before.json (unversioned raw evidence). All reported dependencies are development/build dependencies. There are no production dependencies in package.json. Some Vite alerts occur twice because GitHub tracks both package.json and pnpm-lock.yaml; 34 is not the number of distinct vulnerabilities.

Node v20.20.2 / npm 10.8.2. Root package has no install/prepare lifecycle scripts. Baseline installed with pnpm 7.33.7 (matching lockfile 5.4), frozen lockfile, installation scripts disabled. Baseline TypeScript/Vite 3.2.4 build succeeded. Pre-upgrade ESM/UMD bundles were retained for black-box behavior comparison.

## Changes

- Vite 3.2.4 -> 6.4.4, the smaller version line satisfying the observed Vite security patches; did not jump to Vite 8 or replace the build architecture.
- Transitives: Rollup 4.64.10, esbuild 0.25.12, PostCSS 8.5.31, nanoid 3.3.20, source-map-js 1.2.2. TypeScript remains on 4.9.x (4.9.3 -> 4.9.5).
- Pin development package manager to pnpm 10.34.7; lockfile migrated from version 5.4 to 9.0. No global package-manager configuration changed. Install scripts remained disabled; esbuild uses its registry-distributed platform binary.
- Explicitly retain original browser build targets: es2020 / Edge88 / Firefox78 / Chrome87 / Safari14. Explicitly preserve Rollup `esModule:true`: newer Rollup otherwise removes the original UMD `__esModule` flag.
- Bind dev and preview to 127.0.0.1; preserve existing package entry names, global `gbUrl`, named exports and declaration path.
- Add regression tests and development instructions. `src/main.ts`, `index.d.ts`, package version, publishing files/exports and ESM dist/gburl.js are unchanged. UMD differences are bundler wrapping/minifier naming; original module marker restored.
- Do not introduce a new package engines restriction on runtime consumers merely because development Vite requires newer Node. Development requirements are documented instead.

## Alert coverage

| Package | GitHub alert numbers | Final resolved version |
|---|---|---|
| vite | 1,3,4,5,7,11,13–22,24,25,27–32 | 6.4.4 |
| rollup | 9,23 | 4.64.10 |
| esbuild | 12 | 0.25.12 |
| postcss | 2,26,33–35 | 8.5.31 |
| nanoid | 39 | 3.3.20 |
| source-map-js | 40 | 1.2.2 |

Direct links: [Vite Windows path/deny issue #31](https://github.com/givebest/GB-url/security/dependabot/31), [Rollup #23](https://github.com/givebest/GB-url/security/dependabot/23), [PostCSS #35](https://github.com/givebest/GB-url/security/dependabot/35), [esbuild #12](https://github.com/givebest/GB-url/security/dependabot/12).

Vite filesystem/launch-editor issues principally concern running development servers, including Windows or case-insensitive-filesystem conditions; this project has no custom middleware/plugin/server configuration. Rollup/Vite DOM-clobbering issues can affect generated bundles under their gadget conditions; the current library does not load arbitrary assets or use import.meta.url in source. PostCSS/source-map issues require processing attacker-controlled CSS/maps and nanoid issues involve invalid attacker-controlled sizes. These observations narrow the local exposure, but upgrades remove the vulnerable dependency versions rather than treating development scope as automatically safe.

## Verification

Command logs and raw GitHub/dependency-tree responses remain local evidence; concise report, audit results, metadata and reproducible fixtures/tests are versioned.

- Final frozen installation with pnpm 10.34.7 and scripts disabled: passed (frozen-install.log).
- `pnpm build`: TypeScript and Vite library build passed (build.log).
- `pnpm test`: 5/5 suites passed, covering CommonJS and browser-global baseline comparison across 12 query and 8 update cases, ESM/CommonJS agreement, module metadata, explicit decoding/error expectations and package entry/declaration existence (test.log).
- Chrome real browser comparison: 16 checks passed across built ESM and Vite-transformed source against the baseline. Unicode decoding returns 中文. No UI app is present in this library, so a local verification HTML page was used.
- Local dev HTTP: verification HTML and TypeScript module returned 200; benign temporary `.env` fixture returned 403; forged Host returned 403. Fixture was removed. The only server was explicitly bound to 127.0.0.1:9010, then stopped and the agent-created local tab closed.
- `pnpm audit --json`: all severity counts zero (audit.json). This is the local pnpm audit result, not a claim that GitHub's 34 alerts have been closed. GitHub can only rescan changed repository contents after a push.
- `git diff --check`: passed; no source API/declaration/ESM output difference.

## Existing behavior and limits

Baseline browser `setParams({a:'111'}, 'a.html?a=1&b=2')` throws TypeError: the existing source treats the string's `.search` function as a query value, later producing an array where a string is expected. Node/no-window behavior also differs from README examples by dropping pre-existing query parameters. Baseline and rebuilt bundles agree; no unrelated URL algorithm change was included in this dependency-only repair. Therefore compatibility checks must not be described as proof that every README API example works.

Actual verification host is macOS/Node 20.20.2/current Chrome. Windows-specific exploit reproduction, all supported browsers and Node versions were not tested. Original build targets and APIs are preserved, but this does not guarantee zero regressions in every downstream consumer. Minimum development Node must satisfy both Vite 6 (`^18 || ^20 || >=22`) and pnpm 10 (`>=18.12`); a supported even-numbered release is recommended. Production library runtime requirements were not changed.

Dependency metadata is retained in dependency-metadata.json: Vite/Rollup/PostCSS/nanoid/source-map-js use MIT, esbuild uses MIT, TypeScript uses Apache-2.0. Dependencies are build-only and the published bundle has no new runtime import. This is package metadata inspection, not a broader legal compliance certification.

## Recommendation

Ready for review as a small dependency/build-tool migration, with unchanged library source and tested module interoperability. No known new functional failure found. Keep the pre-existing setParams bug explicit; a separate functional fix would need separate expectations and tests. The user subsequently authorized final review, commit, push and merge. Delivery is recorded by the resulting GitHub PR and merge commit.

## Final pre-commit review

No new blocking finding. Rechecked the complete diff, unchanged source/declarations/ESM, UMD module marker, dependency scope, root lifecycle scripts and latest origin/main. Rebuilt and passed all five regression tests again. Package tarball inspection confirmed tests and verification fixtures are excluded from published files. The existing setParams issue remains explicitly outside this dependency change. No npm publication is performed.
