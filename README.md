# <img src="https://i.postimg.cc/85mKDbX8/EliteSoftware-Company-Logo.png" alt="EliteSoftwareTech Logo" height="80">

# Main.EliteSoftwareTech.cc

**Classic Windows Engineering • Frutiger Aero • Open-Source Utilities**

Official source repository for [`main.elitesoftwaretech.cc`](https://main.elitesoftwaretech.cc/) (also served at [`elitesoftwaretech.cc`](https://elitesoftwaretech.cc/)).

## What This Portal Includes
- **Welcome Station:** Verified background on Zachary (`TheShadyRainbow4`), the Windows Vista/Aero & Win32 focus, flagship **PidgeWin32** links, and real toolchain domains.
- **GitHub Radar:** Live repository feed fetched from `TheShadyRainbow4` and `EliteSoftwareTech-cc` via the GitHub REST API, plus an overview of the local Desktop Projects pipeline.
- **Project Archive:** Frutiger Aero card gallery modeled after PidgeWin32 (populated incrementally as each repository's standalone site and release go live).
- **System Console:** Live browser-side reachability monitor for `*.elitesoftwaretech.cc` endpoints alongside a Cloudflare-backed download/latency speed test.
- **Media Toolkit:** Client-side batch Image Processor and WAV Audio Encoder.
- **Knowledge Base:** Live markdown viewer pulling documentation directly from GitHub repositories.
- **Direct Liaison:** Contact form wired to `functions/api/contact.js` (Cloudflare Pages Function using `RESEND_API_KEY` to email `support@elitesoftwaretech.cc`) with automatic `mailto:` fallback.

## Deployment
Hosted on **Cloudflare Pages** (`elitesoftwaretech-main` / `elitesoftwaretech-site.pages.dev`).

To enable server-side email delivery via `/api/contact`, add the `RESEND_API_KEY` secret in **Cloudflare Dashboard → Workers & Pages → `elitesoftwaretech-main` → Settings → Environment variables**.

---
**Maintainer:** Zachary Whiteman ([`TheShadyRainbow4`](https://github.com/TheShadyRainbow4)) • South Carolina, USA
