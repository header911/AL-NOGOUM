# Al Nogoum — Bilingual GitHub Pages Website

Static bilingual landing page for **Al Nogoum General Supplies & Contracting**. No database and no backend are required.

## Included
- Arabic / English toggle with automatic RTL/LTR layout.
- Responsive animated landing page.
- General supplies, contracting, electrical works, tenders, import/export sourcing and site supply sections.
- Capability cards with professional industry imagery.
- WhatsApp / phone / email contact actions.
- `admin.html` editor for Arabic + English content, colors, logo, services, capabilities and contacts.
- Admin publishing directly to GitHub using a Fine-grained Personal Access Token.

## GitHub Pages
1. Create a GitHub repository.
2. Upload all files in this folder to the repository root.
3. Open **Settings → Pages**.
4. Select **Deploy from a branch**.
5. Select `main` and `/ (root)`.
6. Save and wait for the first deployment.

## Admin
Open `/admin.html` on the deployed site. The page itself is public but not linked from the landing page and is marked `noindex`. Actual write access is controlled by the GitHub token you enter at publish time.

Create a Fine-grained GitHub token limited to the website repository with:
- **Contents: Read and write**

The token is not saved by the site. Owner/repository/branch may be remembered locally for convenience.

## Logo
The site currently uses a generated letter mark when no logo is configured. Set `brand.logo` in `content.json` or upload a logo from `admin.html`. Once the official logo is supplied, the palette can be updated using the three brand color controls without changing the layout.

## Images
Default imagery is loaded from Pexels URLs as representative capability imagery, not as claimed completed Al Nogoum projects. Project/capability images can be replaced with your own photos from the admin page; uploaded images are committed to `assets/projects/`. See `IMAGE-SOURCES.md`.
