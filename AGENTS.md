# BrandHub project guidance

- Preserve the published page's Swedish copy, layout, styling, imagery,
  typography, animation, and behavior unless the task explicitly asks for a
  change.
- Keep the Season Mix font and other licensed assets in the private repository.
- Never commit `.env` or other secrets. Use Cloudflare Pages environment
  settings for deployment values.
- Do not change the “Boka en demo” form, booking behavior, waitlist form, or
  Supabase integration unless explicitly requested.
- Keep page-specific titles, descriptions, and sharing images in each route's
  metadata, and keep public routes prerendered for static hosting.
- Use Bun for dependency installation and project scripts. Verify changes with
  the narrowest applicable build, test, or lint command.
