# Venus Club Website

Static multi-page website for `venusbbk.com`.

## Editable business details

Update these values in [site-data.js](/Volumes/work/venusclub/site-data.js):

- `phoneDisplay`
- `phoneHref`
- `whatsappHref`
- `addressLine1`
- `addressLine2`
- `mapsHref`
- `email`
- `guestCapacity`

## Local preview

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Publish options

This repo is prepared to work as a static site for:

- GitHub Pages
- Cloudflare Pages

For GitHub Pages custom domain support, keep:

- `CNAME`
- `.nojekyll`

## Before final production launch

Replace placeholder business data and real photography:

- exact phone and WhatsApp
- exact address and Google Maps link
- real guest capacity
- real venue photos
- confirmed venue facilities and package details
