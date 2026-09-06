# RK Portfolio

A maintainable, GitHub Pages-ready static portfolio refactored from the original single-file HTML/CSS/JS site.

## Structure

```text
rk-portfolio/
├── index.html
├── README.md
├── .gitignore
├── css/
│   └── style.css
├── js/
│   └── script.js
├── data/
│   └── projects.js
└── assets/
    ├── images/
    └── icons/
```

## Easy maintenance

### Projects and project configuration
Edit **`data/projects.js`** first. Project data/configuration from the original site is kept there so you can update project information without changing interaction or styling code.

For local project images:

```text
assets/images/
```

and reference them from `data/projects.js`, e.g.:

```js
"assets/images/my-project.jpg"
```

### Personal information
The site's visible copy and page structure remain in **`index.html`** so the existing design is preserved. Update your name, bio, contact details, social links, services, and other page text there.

### Design
Use **`css/style.css`** for colors, typography, spacing, layout, responsive rules, and animations.

### Functionality
Use **`js/script.js`** for navigation, modal behavior, forms, filtering, scrolling, and other interactions.

### Assets
- `assets/images/` → profile/project images
- `assets/icons/` → favicon, SVGs, custom icons, etc.

## Run locally

You can open `index.html` directly, or use a local server.

With Python:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## GitHub Pages

1. Create a GitHub repository.
2. Upload this project.
3. Go to **Settings → Pages**.
4. Choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`.
6. Save.

## Maintenance rule

| What you want to change | Edit |
|---|---|
| Projects / project configuration | `data/projects.js` |
| Images | `assets/images/` |
| Icons | `assets/icons/` |
| Visible page text / personal details | `index.html` |
| Design / layout | `css/style.css` |
| JavaScript behavior | `js/script.js` |

The refactor keeps the original design and behavior while separating the concerns into normal GitHub-friendly files.
