# Hope Community Church website: set-up notes

## How to upload
Upload every `.html` file and the new `css` folder (`tailwind.css` and `site.css`) to the same place as your existing site. Your `images`, `icons` and any other folders stay as they are. Keep `css/tailwind.css` and `css/site.css` next to the pages: every page now loads them.

## 1. Restrict the YouTube API key (5 minutes, do this soon)
The key sits in `videos.html` where anyone can read it. Make it useless to anyone else:
1. Go to console.cloud.google.com and choose the project the key belongs to.
2. APIs & Services, then Credentials, then click the key.
3. Application restrictions: choose "Websites" and add `https://www.hopecommunity-church.co.uk/*` and `https://hopecommunity-church.co.uk/*`.
4. API restrictions: choose "Restrict key" and tick only "YouTube Data API v3".
5. Save, then reload the Videos page to confirm it still works.

## 2. Analytics (not switched on yet)
Every page has a line `<!-- ANALYTICS: paste your analytics snippet here -->` just before `</head>`. Paste your provider's snippet there on all pages. A privacy-friendly tool such as Plausible or Fathom needs no cookie banner. Google Analytics (GA4) does, so you would need a consent banner and a privacy policy update. The privacy policy currently says you do not use analytics cookies, so update section 11 when you add one.

## 3. Test before and after uploading
- Submit each form once (Contact, Hope for Recovery, Get Involved, Support Us, and the prayer form) and check the message reaches the Formspree inbox.
- Click Support Us in the menu, then "Give Online" and confirm DonorBox opens. Check DonorBox offers both one-off and monthly gifts.
- Open the site on a phone and on a laptop, and tab through the home page with the keyboard.

## 4. Things only you or the trustees can supply
- **Gift Aid:** add a line on the Support Us page if you are registered.
- **"What your gift does":** add real examples such as "£X pays for Y" once trustees have agreed them.
- **"Every donation goes directly to Hope for Recovery programs":** this appears in the Skip a Coffee sections on the home and Hope for Recovery pages. Check it is accurate before you keep it.
- **Team bios:** the ten "[Bio to be added]" lines are hidden. Send the bios and they can go back in.
- **Privacy policy and terms:** I updated the wording to match the services the site actually uses. Please have a trustee review it, as this is not legal advice.
- **Share image:** pages use `images/church1.webp` as the preview picture. Some social networks handle that format poorly, so add a 1200 x 630 JPG and update the `og:image` line.
- **Giving routes:** the old PayPal "Give now" link on the Privacy and Terms pages is gone. DonorBox is the main route and Buy Me a Coffee is a small secondary link on the Support Us page. Tell me if you want PayPal added back.

## 5. Housekeeping
- The graduation banner on the home page hides itself after 27 November 2026.
- The old DonorBox pop-up code in `index.html` is no longer used and can be deleted later.
- The home page "Our Weekly Services" cards flip on mouse hover only, so keyboard and touch users never see the back of each card. Worth redesigning later.
