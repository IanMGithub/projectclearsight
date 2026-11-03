# ClearSight

Student-led site for raising awareness of misleading online information and practicing verification. The app is a Vite + React + TypeScript site with pathname routing and no accounts or backend.

## Local setup

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://127.0.0.1:5173`).

## Production build and preview

```bash
npm run build
npm run preview
npm run lint
npm test
```

`npm run build` typechecks and writes `dist/`. `npm run preview` serves that build. `npm test` checks challenge scoring and Learn content.

## Routes

| Page | URL |
| --- | --- |
| Home | `/` |
| Learn | `/learn` |
| Test | `/challenge` |

There is no `/test` route. The activity keeps `/challenge` so existing links stay valid. Unknown paths render the homepage after the app loads. A static host must send extension-less routes to `index.html`; see Vercel below.

## Where to edit content

- Mission and purpose: `src/content/site.ts` (`mission.statement` and `purpose`). The homepage shows the mission. There is no separate purpose section; keep other introductions consistent with `purpose` instead of adding one.
- Homepage sections, survey placeholders, and pillar availability: `src/content/site.ts`. Do not treat the survey figures as final findings while `survey.status` is `"draft"`.
- Learn introduction and the verification guide: `src/content/learn.ts`.
- Articles and thumbnails: add one object to `articles` in `src/content/articles.ts` and put the image in `public/articles/`. Cards are rendered from that list.
- Image credits: the same article object (`imageSourceUrl`, `imageCreator`, `imageLicense`, `imageAttribution`). The current thumbnails are CC0, so the page does not show a credit line. If a future image requires attribution, add that credit outside the linked card.
- Test pairs and answer labels: `src/content/challenge-pairs.ts`. The private filename map is `data/challenge-image-mapping.json`. Do not put the labeled originals (`challenge-images-originals/`) in `public/`. The answer data ships in the client bundle; it is not a hidden server secret.

## Vercel

`vercel.json` rewrites unmatched routes to `/index.html`. Vercel serves real files first, so `/assets/*`, `/articles/*`, `/challenge/*.jpg`, and the logo are not replaced by the page. Set the project’s output directory to `dist` and the build command to `npm run build`. Do not commit `.env` files or the `.vercel` folder.

## Still unfinished

- Watch videos and the in-person workshop are marked coming soon. Their links stay unpublished until real URLs exist.
- Social profile URLs are still empty.
- Survey figures, geography, and dates are draft placeholders.
- Test-pair explanations, sources, and verification takeaways are empty until they can be stated accurately.
- Direct refresh of `/learn` and `/challenge` depends on the host rewrite. Confirm it once on the Vercel deployment.
