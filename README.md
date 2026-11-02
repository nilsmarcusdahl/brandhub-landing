# BrandHub

BrandHub is a Swedish landing page for living brand guidelines. It is built
with React, TanStack Start, Vite, and Tailwind CSS.

## Local development

Use Bun to install dependencies and run the site:

```sh
bun install --frozen-lockfile
bun run dev
```

The development server is available at <http://localhost:8080/>.

Useful commands:

```sh
bun run build
bun run preview
bun run test
bun run lint
```

The production build prerenders the static routes for Cloudflare Pages. The
published files are written to `dist/client`.

## Environment variables

The Supabase integration currently requires these values:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_URL`
- `SUPABASE_PUBLISHABLE_KEY`

Keep local values in `.env`. The file is ignored by Git; never commit secrets.
Add the required values to the Cloudflare Pages environment settings for
production builds instead.

## Cloudflare Pages

1. Keep the GitHub repository private under `nilsmarcusdahl`; the repository
   contains a licensed font.
2. In Cloudflare, create a Pages project and connect it to the GitHub
   repository. Select the production branch.
3. Use `bun install --frozen-lockfile && bun run build` as the build command
   and `dist/client` as the build output directory.
4. Add the required Supabase variables in the Pages project settings, not in
   GitHub or the repository.
5. In the Pages project, add `brandhub.nmdinnovation.se` under **Custom
   domains**. For a Cloudflare-managed DNS zone, Cloudflare creates the DNS
   record and provisions HTTPS. Otherwise, add a CNAME record named
   `brandhub` pointing to `<project-name>.pages.dev`; if needed, first move the
   domain's nameservers to Cloudflare at its registrar.

## Assets and content

Images, the explainer video, and the licensed Season Mix font are stored in
`src/assets/`. Keep the repository private and retain the font license.
The demo and waitlist forms currently submit to Supabase; their integration
has intentionally been left unchanged.
