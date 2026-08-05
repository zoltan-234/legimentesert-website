STATIC WEBSITE EXPORT — Magyarországi Légimentésért Közhasznú Alapítvány

CONTENTS
- One index.html per public route (28 URLs total)
- assets/site.css: compiled shared design system and page styles
- assets/site.js: framework-free interaction helpers
- assets/media/: locally packaged website imagery

USAGE
1. Upload the contents to any web server while preserving the folder structure.
2. Open index.html for the homepage.
3. For WordPress conversion, copy each page's <main> markup into its matching template/block layout, enqueue assets/site.css and assets/site.js, and import assets/media into the Media Library.

NOTES
- Contact, volunteer, and newsletter forms are visual/static. Connect them to WordPress form handling or a plugin.
- Search/filter, navigation, accordions, copy controls, and basic tabs have vanilla-JS fallbacks.
- Source framework scripts and development metadata were removed.
- Google Manrope remains linked from Google Fonts; self-host it if your privacy policy requires that.
