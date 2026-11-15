# curryconsulting-website
Website repository for Curry Consulting

## Contact form

The contact form uses Netlify Forms (`contact`) and Netlify-provided reCAPTCHA. In Netlify, enable form detection and deploy the site, then add an email notification for the `contact` form to `contact@currycs.com`. Confirm the recipient if Netlify requests it. Successful submissions redirect to `thanks.html`. Netlify injects the CAPTCHA on deploy, so it does not appear in a local `file://` preview.
