# BrandHub migration notes

This Lovable export has been prepared to run locally and build as a statically
prerendered site for Cloudflare Pages.

## Completed

- Images, logo, explainer video, and the licensed Season Mix font are local
  files in `src/assets/`.
- The site uses a standard Vite configuration with TanStack Start, React,
  Tailwind CSS, and Vite's native tsconfig path support.
- Lovable-specific build configuration, editor error reporting, and the
  `.lovable/` project metadata have been removed.
- The `/` page is prerendered. Its title and description match the published
  version, and its social image is served from the site's own domain.
- `.env` and `.env.*` are ignored by Git.

## Deliberately unchanged

- “Boka en demo” buttons link to the external Google Calendar appointment
  page. The agency section and its waitlist form have been removed.
- Supabase integration code remains unchanged. Its environment variables
  should be configured in Cloudflare Pages if application endpoints need them.
- Season Mix is licensed. Keep the GitHub repository private and preserve its
  license.
- Inter continues to load from Google Fonts; Season Mix and the other media
  remain local.

## Cloudflare Pages

The Vite build writes static output to `dist/client`. The explainer video is
22,952,050 bytes in this checkout, below the 25 MiB per-file Pages limit.
Connect the private GitHub repository to Pages, run
`bun install --frozen-lockfile && bun run build`, and publish `dist/client`.
Add `brandhub.nmdinnovation.se` as a custom domain; Cloudflare-managed DNS can
create the CNAME to `<project-name>.pages.dev` automatically. If DNS is managed
elsewhere, point the `brandhub` CNAME to that Pages hostname.
