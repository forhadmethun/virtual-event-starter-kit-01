# 100ms Integrations

## Info

- `hms` folder has all the components used by 100ms
- `<Live />` component is an entry point to Live Room
- `/lib/hms/types.ts` contains all types used by 100ms
- `getToken.ts` is a helper function to generate token

## Changes Done (based on each commits)

- Added Tailwind for ease.
- Config files in `.eslintignore`

---

- Map all colors to CSS variables (easy to make it themeable)
- Add new color variants to Tailwind config

---

- Removed Tailwind base styles (conflicting with prev styles)
- Added 100ms Token endpoint env variable
- Added `roomId` & `isLive` attribute
- Updated types for datocms response

---

- Created `<Live />` component is an entry point to Live Room
- Created `/lib/hms/types.ts` contains all types used by 100ms
- Added `getToken.ts` is a helper function to generate token

---

- Installed 100ms's Packages
- Wrapped App component with `<HMSRoomProvider />`
- 2 views -> Join form & Room
- Generating token and rendering views

---

- Create `<Button />` component
- Role based Join Form logic
- Viewer's Join form
- Speaker/Mod Preview (needs Settings)
- Avatar Component + Utilities

## Todo

- [ ] Prev `postcss.config.json` merging with `postcss.config.js`
- [ ] Write meaningful components explanation (take help from `@Shail`)
- [ ] Remove all `@ts-ignore`
- [ ] Better Error Messages (?)
- [ ] Throw error if Token endpoint is undefined
- [ ] Add Focus Rings to Button , Inputs (`@Chris`)

## Good stuff

- Throws error when joining with wrong Role name
- Types extracted from `rolesList` into string literals
