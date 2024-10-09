# Project Notes

## Public Directory

All fonts are located in the webfonts folder and are free to use.

## Src Directory

### Assets Directory

- Contains folders for `favicon`, `img`, `scripts`, and `styles`.
- You may want to update `portrait.jpg` used on the About page and the `social.png` image, I've created a basic one, which I'm usually using. You can preview social links here: https://socialsharepreview.com/
- For `portrait.jpg`, don't worry about the format, Astro generates a `webp` version automatically. Just ensure the name is consistent.

### Components

Self-explanatory: contains all the components used in the project.

### Data

- `aboutContent.json`: Content for the About page, currently with three paragraphs. Try to stick to three paragraphs for optimal layout, as four may disrupt the design. You may also use two as well.
- `constants.ts`: Contains SEO-related data, which you can adjust as needed.
- `projects.js`: Holds project data; each project requires id, name, description, and url.

> [!IMPORTANT]  
> When updating the number of projects, change `const numberOfProjects` in `src/assets/scripts/projects.ts` (line 29) to match the total count in `src/data/projects.js`.

### Layouts

Contains layouts for different pages.

### Pages

- `.well-known/security.txt`: Dynamically generates a security file. Update your email if needed (format: `mailto:your@email.com`).
- `404 Page`: Adjust constants in the frontmatter as necessary.
- `about.astro`: Consider updating the image alt text.
- `favicon.ico.ts`: Manages favicon generation.
- `index.astro`: Customize the welcoming text and description paragraph as necessary.
- `manifest.json.ts`: Generates the site manifest.
- `projects.astro`: Projects page generated from projects.js in the data directory.
- `robots.txt.ts`: Generates robots.txt. Update the `robotsTxt` constant as needed.

## Root Directory

- `astro.config.mjs`: Update the site URL if it changes, I've set set it to https://will.xn--q9jyb4c/. You can also change the compression format if preferred, I often stick with brotli.
- `vercel.json`: I've included CSP policy. Adjust it based on your hosting platform if necessary.
