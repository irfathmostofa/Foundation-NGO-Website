# Email.js template

Use one EmailJS template for donation receipts, contact auto-replies, membership confirmations, career confirmations, and admin alerts. The server fills every field from `lib/email/templates.ts`.

## Dashboard setup

1. Create an account at [EmailJS](https://dashboard.emailjs.com/sign-up).
2. Add an email service (Gmail, Outlook, or SMTP).
3. Open Email Templates and create a template named `Hope Foundation notices`.
4. Copy the Service ID, Template ID, Public Key, and Private Key into Admin → Settings (or `.env.local`).
5. Account → Security: enable **Allow EmailJS API for non-browser applications** and keep the private key on the server only.

Without the private key, EmailJS rejects server-side REST calls.

## Template settings

Paste these into the EmailJS template editor (not the HTML body):

| Field | Value |
| --- | --- |
| To email | `{{to_email}}` |
| To name | `{{to_name}}` |
| From name | `{{from_name}}` |
| Reply to | `{{reply_to}}` |
| Subject | `{{subject}}` |

Leave From email as the connected service address.

## Template variables

The REST payload in `lib/email/emailjs.ts` sends:

| Variable | Use |
| --- | --- |
| `{{to_email}}` | Recipient |
| `{{to_name}}` | Recipient display name |
| `{{subject}}` | Subject line |
| `{{title}}` | Headline in the body |
| `{{message}}` | Plain-text body |
| `{{{html_message}}}` | HTML body (triple braces, unescaped) |
| `{{reply_to}}` | Reply-To header |
| `{{from_name}}` | Foundation name |
| `{{foundation_name}}` | Same foundation name |
| `{{site_url}}` | Public site URL |
| `{{year}}` | Current year |

Use `{{{html_message}}}` with three braces so paragraphs are not escaped.

## HTML body

Copy this into the EmailJS template content (HTML mode):

```html
<!DOCTYPE html>
<html lang="bn">
  <body style="margin:0;padding:0;background:#f4f1e8;font-family:'Source Sans 3',Nunito Sans,Segoe UI,sans-serif;color:#2f3b2f;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1e8;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#fffdf8;border:1px solid #d7e2d4;border-radius:18px;overflow:hidden;">
            <tr>
              <td style="background:#1f4d3a;padding:28px 32px;">
                <p style="margin:0;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#d7f0dc;">{{foundation_name}}</p>
                <h1 style="margin:10px 0 0;font-size:26px;line-height:1.3;color:#f7f3e8;">{{title}}</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px 8px;font-size:16px;line-height:1.7;color:#2f3b2f;">
                {{{html_message}}}
              </td>
            </tr>
            <tr>
              <td style="padding:8px 32px 28px;">
                <a href="{{site_url}}" style="display:inline-block;background:#2f6f4e;color:#f7f3e8;text-decoration:none;padding:12px 18px;border-radius:12px;font-size:14px;">{{foundation_name}}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 32px 24px;border-top:1px solid #d7e2d4;font-size:12px;color:#6b7468;">
                {{foundation_name}} · {{year}}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
```

Plain-text fallback (optional Content → Text):

```text
{{title}}

{{message}}

{{foundation_name}}
{{site_url}}
```

## Test payload

Use EmailJS **Test It** with:

```json
{
  "to_email": "you@example.com",
  "to_name": "Demo Donor",
  "subject": "1 Taka Tree Plantation · Donation receipt",
  "title": "Your gift arrived",
  "message": "Dear Demo Donor,\n\nBDT 30 is now on our ledger.",
  "html_message": "<p>Dear Demo Donor,</p><p>BDT 30 is now on our ledger.</p>",
  "reply_to": "ektakaybrikkhoropon@gmail.com",
  "from_name": "1 Taka Tree Plantation",
  "foundation_name": "1 Taka Tree Plantation",
  "site_url": "http://localhost:3000",
  "year": "2026"
}
```

## What the site sends

| Event | Recipients |
| --- | --- |
| Successful SSL Commerz donation | Donor receipt |
| Contact form | Visitor auto-reply + admin copy |
| Become a member | Applicant confirmation + admin copy |
| Career application | Applicant confirmation + admin copy |

Public emails follow the visitor locale (Bangla default). Admin alerts stay in English. `contact_email` in site settings is the admin inbox.

## Environment fallback

If Admin → Settings is empty, the server can still send with:

```bash
EMAILJS_SERVICE_ID=service_xxxxxxx
EMAILJS_TEMPLATE_ID=template_xxxxxxx
EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxxxx
EMAILJS_PRIVATE_KEY=xxxxxxxxxxxxxxxxxxxx
EMAILJS_CONTACT_EMAIL=ektakaybrikkhoropon@gmail.com
```

Admin values override environment values when both exist.
