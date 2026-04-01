# Google Tag Manager Setup Guide — BuildLocal.agency

Your GTM container ID: **GTM-N33FLLHL**
GTM is already installed site-wide. This guide walks you through creating every tag, trigger, and variable you need.

---

## Table of Contents

1. [Enable Built-in Variables](#1-enable-built-in-variables)
2. [Create Custom Variables](#2-create-custom-variables)
3. [Conversion Tracking (Form Submissions)](#3-conversion-tracking)
4. [Scroll Depth Tracking](#4-scroll-depth-tracking)
5. [Button Click Tracking](#5-button-click-tracking)
6. [Form Abandonment Tracking](#6-form-abandonment-tracking)
7. [Page Engagement (Time on Page)](#7-page-engagement)
8. [Landing Page View Tracking](#8-landing-page-view-tracking)
9. [Form Interaction Tracking](#9-form-interaction-tracking)
10. [Google Ads (when ready)](#10-google-ads-placeholder)
11. [Meta Pixel (when ready)](#11-meta-pixel-placeholder)
12. [Testing Everything](#12-testing-everything)
13. [Summary of All Events](#13-summary)

---

## 1. Enable Built-in Variables

Before creating anything, you need to enable some built-in variables that GTM uses.

1. Go to **Variables** in the left sidebar
2. Click **Configure** (top right of "Built-In Variables" section)
3. Enable ALL of these by checking them:

**Pages:**
- Page URL
- Page Path
- Page Hostname
- Referrer

**Clicks:**
- Click Element
- Click Classes
- Click ID
- Click Target
- Click URL
- Click Text

**Forms:**
- Form Element
- Form Classes
- Form ID
- Form Target
- Form URL
- Form Text

**Visibility:**
- Percent Visible

**Scrolling:**
- Scroll Depth Threshold
- Scroll Depth Units
- Scroll Direction

4. Click the **X** to close

---

## 2. Create Custom Variables

These pull data from the dataLayer events your website pushes.

### Variable: dlv - form_type

1. Go to **Variables** > **User-Defined Variables** > **New**
2. Name: `dlv - form_type`
3. Variable Type: **Data Layer Variable**
4. Data Layer Variable Name: `form_type`
5. Data Layer Version: **Version 2**
6. Save

### Variable: dlv - lp_variant

1. New Variable
2. Name: `dlv - lp_variant`
3. Variable Type: **Data Layer Variable**
4. Data Layer Variable Name: `lp_variant`
5. Data Layer Version: **Version 2**
6. Save

### Variable: dlv - plan_selected

1. New Variable
2. Name: `dlv - plan_selected`
3. Variable Type: **Data Layer Variable**
4. Data Layer Variable Name: `plan_selected`
5. Data Layer Version: **Version 2**
6. Save

### Variable: dlv - business_type

1. New Variable
2. Name: `dlv - business_type`
3. Variable Type: **Data Layer Variable**
4. Data Layer Variable Name: `business_type`
5. Data Layer Version: **Version 2**
6. Save

### Variable: dlv - abandon_slide

1. New Variable
2. Name: `dlv - abandon_slide`
3. Variable Type: **Data Layer Variable**
4. Data Layer Variable Name: `abandon_slide`
5. Data Layer Version: **Version 2**
6. Save

### Variable: attr - data-track

This reads the `data-track` attribute from clicked elements.

1. New Variable
2. Name: `attr - data-track`
3. Variable Type: **Auto-Event Variable**
4. Variable Type: **Element Attribute**
5. Attribute Name: `data-track`
6. Save

### Variable: attr - data-track-label

1. New Variable
2. Name: `attr - data-track-label`
3. Variable Type: **Auto-Event Variable**
4. Variable Type: **Element Attribute**
5. Attribute Name: `data-track-label`
6. Save

---

## 3. Conversion Tracking (Form Submissions)

This is the most important one. It fires when someone submits the contact form OR the free mockup form.

### Trigger: Form Submit — All Forms

1. Go to **Triggers** > **New**
2. Name: `CE - form_submit`
3. Trigger Type: **Custom Event**
4. Event name: `form_submit`
5. This trigger fires on: **All Custom Events**
6. Save

### Tag: GA4 Event — Form Submission

> **Note:** You need a GA4 Measurement ID first. If you don't have Google Analytics 4 set up yet, create a property at analytics.google.com and grab your Measurement ID (starts with `G-`).

1. Go to **Tags** > **New**
2. Name: `GA4 Event - Form Submission`
3. Tag Type: **Google Analytics: GA4 Event**
4. Measurement ID: `G-XXXXXXXXXX` (your GA4 ID)
5. Event Name: `generate_lead`
6. Event Parameters:
   | Parameter Name | Value |
   |---|---|
   | form_type | `{{dlv - form_type}}` |
   | plan_selected | `{{dlv - plan_selected}}` |
   | business_type | `{{dlv - business_type}}` |
   | page_path | `{{Page Path}}` |
7. Triggering: Select `CE - form_submit`
8. Save

### Why "generate_lead"?

GA4 has a recommended event called `generate_lead`. Using this name means GA4 automatically recognizes it as a conversion event, and it will show up in the standard reports without extra configuration. You can mark it as a conversion in GA4 under Admin > Events.

---

## 4. Scroll Depth Tracking

See how far people scroll on your landing pages. This tells you if people are even seeing your CTAs, testimonials, and pricing.

### Trigger: Scroll Depth — 25/50/75/100

1. Go to **Triggers** > **New**
2. Name: `Scroll Depth - 25/50/75/100`
3. Trigger Type: **Scroll Depth**
4. Check **Vertical Scroll Depths**
5. Select **Percentages**
6. Percentages: `25, 50, 75, 100`
7. This trigger fires on: **Some Pages**
8. Condition: `Page Path` **matches RegEx** `/lp/.*|^/$|/pricing|/about|/how-it-works`
   *(This tracks scroll on landing pages, homepage, pricing, about, and how-it-works — the pages that matter most)*
9. Save

### Tag: GA4 Event — Scroll Depth

1. Go to **Tags** > **New**
2. Name: `GA4 Event - Scroll Depth`
3. Tag Type: **Google Analytics: GA4 Event**
4. Measurement ID: `G-XXXXXXXXXX` (your GA4 ID)
5. Event Name: `scroll_depth`
6. Event Parameters:
   | Parameter Name | Value |
   |---|---|
   | scroll_threshold | `{{Scroll Depth Threshold}}` |
   | page_path | `{{Page Path}}` |
7. Triggering: Select `Scroll Depth - 25/50/75/100`
8. Save

### What you'll learn:

- If only 30% of LP visitors reach 50% scroll, your hero isn't compelling enough
- If 80% reach the testimonials (75%) but don't convert, the CTA after testimonials needs work
- If people scroll to 100% but don't convert, the page has engagement but the offer isn't strong enough

---

## 5. Button Click Tracking

This is where it gets good. Every CTA button on your site now has a `data-track` attribute. GTM can read it to tell you EXACTLY which button someone clicked.

### Trigger: Click — All CTA Buttons

1. Go to **Triggers** > **New**
2. Name: `Click - All CTA Buttons`
3. Trigger Type: **Click - All Elements**
4. This trigger fires on: **Some Clicks**
5. Condition: `attr - data-track` **is not equal to** `undefined`
   *(This fires on any click where the element has a data-track attribute)*
6. Save

### Tag: GA4 Event — CTA Click

1. Go to **Tags** > **New**
2. Name: `GA4 Event - CTA Click`
3. Tag Type: **Google Analytics: GA4 Event**
4. Measurement ID: `G-XXXXXXXXXX`
5. Event Name: `cta_click`
6. Event Parameters:
   | Parameter Name | Value |
   |---|---|
   | button_location | `{{attr - data-track}}` |
   | button_label | `{{attr - data-track-label}}` |
   | page_path | `{{Page Path}}` |
7. Triggering: Select `Click - All CTA Buttons`
8. Save

### What each `data-track` value means:

| data-track value | Where it is | What it tells you |
|---|---|---|
| `nav-cta` | Navigation bar CTA button (desktop) | How many people click the top-of-page CTA |
| `nav-mobile-cta` | Mobile menu CTA button | Mobile menu engagement |
| `nav-hamburger` | Hamburger menu icon | Are mobile users exploring or bouncing? |
| `hero-cta` | Hero section main CTA | First-impression conversion intent |
| `offer-cta` | Value stack/offer section CTA | Mid-page conversion after seeing features |
| `cta-banner` | CTA banner section | Late-page conversion (CtaBanner component) |
| `final-cta` | Bottom CTA (mockup page) | Last-chance conversion |
| `pricing-cta` | Pricing tier buttons | Which tier people are interested in (label = tier name) |
| `testimonials-cta` | CTA below testimonials | Conversion after social proof |
| `sticky-mobile-cta` | Sticky bottom bar on mobile | Persistent mobile CTA engagement |
| `form-submit-cta` | Inline form submit button | Mockup form submission clicks |

### What you'll learn:

- **Which buttons drive the most conversions** — if `hero-cta` gets 60% of clicks, your hero is doing its job
- **Pricing tier interest** — the `pricing-cta` label tells you which plan (Professional, Growth, Scale) people click most
- **Mobile vs desktop behavior** — compare `sticky-mobile-cta` vs `nav-cta` clicks
- **Where people drop off** — if `hero-cta` gets lots of clicks but `offer-cta` gets none, people are converting early (good) or leaving before the offer section (investigate)

---

## 6. Form Abandonment Tracking

When someone opens the contact form but closes it without submitting, that's a form abandonment. This tells you where the friction is.

### Trigger: Form Abandon

1. Go to **Triggers** > **New**
2. Name: `CE - form_abandon`
3. Trigger Type: **Custom Event**
4. Event name: `form_abandon`
5. This trigger fires on: **All Custom Events**
6. Save

### Tag: GA4 Event — Form Abandonment

1. Go to **Tags** > **New**
2. Name: `GA4 Event - Form Abandonment`
3. Tag Type: **Google Analytics: GA4 Event**
4. Measurement ID: `G-XXXXXXXXXX`
5. Event Name: `form_abandon`
6. Event Parameters:
   | Parameter Name | Value |
   |---|---|
   | form_type | `{{dlv - form_type}}` |
   | abandon_slide | `{{dlv - abandon_slide}}` |
   | page_path | `{{Page Path}}` |
7. Triggering: Select `CE - form_abandon`
8. Save

### What the `abandon_slide` value tells you:

| Slide | What it means |
|---|---|
| 1 | Abandoned on "Tell us about you" (name/email/phone) — too much info asked too soon? |
| 2 | Abandoned on "About your business" (plan selection) — pricing scared them? |
| 3 | Abandoned on "Almost done" (referral/notes) — so close! Maybe simplify this slide |

---

## 7. Page Engagement (Time on Page)

Track how long people stay. If someone is on your LP for 3+ minutes, they're deeply interested.

### Trigger: Timer — 30 Seconds

1. Go to **Triggers** > **New**
2. Name: `Timer - 30 seconds`
3. Trigger Type: **Timer**
4. Event Name: `gtm.timer`
5. Interval: `30000` (milliseconds)
6. Limit: `1`
7. This trigger fires on: **Some Pages**
8. Condition: `Page Path` **matches RegEx** `/lp/.*|^/$`
9. Save

### Trigger: Timer — 60 Seconds

1. Same as above but:
2. Name: `Timer - 60 seconds`
3. Interval: `60000`
4. Save

### Trigger: Timer — 180 Seconds

1. Same as above but:
2. Name: `Timer - 180 seconds`
3. Interval: `180000`
4. Save

### Tag: GA4 Event — Time on Page (30s)

1. Go to **Tags** > **New**
2. Name: `GA4 Event - Time 30s`
3. Tag Type: **Google Analytics: GA4 Event**
4. Measurement ID: `G-XXXXXXXXXX`
5. Event Name: `time_on_page`
6. Event Parameters:
   | Parameter Name | Value |
   |---|---|
   | time_threshold | `30` |
   | page_path | `{{Page Path}}` |
7. Triggering: Select `Timer - 30 seconds`
8. Save

**Repeat for 60s and 180s** — create two more tags with the corresponding triggers and `time_threshold` values of `60` and `180`.

### What you'll learn:

- **30s**: Basic engagement — they're actually reading, not bouncing
- **60s**: Solid interest — scrolling through content
- **180s**: High intent — this person is seriously considering you. Great retargeting audience.

---

## 8. Landing Page View Tracking

Your LPs already push an `lp_view` event when loaded. Let's capture it.

### Trigger: LP View

1. Go to **Triggers** > **New**
2. Name: `CE - lp_view`
3. Trigger Type: **Custom Event**
4. Event name: `lp_view`
5. This trigger fires on: **All Custom Events**
6. Save

### Tag: GA4 Event — LP View

1. Go to **Tags** > **New**
2. Name: `GA4 Event - LP View`
3. Tag Type: **Google Analytics: GA4 Event**
4. Measurement ID: `G-XXXXXXXXXX`
5. Event Name: `lp_view`
6. Event Parameters:
   | Parameter Name | Value |
   |---|---|
   | lp_variant | `{{dlv - lp_variant}}` |
   | page_path | `{{Page Path}}` |
7. Triggering: Select `CE - lp_view`
8. Save

---

## 9. Form Interaction Tracking

Track when someone starts filling out a form (first field focus). Compare form_start vs form_submit to calculate your form completion rate.

### Trigger: Form Start

1. Go to **Triggers** > **New**
2. Name: `CE - form_start`
3. Trigger Type: **Custom Event**
4. Event name: `form_start`
5. This trigger fires on: **All Custom Events**
6. Save

### Trigger: Form Open (Contact Modal)

1. Go to **Triggers** > **New**
2. Name: `CE - form_open`
3. Trigger Type: **Custom Event**
4. Event name: `form_open`
5. This trigger fires on: **All Custom Events**
6. Save

### Tag: GA4 Event — Form Start

1. Go to **Tags** > **New**
2. Name: `GA4 Event - Form Start`
3. Tag Type: **Google Analytics: GA4 Event**
4. Measurement ID: `G-XXXXXXXXXX`
5. Event Name: `form_start`
6. Event Parameters:
   | Parameter Name | Value |
   |---|---|
   | form_type | `{{dlv - form_type}}` |
   | page_path | `{{Page Path}}` |
7. Triggering: Select `CE - form_start`
8. Save

### Tag: GA4 Event — Form Open

1. Same setup
2. Name: `GA4 Event - Form Open`
3. Event Name: `form_open`
4. Same parameters
5. Triggering: Select `CE - form_open`
6. Save

### Key metric: Form Completion Rate

`form_submit / form_start * 100 = completion rate`

- Contact modal: `form_submit / form_open * 100`
- Mockup form: `form_submit / form_start * 100`

If your completion rate is below 30%, the form has too much friction.

---

## 10. Google Ads (When Ready)

When you get your Google Ads account, you'll need two things from it:

1. **Conversion ID** (looks like: `AW-123456789`)
2. **Conversion Label** (looks like: `AbCdEfGhIjKlMn`)

### Tag: Google Ads Conversion — Strategy Call

1. Go to **Tags** > **New**
2. Name: `Google Ads - Strategy Call Conversion`
3. Tag Type: **Google Ads Conversion Tracking**
4. Conversion ID: `AW-XXXXXXXXX`
5. Conversion Label: `XXXXXXXXXXXX`
6. Conversion Value: `195` (or whatever your avg first month value is)
7. Currency Code: `USD`
8. Triggering: Select `CE - form_submit`
   - Add a condition: `dlv - form_type` **equals** `contact`
9. Save

### Tag: Google Ads Conversion — Free Mockup

1. Same setup but:
2. Name: `Google Ads - Mockup Request Conversion`
3. Different Conversion Label (create a separate conversion in Google Ads)
4. Conversion Value: `50` (lower value since it's top-of-funnel)
5. Triggering: Select `CE - form_submit`
   - Add a condition: `dlv - form_type` **equals** `free-mockup`
6. Save

---

## 11. Meta Pixel (When Ready)

When you create your Meta Pixel, you'll get a Pixel ID (looks like: `123456789012345`).

### Tag: Meta Pixel — Base Code

1. Go to **Tags** > **New**
2. Name: `Meta Pixel - Base Code`
3. Tag Type: **Custom HTML**
4. HTML:
```html
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_PIXEL_ID_HERE');
fbq('track', 'PageView');
</script>
```
5. Triggering: **All Pages**
6. Save

### Tag: Meta Pixel — Lead Event

1. Go to **Tags** > **New**
2. Name: `Meta Pixel - Lead`
3. Tag Type: **Custom HTML**
4. HTML:
```html
<script>
fbq('track', 'Lead', {
  content_name: '{{dlv - form_type}}',
  content_category: 'form_submission'
});
</script>
```
5. Triggering: Select `CE - form_submit`
6. Save

---

## 12. Testing Everything

### How to test with GTM Preview Mode:

1. In GTM, click **Preview** (top right)
2. Enter your site URL: `https://buildlocal.agency/lp/strategy-call`
3. Your site opens in a new tab with a debug panel at the bottom
4. The panel shows every tag that fires and every event that happens

### Test checklist:

| Test | What to do | What you should see in Preview |
|---|---|---|
| Page load | Load any LP | `lp_view` event fires, `GA4 Event - LP View` tag fires |
| Button click | Click "Book My Free Call" in nav | `cta_click` event with `button_location: nav-cta` |
| Hero CTA | Click the main hero button | `cta_click` with `button_location: hero-cta` |
| Pricing button | Click a pricing tier CTA | `cta_click` with `button_location: pricing-cta`, `button_label: Growth` |
| Scroll | Scroll down the page | `scroll_depth` events at 25%, 50%, 75%, 100% |
| Form open | Click any CTA that opens the form | `form_open` event fires |
| Form abandon | Open form, fill in name, then close it | `form_abandon` event with `abandon_slide: 1` |
| Form submit | Complete and submit the form | `form_submit` event fires |
| Timer | Stay on page 30s | `time_on_page` event with `time_threshold: 30` |
| Mockup form start | Click into the name field on /lp/free-mockup | `form_start` event fires |
| Mobile sticky CTA | Open on mobile, tap sticky bottom bar | `cta_click` with `button_location: sticky-mobile-cta` |

### Once everything looks good:

1. Click **Submit** (top right in GTM)
2. Name your version: `v1.0 - Full tracking setup`
3. Click **Publish**

---

## 13. Summary of All Events

### DataLayer Events (pushed by your website code):

| Event | When it fires | Key data |
|---|---|---|
| `lp_view` | Landing page loads | `lp_variant`: "strategy-call" or "free-mockup" |
| `form_open` | Contact modal opens | `form_type`: "contact" |
| `form_start` | First field focused (mockup form) | `form_type`: "free-mockup" |
| `form_submit` | Form successfully submitted | `form_type`, `plan_selected`, `business_type` |
| `form_abandon` | Modal closed without submitting | `form_type`, `abandon_slide` |

### GTM Triggers:

| Trigger | Type | Fires on |
|---|---|---|
| `CE - form_submit` | Custom Event | Any form submission |
| `CE - form_abandon` | Custom Event | Form closed without submitting |
| `CE - form_start` | Custom Event | First form field interaction |
| `CE - form_open` | Custom Event | Contact modal opened |
| `CE - lp_view` | Custom Event | Landing page loaded |
| `Scroll Depth - 25/50/75/100` | Scroll Depth | User scrolls to threshold |
| `Click - All CTA Buttons` | Click - All Elements | Any element with data-track attribute |
| `Timer - 30/60/180 seconds` | Timer | Time spent on page |

### Tags (GA4 Events):

| Tag | GA4 Event Name | Key Parameters |
|---|---|---|
| GA4 Event - Form Submission | `generate_lead` | form_type, plan_selected, business_type |
| GA4 Event - Form Abandonment | `form_abandon` | form_type, abandon_slide |
| GA4 Event - Form Start | `form_start` | form_type |
| GA4 Event - Form Open | `form_open` | form_type |
| GA4 Event - CTA Click | `cta_click` | button_location, button_label |
| GA4 Event - Scroll Depth | `scroll_depth` | scroll_threshold |
| GA4 Event - LP View | `lp_view` | lp_variant |
| GA4 Event - Time 30s/60s/180s | `time_on_page` | time_threshold |

### Total setup:

- **7 custom variables**
- **8 triggers**
- **10 tags** (+ 2 placeholder for Google Ads, 2 for Meta Pixel when ready)

---

## Quick Reference: data-track Button Map

```
MAIN SITE:
  nav-cta              → Desktop nav "Book a Free Strategy Call"
  nav-mobile-cta       → Mobile menu "Book a Free Strategy Call"
  nav-hamburger        → Hamburger menu icon
  pricing-cta          → Pricing tier buttons (label = tier name)
  cta-banner           → CTA banner section
  testimonials-cta     → CTA below testimonials
  sticky-mobile-cta    → Sticky bottom bar (mobile)

LANDING PAGES:
  nav-cta              → LP nav CTA button
  hero-cta             → Hero main CTA
  offer-cta            → Value stack section CTA
  final-cta            → Bottom CTA (mockup page only)
  form-submit-cta      → Inline form submit button (mockup page)
```
