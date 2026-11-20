# JD-08 Toolkit marketing site

A standalone static site for `https://misery.co/jd-08-toolkit/`. Astro uses Vite to build the HTML and assets. Like Swivel, it runs locally with npm and publishes to a product-specific path on GitHub Pages.

## Run locally

For a fresh local checkout, copy your licensed `hex-franklin.woff2` and `hex-franklin-tyght.woff2` files into `src/assets/fonts/`. Git ignores these local copies. Run the development server from this directory.

```sh
npm ci
npm run dev
```

Open the printed local address at `/jd-08-toolkit/`. Use the following commands to check and serve the production build.

```sh
npm run check
npm run build
npm run preview
```

The build writes the complete site to `dist/`, including seven HTML pages, a sitemap, the changelog Atom feed, and a 1200 × 630 share image for each page. The product support and privacy URLs are `/jd-08-toolkit/support/` and `/jd-08-toolkit/privacy/`. HEX Franklin Tyght sets the headlines and HEX Franklin sets the body text. Both webfonts are served locally. The demos have native playback controls, and the view selector, guides and FAQ work with JavaScript disabled.

## Publish on misery.co

Push to `main` in `miseryco/jd-08-toolkit` to deploy. The Pages workflow restores the two webfonts from `src/assets/fonts/fonts.tar.gpg` using the repository secret `FONT_ARCHIVE_PASSPHRASE`, checks the site, builds it and uploads only `dist/`. The organization's existing Pages domain provides the project path. The site builds independently of the desktop app.

On another static host, mount the contents of `dist/` at `/jd-08-toolkit/`. The origin and base path are in `astro.config.mjs`.

## Update the site

- **Release details.** Edit `content/release.json`. The placeholder links select the corresponding option under “Buy JD-08 Toolkit.” Set `appStoreUrl` and `directDownloadUrl` to the live destinations at release. A direct URL may contain `{version}`, which the site replaces with the configured version. The version also appears beside the release notes link and in the application metadata. Set the price and ISO currency together when pricing is published.
- **Changelog.** Add a dated Markdown file to `content/changelog/` following either existing entry. Keep a published filename stable because it supplies the feed entry ID and page anchor. Each update supplies its date, heading, screenshot and alt text. An update with a film names it in `video` and gives its poster as `image`; it uses the same player as the landing page’s demonstrations (`src/components/Film.astro`). Its first paragraph is the feed summary.
- **Features and FAQs.** Edit `content/features.json` and `content/faq.json`. Landing FAQ markup and structured data use the same records. Verify product changes against the current app, built-in Help and `../docs/NATIVE-TOOLKIT.md`.
- **Field guides.** Each record in `content/guides.json` generates a page using one template. The build generates its sitemap entry and share image. The alternatives table reads its features and primary sources from `content/competitors.json`. Leave a tool’s cell out when its JD-08 documentation does not list the feature. Update the verification date after checking the sources.
- **Theme.** Run `node scripts/sync-colors.mjs` from this checkout after the app’s `Theme.swift` changes. A standalone site checkout can supply the absolute path to that Swift file. The checked-in `src/styles/tokens.css` lets normal builds run independently of the app.
- **Media.** WebP screenshots and H.264 films live in `public/media/`. Add a title and a caption for each enlarged image in `content/screenshots.json`. The current images came from the native app. The films show actual envelope, piano-roll and slot-editing operations. The Memory film combines offscreen slot states with the native drag tile and cursor. It shows two separate drags at 60 fps, first swapping slots 11 and 24, then swapping them back. The welcome film (`loop-welcome`) is the real welcome rendered one loader step at a time by `../desktop/script/render_welcome_film.sh`, so it loops without a seam. Keep full-window images at 800 and 1600 pixels wide, detail images at 480 and 960, and loop posters at 960 × 540.

The app reads JD-800 Model Expansion SVZ files directly. Classic JD-800 and JD-990 SysEx dumps use the JDTools conversion described in the guide. The app exposes both JD-08 effects groups. The installed firmware version was not recorded during hardware verification, so the site describes stock firmware support without a version-specific test claim.
