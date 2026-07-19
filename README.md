# Venus Club Website

Static multi-page website for `venusbbk.com`.

## Editable business details

Update these values in [site-data.js](/Volumes/work/venusclub/site-data.js):

- `phoneDisplay`
- `phoneHref`
- `whatsappHref`
- `instagramHref`
- `addressLine1`
- `addressLine2`
- `mapsHref`
- `email`
- `guestCapacity`
- `businessHoursDisplay`
- `serviceAreas`
- `seoKeywords`

## Local preview

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Publish options

This repo is prepared to work as a static site for:

- GitHub Pages
- Cloudflare Pages

## Inquiry form storage with Google Sheets

The website form is ready to submit to a Google Apps Script web app.

1. Create a new Google Sheet for inquiries.
2. Open `Extensions` -> `Apps Script`.
3. Replace the default script with the contents of [google-apps-script.gs](/Volumes/work/venusclub/google-apps-script.gs).
4. Deploy it as a web app:
   - Execute as: `Me`
   - Who has access: `Anyone`
5. Copy the deployed web app URL.
6. Paste that URL into `inquiryEndpoint` inside [site-data.js](/Volumes/work/venusclub/site-data.js).
7. Push the site again.

Submitted inquiry columns:

- `submitted_at`
- `name`
- `phone`
- `event_type`
- `preferred_date`
- `expected_guests`
- `description`
- `source_page`

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
