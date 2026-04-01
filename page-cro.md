# BuildLocal.agency -- Conversion Rate Optimization Playbook

**Goal**: 10 qualified leads/day (phone calls + form submissions)
**Primary CTA**: Call (778) 237-4700 or fill out the contact form
**Audience**: Trades business owners (roofers, plumbers, HVAC, landscapers, etc.)
**Pricing**: $195--$595/month managed websites
**Scale**: 350+ pages across industry, city, and industry+city combinations

---

## Table of Contents

1. [Cross-Cutting CRO Principles](#1-cross-cutting-cro-principles)
2. [Homepage CRO Template](#2-homepage-cro-template)
3. [Industry Hub Page CRO Template](#3-industry-hub-page-cro-template)
4. [City Hub Page CRO Template](#4-city-hub-page-cro-template)
5. [Industry+City Page CRO Template](#5-industrycity-page-cro-template)
6. [Blog Post CRO Template](#6-blog-post-cro-template)
7. [Comparison Page CRO Template](#7-comparison-page-cro-template)
8. [Contact Form Optimization](#8-contact-form-optimization)
9. [Phone Number Strategy](#9-phone-number-strategy)
10. [Mobile-Specific CRO](#10-mobile-specific-cro)
11. [Trust Signal Placement Strategy](#11-trust-signal-placement-strategy)
12. [A/B Test Priority List](#12-ab-test-priority-list)
13. [Page Speed CRO](#13-page-speed-cro)

---

## 1. Cross-Cutting CRO Principles

These rules apply to every single page on BuildLocal.agency. No exceptions.

### The Dual CTA Pattern

Every page must present two conversion paths, always:

| Path | Who it serves | Implementation |
|------|--------------|----------------|
| **Phone call** (primary) | High-intent, urgent, on-the-job trades owners who want to talk now | Click-to-call link: `<a href="tel:+17782374700">(778) 237-4700</a>` |
| **Contact form** (secondary) | Researching, comparing, after-hours visitors who want to be contacted | "Book a Free Strategy Call" button that opens the form modal |

**Why phone is primary**: A trades owner standing on a roof between jobs is not going to fill out a 3-slide form. He will tap a phone number. Emergency trades (roofing, HVAC, plumbing, water damage) skew even harder toward phone. The form catches everyone else -- people browsing at night, people who want to think about it, people who dislike phone calls.

**Rule**: Never show a form CTA without a phone number nearby. Never show a phone number without a form CTA nearby. They work as a pair.

### Phone Number Visibility Rules

The phone number `(778) 237-4700` must appear in:
- Navigation bar (desktop: full number as text, mobile: phone icon with number)
- Hero section (click-to-call link, styled as a button or prominent text)
- Every CTA section / CTA banner
- Sticky mobile footer bar (always visible on scroll)
- Footer (full contact details)
- Minimum: 5 instances per page

**Current gap**: The phone number is in the site config but not prominently displayed anywhere. This is the single highest-impact fix available.

### Trust Signal Hierarchy for Trades Owners

Trades owners have been burned by agencies before. They hired someone who took their money and delivered garbage, or disappeared after the deposit. Trust is the conversion bottleneck. Here is what moves the needle, in order of persuasive power:

1. **Before/after portfolio** -- "Show me what you actually built." A screenshot of a real roofing website you built is worth more than any testimonial.
2. **Named testimonials with trade and location** -- "Mike R., R&M Roofing, Phoenix" is 10x more believable than "Mike R." alone. Include photos if possible.
3. **Specific stats** -- "175+ websites built" and "47% average traffic increase" are concrete. Avoid vague claims like "we get results."
4. **Risk reducers** -- "No contracts. Cancel anytime. No setup fees." These directly counter the "I've been burned before" objection.
5. **Process transparency** -- Showing your 4-step process proves you have a system, not just promises.
6. **Logos / associations** -- Least persuasive for this audience. They do not care about your Google Partner badge. Skip unless you have recognizable local brand logos.

### Mobile-First Design Principles

60%+ of BuildLocal traffic comes from mobile. Design decisions must be made for mobile first, then adapted upward.

- **Tap targets**: Minimum 48x48px for all buttons and links. Phone number links must be at least 44px tall.
- **Thumb zone**: Primary CTAs (phone + form buttons) belong in the bottom 60% of the viewport where thumbs can reach them.
- **Single-column layout**: No side-by-side content below 768px. Stack everything.
- **Font sizes**: Body text at minimum 16px (prevents iOS zoom). Headings at 24-32px.
- **CTA button width**: Full-width on mobile (no small floating buttons that are hard to tap on a bumpy truck ride).

### Page Speed Impact on Conversion

| Load time | Conversion impact |
|-----------|------------------|
| 0--2s | Baseline |
| 2--3s | -7% conversions |
| 3--5s | -15% conversions |
| 5--8s | -30% conversions |
| 8s+ | Visitor is gone |

Trades owners are on job sites with spotty cellular connections. A page that loads in 2s on your office WiFi might take 6s on their phone at a construction site. Every optimization matters.

### The 3-Second Rule

When a visitor lands on any BuildLocal page, they must answer three questions within 3 seconds:

1. **What is this?** -- "We build websites for [trade] businesses in [city]."
2. **Is it for me?** -- "[Trade]-specific" or "[City] area" qualifier visible immediately.
3. **What do I do?** -- Phone number and CTA button above the fold.

If any of these three take longer than 3 seconds to answer, the page fails. Trades owners are not going to scroll around figuring out what you do.

---

## 2. Homepage CRO Template

The homepage serves two audiences: direct traffic (people who heard about BuildLocal) and organic/paid traffic that lands on the homepage. It needs to qualify quickly and convert or route to deeper pages.

### Recommended Component Order (Revised)

Current order has conversion problems: the first CTA banner does not appear until position 7, after the visitor has scrolled through 5 sections. Portfolio and testimonials appear before the visitor knows what BuildLocal does for them specifically. Stats are buried at position 8.

**Revised order with rationale:**

| # | Component | Conversion Purpose |
|---|-----------|-------------------|
| 1 | **Nav** | Phone number visible. "Get Started" button opens form. |
| 2 | **Hero** | H1 + subhead + region qualifier + **click-to-call phone number** + CTA button. This is the most important 500px on the site. |
| 3 | **Quick Stats Bar** (new) | "175+ Websites Built / 60+ Managed Monthly / 47% Avg Traffic Increase / 8 Years Experience" -- one-line credibility bar immediately below hero. |
| 4 | **Problem** | Pain points. Makes the visitor feel understood. |
| 5 | **CtaBanner** | First conversion opportunity after establishing the problem. "Book a Free Strategy Call" + phone number. |
| 6 | **Portfolio** | Proof you solve the problem. 3--4 best case studies. |
| 7 | **Testimonials** | Social proof reinforcement. Named, with trade and location. |
| 8 | **ServiceComparison** | BuildLocal vs DIY vs Freelancer. Creates urgency to choose BuildLocal. |
| 9 | **CtaBanner** | Second conversion point. Same CTA, slightly different copy: "See What We'd Build for Your Business" + phone number. |
| 10 | **Process** | 4 steps. Reduces anxiety about what happens next. |
| 11 | **Pricing** | Tier cards with price anchoring. |
| 12 | **Industries** | Routes visitors to their specific trade page (secondary conversion path). |
| 13 | **FAQ** | Objection handling. Top 10 most common questions only (trim from 19). |
| 14 | **Final CtaBanner** | Final conversion point. "Ready to Get More [Trade] Jobs? Call Us or Book a Free Strategy Call." + phone number. |
| 15 | **Footer** | Full contact info, phone, address, links. |

**What changed and why:**

- **Stats moved up** (from position 8 to 3): Credibility must appear immediately. A trades owner needs to know you are not some kid in a basement.
- **First CTA moved up** (from position 7 to 5): Never make a visitor scroll through more than 2 content sections before seeing a CTA. The pattern is: hook (hero) -> empathize (problem) -> convert (CTA).
- **ServiceComparison moved up** (from position 12 to 8): This section is a conversion weapon. It shows why BuildLocal beats alternatives. It belongs before pricing, not after.
- **WhyWebsite removed from homepage**: This section is "why have a website at all" content. If someone is on your website, they already know they need a website. This content belongs on blog posts targeting top-of-funnel keywords, not the homepage.
- **ServicesBreakdown and Services consolidated**: Two separate service sections is redundant. Keep one (ServicesBreakdown as the detailed version) or fold service highlights into the comparison table.
- **MobileCta components removed**: These become unnecessary when you add a sticky mobile footer bar (Section 10 of this document). The sticky bar is always visible and replaces the need for scattered mobile CTAs.
- **FAQ trimmed**: 19 FAQs is too many for the homepage. Keep the 8--10 most conversion-relevant questions (pricing, contracts, timeline, what's included). Move the rest to a dedicated FAQ page or to relevant industry pages.

### Hero Section Changes

**Current hero** (assumed): H1 + subhead + region qualifier + CTA button.

**Revised hero** must include:

```
[H1] Websites That Get [Trade] Businesses More Jobs
[Subhead] Professional websites built and managed for trades businesses across [Region]. 
No contracts. No setup fees. Starting at $195/month.
[CTA Row]
  [Button: green, large] Call (778) 237-4700  ← click-to-call link
  [Button: orange, large] Book a Free Strategy Call  ← opens form modal
[Credibility line] "175+ websites built for trades businesses"
```

**Specific copy notes:**
- H1 uses "More Jobs" not "More Leads" -- trades owners think in jobs, not marketing jargon.
- "$195/month" in the subhead anchors price immediately and filters out people who cannot afford it.
- "No contracts. No setup fees." counters the #1 objection before it forms.
- Phone number is a green button with a phone icon -- green universally signals "call" on mobile.
- Both CTAs are above the fold on mobile (stacked vertically, full-width).

### Sticky Elements

**Desktop**: Nav bar becomes sticky on scroll. Phone number and "Get Started" button always visible in nav.

**Mobile**: Sticky bottom bar (see Section 10 for full specification). This replaces the 3 scattered MobileCta components.

---

## 3. Industry Hub Page CRO Template

**Example**: `/industries/roofing`
**Visitor intent**: "I'm a roofer looking for a website" -- medium-to-high intent. They know their trade, may not have a specific city in mind.

### Recommended Component Order

| # | Component | Conversion Purpose |
|---|-----------|-------------------|
| 1 | **Nav** | Phone number + "Get Started" in nav. |
| 2 | **ServiceHero** | H1: "Websites for Roofing Companies" + subhead + phone number + CTA button. Eyebrow: "Trusted by 25+ Roofing Companies." |
| 3 | **Quick Stats Bar** | "X roofing sites built / Y% lead increase for roofers / Z avg monthly leads." Trade-specific numbers. |
| 4 | **ServiceProblem** | Roofing-specific pain points. "Your competitors are showing up on Google when homeowners search 'roofers near me.' Are you?" |
| 5 | **CtaBanner** | Phone + form. Copy: "Get a Website That Brings You Roofing Jobs." |
| 6 | **Portfolio** | Roofing-specific projects only. 3--4 before/after screenshots. Each with a metric: "Went from 5 to 30 leads/month." |
| 7 | **Testimonials** | Roofing client testimonials only. If none available, use other trades testimonials but plan to replace. |
| 8 | **IndustryWhySEO** | Why roofers specifically need a professional website. Content: "93% of homeowners search online before hiring a roofer." |
| 9 | **City Grid** (new) | Grid of city pages: "Roofing Website Design in Phoenix / in Denver / in Austin..." -- internal linking as secondary conversion path. Each city card links to the industry+city page. |
| 10 | **ServiceProcess** | 4 steps, but framed for roofers: "Step 1: Tell us about your roofing business..." |
| 11 | **Pricing Preview** | "Roofing websites starting at $195/month" with brief tier comparison. Link to full pricing or trigger form. |
| 12 | **ServiceFAQ** | 8--10 roofing-specific FAQs. "Can you build a website that shows my roofing certifications?" "Do you include before/after photo galleries?" |
| 13 | **Final CtaBanner** | "Ready to Get More Roofing Jobs? Call (778) 237-4700 or Book a Free Strategy Call." |
| 14 | **Footer** | Full contact info. |

### CTA Placement Minimum

Three CTA instances minimum:
1. **Hero area** (position 2): Phone number + form button
2. **Mid-page** (position 5): After pain points, before portfolio
3. **Post-FAQ** (position 13): Final catch-all after objections are answered

### Trade-Specific Social Proof

**Critical rule**: The roofing industry page must show roofing clients. Showing a landscaping website on a roofing page breaks trust. If you do not have enough trade-specific portfolio items yet:
- Show 1--2 from the target trade
- Show 1--2 from "similar" trades (general contracting, siding, etc.)
- Label them honestly: "Recent projects in roofing and related trades"
- Prioritize building trade-specific portfolio as you onboard new clients

### Internal Linking as Secondary Conversion

The city grid serves two purposes:
1. **SEO**: Internal links to industry+city pages build topical authority
2. **Conversion**: A roofer in Phoenix who sees "Roofing Website Design in Phoenix" is more likely to click through (and convert on that hyper-specific page) than to convert on the generic roofing page

Each city card in the grid should show:
- City name
- Number of roofing companies in that city (if data available)
- "Starting at $195/mo" price anchor
- Arrow or "Learn more" link

---

## 4. City Hub Page CRO Template

**Example**: `/locations/phoenix`
**Visitor intent**: "I'm a trades business owner in Phoenix looking for a website" -- medium intent. They know their city, trade may vary.

### Recommended Component Order

| # | Component | Conversion Purpose |
|---|-----------|-------------------|
| 1 | **Nav** | Phone number + "Get Started" in nav. |
| 2 | **CityHero** | H1: "Website Design for Trades Businesses in Phoenix" + subhead + phone number + CTA. |
| 3 | **Local Trust Bar** (new) | "Serving Phoenix Area Trades Businesses / [X] Local Clients / [City-Specific Credibility]." |
| 4 | **CityProblem** | Phoenix-specific pain points. "Phoenix homeowners run 2.3 million local service searches per month. Is your business showing up?" |
| 5 | **CtaBanner** | Phone + form. |
| 6 | **Industry Grid** | Grid of industry+city pages: "Roofing in Phoenix / Plumbing in Phoenix / HVAC in Phoenix..." -- routes visitors to their specific trade. |
| 7 | **Portfolio** | Projects from Phoenix-area clients (or nearest available). |
| 8 | **Testimonials** | Local client testimonials preferred. |
| 9 | **Local Context Section** (new) | Phoenix market data: population, number of trades businesses, average competition level. Map embed showing service area. |
| 10 | **Process** | 4 steps. |
| 11 | **Pricing Preview** | "Phoenix trades websites starting at $195/month." |
| 12 | **FAQ** | City-specific: "Do you build websites for businesses in Scottsdale/Tempe/Mesa?" "Can you optimize for Phoenix-specific search terms?" |
| 13 | **Final CtaBanner** | "Ready to Grow Your Phoenix Trades Business? Call (778) 237-4700." |
| 14 | **Footer** |  |

### Local Trust Signals

Local trust is a conversion multiplier for trades owners. They want to work with someone who understands their market.

**Must-have local signals:**
- **Service area mention**: "Serving Phoenix, Scottsdale, Tempe, Mesa, and surrounding areas" in the hero or just below.
- **Local client count**: "Trusted by X trades businesses in the Phoenix area." Even if X is 3, it is more credible than no number.
- **Local market data**: "There are 4,200+ licensed contractors in Maricopa County. Only 38% have a professional website." This kind of stat creates urgency.
- **Google Maps embed**: Shows your awareness of the area. Optional but adds legitimacy. Embed a map of the Phoenix metro area with a service area overlay if possible.

**Avoid:**
- Claiming a local office or address in Phoenix if you do not have one. Trades owners will see through this.
- Generic "we serve businesses nationwide" language. Be specific: name the suburbs, name the neighborhoods.

### Industry Grid as Conversion Path

The city page's primary conversion path is through the industry grid. A plumber in Phoenix is more likely to convert on `/industries/plumbing/phoenix` than on `/locations/phoenix` because the industry+city page speaks directly to their trade.

The industry grid should:
- Show all available trades for that city
- Each card includes: trade name, icon, brief tagline ("Get more plumbing calls in Phoenix"), link to industry+city page
- "Don't see your trade? Call us at (778) 237-4700" as a fallback CTA below the grid

---

## 5. Industry+City Page CRO Template

**Example**: `/industries/roofing/phoenix`
**Visitor intent**: "roofing website design phoenix" -- this is the highest-intent page type. This person knows their trade, knows their city, and is actively looking for a website provider. They are ready to buy.

**This is the most important page type. There are 255 of these pages. They will generate the majority of conversions.**

### Recommended Component Order

| # | Component | Conversion Purpose | Priority |
|---|-----------|-------------------|----------|
| 1 | **Nav** | Phone number + "Get Started" button. | Required |
| 2 | **Hero** | Hyper-specific H1 + phone number + inline CTA. | Critical |
| 3 | **Quick Stats Bar** | Trade+city stats. | High |
| 4 | **Pain Points** | Trade+city specific problems. | High |
| 5 | **Quick Phone Capture** (new) | 1-field phone number form. | Critical |
| 6 | **Portfolio** | Roofing-relevant projects. | High |
| 7 | **Testimonials** | Trades testimonials. | High |
| 8 | **Local Context** | Phoenix roofing market data. | Medium |
| 9 | **Process** | 4 steps. | Medium |
| 10 | **Pricing Preview** | "Starting at $195/mo." | High |
| 11 | **FAQ** | 5--8 roofing+Phoenix FAQs. | Medium |
| 12 | **Final CTA** | Phone + form, strong closing copy. | Critical |
| 13 | **Footer** | | Required |

### Detailed Component Specifications

#### Hero (Position 2)

```
[Eyebrow] Roofing Website Design
[H1] Get More Roofing Jobs in Phoenix
[Subhead] We build and manage high-converting websites for Phoenix roofing 
companies. More visibility. More calls. More jobs. Starting at $195/month.
[CTA Row]
  [Green button + phone icon] Call (778) 237-4700
  [Orange button] Get Your Free Roofing Website Mockup
[Trust line] No contracts. No setup fees. Cancel anytime.
```

**Copy notes:**
- H1 is benefit-driven: "Get More Roofing Jobs in Phoenix" not "Roofing Website Design Services in Phoenix, AZ." The visitor does not care about your service category -- they care about getting more jobs.
- "Starting at $195/month" in the subhead pre-qualifies and anchors price.
- "Get Your Free Roofing Website Mockup" is more compelling than "Book a Free Strategy Call" on high-intent pages. It promises a tangible deliverable.
- The trust line directly counters the "locked into a contract" objection.

#### Quick Stats Bar (Position 3)

A single horizontal bar with 3--4 data points:

```
[Stat 1] 850+ Roofing Companies in Phoenix Metro
[Stat 2] Only 34% Have a Professional Website  
[Stat 3] Avg 47% Traffic Increase After Launch
[Stat 4] Websites Starting at $195/mo
```

**Purpose**: Creates urgency (your competitors are ahead of you or your competitors have not caught up yet -- either way, act now) and establishes credibility (we know this market).

**Data sourcing**: Use census data, trade association data, or Google My Business estimates for the trade+city count. If exact data is unavailable, use ranges: "500--800+ licensed roofers in the Phoenix area."

#### Pain Points (Position 4)

Trade-specific and city-specific. For roofers in Phoenix:

```
[H2] Sound Familiar?
- You're losing roofing jobs to competitors who show up on Google first
- Your current website looks outdated and doesn't work on phones
- You paid a freelancer $3,000 and got a website you can't even update
- Homeowners in Scottsdale and Tempe can't find you when they search "roofer near me"
- You're relying on word-of-mouth and Home Advisor leads that cost $50+ each
- Storm season is coming and you're not set up to capture the demand surge
```

**Rules for pain points:**
- Use "you" language, not "many roofers" -- make it personal
- Reference specific suburbs/neighborhoods of the city
- Reference trade-specific seasonality (storm season for roofers, summer for HVAC, etc.)
- Reference specific lead costs they are currently paying (HomeAdvisor, Thumbtack, Angi) as a price comparison anchor
- Keep to 4--6 pain points maximum

#### Quick Phone Capture (Position 5) -- NEW COMPONENT

This is the single most important new component for industry+city pages.

**Concept**: A simple, low-friction form that captures a phone number. "Enter your number and we'll call you within 5 minutes during business hours."

```
[H3] Want Us to Call You?
[Subtext] Enter your phone number. We'll call within 5 minutes during business hours 
(Mon-Fri, 8am-6pm PST).
[Input: Phone Number] (###) ###-####
[Button: green] Call Me Back
[Trust text] No spam. No sales pitch. Just a quick conversation about your roofing website.
```

**Why this works for trades owners:**
- They are on a job site. They cannot fill out a form right now but they can punch in 10 digits.
- "We'll call you" flips the dynamic. They do not have to initiate -- they just have to answer.
- 1 field = minimal friction. Conversion rate on a 1-field form is 3--5x higher than a multi-field form.
- "Within 5 minutes" creates urgency and sets expectations.

**Technical implementation:**
- Submits to Formspark (or a dedicated endpoint) with the phone number + page URL (for context)
- Page URL tells you it came from `/industries/roofing/phoenix` so you know the caller is a roofer in Phoenix without asking
- Send a Slack notification to the sales team immediately on submission
- Auto-respond with an SMS: "Thanks! Someone from BuildLocal will call you within 5 minutes. - BuildLocal.agency"

**Placement**: After pain points and before portfolio. The visitor has just been reminded of their problems. The phone capture is the easiest possible next step.

#### Portfolio (Position 6)

- Show 2--4 website screenshots
- Prefer roofing clients. If unavailable, use general contracting, exteriors, or trades that "feel" similar.
- Each portfolio item must show:
  - Screenshot (desktop + mobile mockup)
  - Business name and trade
  - One metric: "Went from 0 to 25 leads/month" or "Ranked #1 for 'roofer [city]' in 3 months"
- Do NOT show the full portfolio carousel here. 2--4 items max. A "See all projects" link can go to the main portfolio page.

#### Testimonials (Position 7)

- 2--3 testimonials maximum on this page
- Include: full name, company name, trade, city
- Quote should reference a specific result: "We went from getting zero online leads to 15 calls a week after BuildLocal built our site."
- Photo of the person adds credibility (even a low-quality photo is better than an avatar icon)
- If no trade-specific testimonials exist yet, use the best general trades testimonials and mark this as a priority to fix

#### Local Context (Position 8)

```
[H2] The Phoenix Roofing Market
[Body] Phoenix is one of the fastest-growing metros in the US, with over 1.6 million 
residents and 4.9 million in the metro area. The demand for roofing services is 
year-round due to extreme heat, monsoon season (June--September), and constant new 
construction.

There are an estimated 850+ roofing companies serving the Phoenix metro area, but 
fewer than 35% have a website that ranks on the first page of Google. This means 
there is significant opportunity for roofers who invest in their online presence.

Top searches in your area:
- "roofer near me" -- 12,000 searches/month in Phoenix
- "roof repair phoenix" -- 3,200 searches/month
- "roofing company phoenix" -- 2,400 searches/month
- "roof replacement phoenix az" -- 1,800 searches/month

BuildLocal helps you capture this demand with a website that ranks for these terms 
and converts visitors into phone calls.
```

**Purpose**: Demonstrates local market expertise. Shows the visitor you understand their competitive landscape. The search volume data makes the opportunity tangible.

**Data sourcing**: Use Google Keyword Planner, Ahrefs, or SEMrush for search volumes. City population and business counts from census data. Seasonality from trade publications.

#### Pricing Preview (Position 10)

Do NOT show the full 4-tier pricing table on industry+city pages. It overwhelms and creates decision paralysis on a page where the goal is a phone call, not a plan selection.

Instead, show a simplified pricing preview:

```
[H2] Simple, Transparent Pricing
[Subhead] No setup fees. No contracts. Cancel anytime.

[Card: highlighted] 
  Most Popular for Roofers
  Growth Plan -- $295/month
  - Custom website design
  - SEO optimization for Phoenix
  - Monthly content updates  
  - Lead tracking dashboard
  - Dedicated account manager
  [Button] Get Started at $295/mo

[Below card]
Plans start at $195/month. Not sure which plan is right for your roofing business?
Call (778) 237-4700 and we'll recommend the best fit.
```

**Price anchoring for trades**: Add a line like "That's less than what you'd make on one roofing job" or "Less than one roof repair covers a full year." This reframes the price from an expense to an investment with obvious ROI.

#### FAQ (Position 11)

5--8 questions, specific to the trade+city combination:

1. "How long does it take to build a roofing website?" -- 2--3 weeks from kickoff to launch.
2. "Will my website rank for 'roofer near me' in Phoenix?" -- Yes, we optimize for local search terms specific to the Phoenix area.
3. "Can I show before/after photos of my roofing work?" -- Yes, we build galleries specifically designed for showcasing roof transformations.
4. "Do you write the content or do I have to?" -- We write everything. We interview you for 20 minutes and handle the rest.
5. "What if I already have a website?" -- We can redesign and migrate your existing site or build from scratch.
6. "Can I update the website myself?" -- Yes, but you don't have to. We handle all updates as part of your plan.
7. "Do you help with Google Business Profile for my Phoenix roofing company?" -- Yes, GBP optimization is included in the Growth and Premium plans.
8. "What happens if I want to cancel?" -- Cancel anytime. No penalties. No contracts. We'll even help you export your content.

**FAQ conversion tip**: End each answer with a soft CTA where natural. Example: "We handle all updates as part of your plan. Want to see how it works? Call (778) 237-4700."

#### Final CTA (Position 12)

This is the last chance to convert before the footer. Make it strong.

```
[H2] Ready to Get More Roofing Jobs in Phoenix?
[Subtext] Join 175+ trades businesses that trust BuildLocal to bring them leads 
every month. No contracts, no setup fees, and your website is live in 2--3 weeks.

[CTA Row]
  [Green button, large] Call (778) 237-4700
  [Orange button, large] Get Your Free Website Mockup

[Below CTAs]
"BuildLocal built our website and we went from zero online presence to getting 
15+ calls a week. Best money we've spent on marketing."
-- Mike R., R&M Roofing, Phoenix
```

**Structure**: Benefit-driven headline + trust-building subtext + dual CTA + closing testimonial. The testimonial here provides final social proof at the moment of decision.

### Urgency Elements (Appropriate, Not Sleazy)

Trades owners can smell fake urgency. "Only 2 spots left!" when you clearly have capacity is dishonest and they know it. Use honest urgency instead:

**Do use:**
- "Storm season starts in June. Get your website live before the demand surge." (seasonal, true)
- "Your competitors are already ranking for 'roofer near me' in Phoenix." (competitive, true)
- "New websites take 2--3 weeks to build and 1--3 months to rank. Start now to see results by [specific month]." (timeline, true)
- "We onboard 8--10 new clients per month. Book a call to reserve your spot this month." (capacity, true if accurate)

**Never use:**
- Countdown timers
- "Only X spots left" (unless genuinely true and you can prove it)
- "This offer expires in..." (there is no expiring offer)
- "Prices going up soon" (unless you are actually raising prices, in which case, state the date)

---

## 6. Blog Post CRO Template

**Example**: `/blog/5-reasons-roofers-need-a-website`
**Visitor intent**: Educational, top-of-funnel. They may not be ready to buy but they are interested in the topic.

### CTA Placement

Blog posts need CTAs, but they must be contextual, not generic. A reader of "5 Reasons Roofers Need a Website" should see a CTA about roofing websites, not a generic "Contact us."

**Placement rules:**

| Position | Type | Copy Style |
|----------|------|-----------|
| **~30% scroll** | In-content CTA (styled box/banner) | Contextual: "Want to see what a professional roofing website looks like? We'll build you a free mockup." |
| **~70% scroll** | In-content CTA (styled box/banner) | Action-oriented: "Ready to get started? Call (778) 237-4700 or book a free strategy call." |
| **End of post** | Full CTA section with phone + form | Strong close: "Don't let another month go by without a website. Get started today." |
| **Sidebar** (desktop) | Sticky CTA card | Brief: "Need a website? Starting at $195/mo. [Get Started]" |
| **Sticky bar** (mobile) | Bottom bar | Phone icon + "Get a Free Mockup" button |

**In-content CTA implementation:**

```
--- In-content CTA at ~30% scroll ---
[Box with light background, border]
Want to see what BuildLocal would build for your roofing business?
We'll create a free mockup -- no commitment required.
[Button] Get Your Free Mockup    [Link] Or call (778) 237-4700
```

```
--- In-content CTA at ~70% scroll ---
[Box with orange background, white text]
Ready to stop losing jobs to competitors with better websites?
[Button] Book a Free Strategy Call    [Link] Or call (778) 237-4700
```

### Related Posts Section

Below the post, before the footer:
- Show 3 related posts (same category/trade)
- Each card links to the related post
- Purpose: keeps visitors on-site and moving deeper into the funnel

### What NOT to Do on Blog Posts

- **No exit-intent popups.** Trades owners are busy. They opened your blog post between jobs. If they start to leave, a popup will not convince them to stay -- it will ensure they never come back.
- **No email newsletter signup as the primary CTA.** BuildLocal's conversion action is phone calls and form submissions, not email list growth. If you want to collect emails, make it secondary and pair it with value: "Get our free guide: 10 Website Features Every Roofer Needs."
- **No autoplaying anything.** No autoplay videos, no autoplay audio, no animations that delay content loading. Respect the reader's bandwidth and attention.

---

## 7. Comparison Page CRO Template

**Example**: `/compare/buildlocal-vs-wix` or `/compare/buildlocal-vs-freelancer`
**Visitor intent**: Evaluation stage. They are comparing options. High intent if they are comparing you specifically.

### Structure

```
1. Hero
   H1: "BuildLocal vs [Competitor]: Which Is Better for Your Trades Business?"
   Subhead: Quick verdict (don't make them scroll for the answer)
   
2. Quick Verdict Box
   "BuildLocal is the better choice for trades businesses that want a fully 
   managed website without the hassle of DIY or the risk of a freelancer."
   [Button] Get Started with BuildLocal    [Link] Call (778) 237-4700

3. Comparison Table
   Feature-by-feature comparison. BuildLocal column highlighted.
   
4. Detailed Breakdown
   Section per feature with explanations.
   
5. Bottom Line
   Summary of who should choose what.
   
6. Final CTA
   Phone + form.
```

### Comparison Table Design

| Feature | BuildLocal | [Competitor] |
|---------|-----------|-------------|
| Custom design for trades | Yes (checkmark, green) | Template-based (X, red) |
| SEO optimization included | Yes (checkmark, green) | Extra cost or DIY |
| Content writing | We write everything | You write it |
| Monthly updates | Included | Extra cost |
| Phone support | Yes, (778) 237-4700 | Email only / chatbot |
| Trades-specific expertise | 175+ trades websites | General websites |
| Monthly cost | $195--$595/mo | $14--$40/mo + your time |
| Time investment from you | 20-minute interview | 40+ hours to build |

**Visual hierarchy:**
- BuildLocal column gets a subtle background highlight (light orange or light green)
- Checkmarks for BuildLocal features, X marks or neutral indicators for competitor gaps
- Bold the rows where BuildLocal has the strongest advantage

**Per-section CTAs**: After every 3--4 comparison rows, insert a subtle CTA link:

```
[After "Monthly updates: Included" row]
→ "Want updates handled for you? Get started with BuildLocal."
```

This catches visitors who have already seen enough to decide. Not everyone needs to read the whole comparison.

### Bottom Line Section

```
[H2] The Bottom Line
[Body] If you're a trades business owner who wants a professional website without 
spending 40 hours building it yourself, BuildLocal is the clear choice. You get a 
custom, SEO-optimized website managed for you -- and it costs less than one 
[trade] job per month.

[Competitor] is a solid option if you have the time and design skills to build 
your own site. But if you'd rather focus on running your business, let us 
handle your website.

[CTA Row]
  [Button] Get Your Free Website Mockup
  [Link] Call (778) 237-4700
```

**Tone**: Be fair to the competitor. Do not trash them. Trades owners respect honesty. Acknowledge where the competitor has advantages (price for DIY) but frame BuildLocal's value (your time is worth more than $14/month).

---

## 8. Contact Form Optimization

### Current State

The existing form is a 3-slide wizard via Formspark:
- **Slide 1**: Business type + plan interest
- **Slide 2**: Timeline + referral source
- **Slide 3**: Name + email + company + phone

Total: 8 fields across 3 slides with GSAP animations.

### Problems with Current Form

1. **Too many fields for high-intent visitors.** Someone on `/industries/roofing/phoenix` who is ready to call does not want to answer "how did you hear about us?" They want to give you their phone number and get a call back.
2. **Referral source field is wasted friction.** Track this via UTM parameters and analytics, not by asking the visitor. Every additional field reduces completion rate by 5--10%.
3. **Business type is asked twice.** If they are on the roofing page, you already know their business type. The form should pre-fill this from page context.
4. **No phone-first option.** The form requires name, email, company, AND phone. For a trades owner on a job site, this is too much. Offer a phone-only capture as an alternative.

### Recommended Form Strategy by Page Type

| Page Type | Form Approach | Fields |
|-----------|--------------|--------|
| **Industry+City** (255 pages) | Quick phone capture (primary) + full form (secondary) | 1 field (phone) or 3 fields (name, phone, email) |
| **Industry Hub** (17 pages) | Simplified form + phone capture | 3--4 fields (name, phone, email, business type) |
| **City Hub** (15 pages) | Simplified form + phone capture | 3--4 fields (name, phone, trade type, email) |
| **Homepage** | Full wizard (keep current) | 6 fields (remove referral source, auto-detect business type if possible) |
| **Blog / Comparison** | Full wizard | 6 fields (these visitors need more qualification) |
| **Pricing page** | Simplified form with plan pre-selected | 4 fields (name, phone, email, plan already selected) |

### Simplified Form (For High-Intent Pages)

```
[H3] Get Your Free Website Mockup
[Subtext] Tell us a bit about your business and we'll show you what we'd build.

[Field: Name] Your Name
[Field: Phone] Phone Number (we'll text you a confirmation)
[Field: Email] Email Address
[Hidden field: trade] Auto-filled from page context (e.g., "roofing")
[Hidden field: city] Auto-filled from page context (e.g., "phoenix")
[Hidden field: page_url] The page they submitted from

[Button: orange, full-width] Get My Free Mockup
[Trust text below button] No spam. No contracts. We'll reach out within 1 business day.
```

**Why 3 fields**: Name for personalization in follow-up. Phone because that is how trades owners prefer to communicate. Email as backup and for sending the mockup. Everything else (trade, city, referral source) can be inferred from the page URL and UTM parameters.

### Full Wizard (Revised)

For homepage and research pages, keep the wizard but optimize it:

**Slide 1** (2 fields):
- What type of trades business do you run? [Dropdown: Roofing, Plumbing, HVAC, Electrical, Landscaping, General Contracting, Painting, Flooring, Fencing, Concrete, Pressure Washing, Other]
- What interests you most? [Radio: "I need a new website", "I need my existing website redesigned", "I'm comparing options", "I just want to learn more"]

**Slide 2** (2 fields):
- How soon do you need a website? [Radio: "This week", "This month", "In 1--3 months", "Just exploring"]
- Your phone number [Input -- adding phone to slide 2 so you capture it before the final slide]

**Slide 3** (2 fields):
- Your name [Input]
- Your email [Input]

**Changes from current:**
- Removed "referral source" -- track via UTM
- Removed "company name" -- you will learn this on the call
- Removed "plan interest" from slide 1 -- too early, causes decision paralysis
- Added phone to slide 2 instead of slide 3 -- if they abandon after slide 2, you still have their phone number

### Button Text Options (Test These)

For high-intent pages (industry+city):
- **"Get My Free Website Mockup"** -- promises a tangible deliverable
- **"Call Me Back in 5 Minutes"** -- for the phone capture form
- **"See What We'd Build for You"** -- curiosity-driven

For research pages (blog, comparison):
- **"Book a Free Strategy Call"** -- standard, clear
- **"Get Started -- It's Free"** -- reduces friction perception
- **"Get Your Custom Quote"** -- for pricing-curious visitors

**Avoid:**
- "Submit" -- vague, no value proposition
- "Contact Us" -- too generic
- "Learn More" -- not actionable enough for a form button

### Trust Signals Around the Form

Place these immediately below or beside the form:

```
[Trust badges row]
  (checkmark icon) No contracts -- cancel anytime
  (checkmark icon) No setup fees
  (checkmark icon) 175+ websites built
  (checkmark icon) Response within 1 business day
```

For the quick phone capture, simplify to one line:
```
No spam. No sales pitch. Just a quick conversation about your website.
```

### Mobile Form Behavior

- Form opens as a **full-screen overlay** (not inline). Inline forms on mobile get accidentally scrolled past.
- **Large input fields**: Minimum 48px height, 16px font (prevents iOS zoom-in on focus).
- **Auto-advance between slides**: After completing all fields on a slide, auto-advance to next with a brief GSAP animation (keep existing animations, they provide good UX feedback on mobile).
- **Progress indicator**: Show "Step 1 of 3" so the visitor knows how much is left.
- **Phone field**: Use `type="tel"` to trigger the phone keyboard on mobile.
- **Email field**: Use `type="email"` to trigger the email keyboard on mobile.
- **Close button**: Prominent X in top-right corner. Do not trap them in the form.

---

## 9. Phone Number Strategy

### Current Problem

The phone number `+17782374700` exists in the site config but is not prominently displayed on any page. For a service targeting trades owners -- people who overwhelmingly prefer phone calls -- this is the most damaging conversion gap on the site.

### Implementation Plan

#### 1. Navigation Bar

**Desktop (768px+):**
```
[Nav left] Logo
[Nav center] Home | Industries | Locations | Pricing | Blog
[Nav right] (phone icon) (778) 237-4700  |  [Button: orange] Get Started
```

The phone number is a click-to-call link styled as visible text, not hidden behind an icon. It uses `<a href="tel:+17782374700">`.

**Mobile (below 768px):**
```
[Nav left] Logo
[Nav right] (phone icon linking to tel:) | [Hamburger menu]
```

On mobile, the phone icon is always visible in the nav, even when the menu is closed. Tapping it initiates a call.

#### 2. Hero Section

On every page, the hero includes a click-to-call button:

```html
<a href="tel:+17782374700" 
   class="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 
          rounded-lg text-lg font-semibold hover:bg-green-700">
  <PhoneIcon class="w-5 h-5" />
  (778) 237-4700
</a>
```

Green color convention: Phone CTAs are green (universally associated with calls). Form CTAs remain orange (your brand color).

#### 3. Sticky Mobile Footer Bar

See Section 10 for full specification.

#### 4. Every CTA Section

Every CtaBanner component must include the phone number alongside the form button:

```
[CTA section]
  [H2] Ready to get more [trade] jobs?
  [CTA row]
    [Green button] Call (778) 237-4700
    [Orange button] Book a Free Strategy Call
```

#### 5. Footer

```
[Footer contact section]
  BuildLocal.agency
  (778) 237-4700 (click-to-call link)
  hello@buildlocal.agency (mailto link)
  [Address if applicable]
```

#### Phone Number Formatting

- **Display format**: `(778) 237-4700` -- this is the standard North American format that trades owners recognize instantly.
- **Link format**: `tel:+17782374700` -- the international format for the `href` attribute.
- **Never display**: `+17782374700` or `7782374700` -- these formats are harder to scan.

#### Call Tracking

To measure phone call conversions (which is essential for calculating ROI and optimizing):

**Option A: Google Call Tracking (Free)**
- Use Google Ads call tracking with a forwarding number
- Tracks calls from Google Ads and organic (if using Google Analytics call tracking snippet)
- Limited: does not track calls from direct/social traffic well

**Option B: CallRail or CallTrackingMetrics ($45--$145/month)**
- Dynamic number insertion: displays a unique tracking number per visitor session
- Full attribution: knows which page, which keyword, which campaign drove the call
- Call recording for quality assurance
- Integrates with Google Analytics, Google Ads, HubSpot

**Option C: Separate Numbers Per Page Type ($5/number/month via Twilio)**
- One number for industry+city pages
- One number for homepage
- One number for blog
- Low-cost way to get page-type-level attribution without full call tracking software

**Recommendation**: Start with Option C (cheapest, simplest) and upgrade to Option B when call volume justifies it (likely when you reach 5+ calls/day).

---

## 10. Mobile-Specific CRO

### Sticky Bottom Bar

This is the single most impactful mobile CRO element. It replaces the three scattered MobileCta components and is always visible.

**Design:**

```
[Fixed to bottom of viewport, 60px height, white background, top shadow]
  [Left half: green background]
    (phone icon) Call Now
    ← tapping calls (778) 237-4700
  [Right half: orange background]  
    Get Started
    ← tapping opens form modal
```

**Specifications:**
- `position: fixed; bottom: 0; left: 0; right: 0; z-index: 50;`
- Height: 60px (large enough to tap on bumpy ride, small enough to not obscure content)
- Only visible on mobile (below `md` breakpoint / 768px)
- Disappears when the form modal is open (avoid double UI)
- Background: white bar with two buttons, or split design (green left, orange right)
- The bar should have a subtle top shadow to distinguish from page content

**Visibility behavior:**
- Always visible on scroll (no hide-on-scroll-down behavior -- trades owners scroll erratically on mobile and the bar disappearing is disorienting)
- Exception: hide when footer is in viewport (the footer already has contact info)

**Why this replaces MobileCta components:**
The current approach uses 3 MobileCta components scattered at positions 4, 10, and 16 on the homepage. Problems:
- They are only visible when the user scrolls to that exact spot
- They create layout shifts between mobile and desktop
- They do not help when the user is in the middle of a long section

The sticky bar is always there. Every section, every scroll position, the visitor can convert with one tap.

### Click-to-Call Button Styling

Phone buttons on mobile must be unmissable:

```css
.cta-phone-mobile {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: #16a34a; /* green-600 */
  color: white;
  font-size: 1.125rem; /* 18px */
  font-weight: 600;
  padding: 0.875rem 1.5rem; /* 14px 24px */
  border-radius: 0.5rem;
  width: 100%;
  min-height: 48px;
  text-decoration: none;
}
```

**Why green**: Universally, green = phone/call on mobile UIs. iOS call buttons are green. Android phone app is green. WhatsApp is green. Do not fight this convention.

### Thumb Zone Optimization

On mobile screens, the most easily reachable area is the bottom center (the "thumb zone"). Place primary CTAs there.

```
[Least reachable: top corners]
[Moderate: top center, sides]
[Most reachable: bottom center, bottom right]
```

**Implications:**
- Primary CTA buttons should be in the lower half of visible content, not the top
- The sticky bottom bar captures this perfectly
- In-section CTAs should be at the bottom of each section, not the top
- Hero CTA buttons should be below the hero text, not above it (they naturally are, but do not rearrange)

### Form as Full-Screen Overlay

When the form modal opens on mobile:

- Full viewport coverage (not a centered modal with page visible behind it)
- Slight background blur or dim on the main page content
- Large close (X) button in top-right corner (minimum 44x44px)
- No scrolling within the modal if possible (each slide fits in viewport)
- Auto-focus on first input field
- Keyboard should not push content off-screen (use `visualViewport` API or careful CSS)

### Speed Optimizations for Mobile

Mobile-specific performance checklist:

- [ ] All images use `loading="lazy"` except the hero image (which uses `loading="eager"` or `priority` in Next.js)
- [ ] Hero image is served as WebP at maximum 800px width for mobile
- [ ] Fonts: use `font-display: swap` to prevent invisible text during load
- [ ] GSAP: load asynchronously (`<script async>`). Animations are enhancements, not blockers.
- [ ] Lenis smooth scroll: test CLS (Cumulative Layout Shift) impact. If CLS > 0.1 on mobile, disable Lenis on mobile.
- [ ] Third-party scripts (analytics, chat, etc.): defer all of them. Load after `DOMContentLoaded`.
- [ ] Reduce DOM size: each page should have fewer than 1,500 DOM nodes on mobile.

---

## 11. Trust Signal Placement Strategy

### Placement Map

| Location on Page | Trust Signal | Why Here |
|-----------------|-------------|---------|
| **Nav bar** | "175+ Websites Built" badge (optional) | Constant credibility anchor |
| **Above the fold** (hero) | "175+ websites built for trades businesses" + "No contracts. No setup fees." | Immediately establishes credibility and reduces risk perception |
| **After pain points** | Portfolio / case study screenshot | "You described my problem. Now prove you can solve it." |
| **Mid-page** (after portfolio) | 2--3 full testimonials with names, trades, cities | Social proof at peak engagement |
| **Near CTA sections** | "No contracts. Cancel anytime. No setup fees." | Risk reduction at the moment of decision |
| **Near pricing** | "That's less than one [trade] job per month" | Price anchoring to reframe cost as investment |
| **Inside form / around form** | "No spam. Response within 1 business day. 175+ websites built." | Trust at highest-friction point |
| **Footer** | Full business info: phone, email, address | Legitimacy signal -- real businesses have real contact info |

### Trust Signal Copy Examples

**Credibility (use in hero, stats bar):**
- "175+ websites built for trades businesses"
- "60+ websites under active management"
- "8 years building websites for contractors"
- "Average 47% traffic increase after launch"

**Risk reduction (use near CTAs and forms):**
- "No contracts. Cancel anytime."
- "No setup fees. No hidden costs."
- "$195/month. That's it."
- "Don't like it? Cancel in the first 30 days and pay nothing."

**Social proof (use mid-page):**
- Named testimonials with trade, company, and city
- "Join 60+ trades businesses that trust BuildLocal"
- Specific results: "From 0 to 25 leads/month" (not vague "great results")

**Price anchoring (use near pricing):**
- "Less than one [trade] job covers a full year of your website"
- "The average HomeAdvisor lead costs $50. Our clients get 15--30 leads/month for $295."
- "Your website pays for itself with just one new customer per month"

### What Trades Owners Do NOT Care About

Do not waste space on these trust signals -- they do not convert this audience:

- **Technology stack** ("Built with React and Next.js") -- They do not know or care what React is.
- **Awards from web design industry** -- "Best Agency 2024" from a site they have never heard of means nothing.
- **Partner badges** (Google Partner, HubSpot Partner) -- Meaningless to a plumber.
- **Client logos** -- Unless the logos are recognizable local brands. A grid of unknown company logos is filler.
- **Years in business** alone -- "8 years experience" matters only when paired with "175+ websites built." The combination proves you stayed busy, not just that you existed.

---

## 12. A/B Test Priority List

Ranked by expected impact on conversion rate. Run one test at a time, minimum 2 weeks per test, minimum 100 conversions per variant before calling a winner.

### Priority 1: Phone Number Visibility (Expected Impact: HIGH)

**Control**: Current state -- phone number not prominently displayed.
**Variant**: Phone number in nav + hero + every CTA section + sticky mobile bar.

**Why #1**: This is not really an A/B test -- it is a fix. The phone number should be everywhere. But if you want data, test it. Expected impact: 20--40% increase in total conversions (phone + form combined).

**How to measure**: Before/after call volume. Use even a basic call tracking setup.

### Priority 2: Hero CTA Copy (Expected Impact: HIGH)

**Test on**: Homepage + top 10 industry+city pages by traffic.

| Variant | CTA Button Text |
|---------|----------------|
| A (control) | "Book a Free Strategy Call" |
| B | "Get Your Free Website Mockup" |
| C | "See What We'd Build for You" |

**Hypothesis**: "Free Website Mockup" will outperform because it promises a tangible deliverable rather than a sales call. Trades owners are wary of "strategy calls" (sounds like a sales pitch).

### Priority 3: Form Length on High-Intent Pages (Expected Impact: HIGH)

**Test on**: Top 20 industry+city pages by traffic.

| Variant | Form |
|---------|------|
| A (control) | 3-slide wizard (8 fields) |
| B | 3-field inline form (name, phone, email) |
| C | 1-field phone capture ("We'll call you in 5 minutes") |

**Hypothesis**: Variant C will have the highest submission rate. Variant B will have the highest qualified-lead rate (balancing quantity and quality). Variant A will have the lowest submission rate but the highest quality.

**Measure**: Submission rate AND qualified lead rate (did the submission become a real conversation?).

### Priority 4: Sticky Mobile CTA Bar Configuration (Expected Impact: MEDIUM-HIGH)

**Test on**: All pages, mobile only.

| Variant | Sticky Bar |
|---------|-----------|
| A | No sticky bar (current state) |
| B | Phone only ("Call Now") |
| C | Phone + Form ("Call Now" + "Get Started") |
| D | Form only ("Get a Free Quote") |

**Hypothesis**: Variant C (dual CTA) will win overall. Variant B may win on industry+city pages where intent is highest.

### Priority 5: Social Proof Placement (Expected Impact: MEDIUM)

**Test on**: Homepage.

| Variant | Social Proof Position |
|---------|---------------------|
| A (control) | Portfolio at position 5, Testimonials at position 6 (mid-page) |
| B | Quick stats bar + 1 testimonial above the fold, portfolio at position 5 |

**Hypothesis**: Variant B will increase above-the-fold conversion (phone calls from hero section) because immediate credibility reduces hesitation.

### Priority 6: Pricing Visibility on Industry+City Pages (Expected Impact: MEDIUM)

| Variant | Pricing |
|---------|---------|
| A | Show pricing preview on page |
| B | Hide pricing, show "Get a custom quote" CTA instead |

**Hypothesis**: Variant A (show pricing) will win. Trades owners do not want to get on a call to find out the price -- that feels like a car dealership. Transparent pricing builds trust.

### Priority 7: Urgency Messaging (Expected Impact: LOW-MEDIUM)

**Test on**: Industry+city pages.

| Variant | Urgency Element |
|---------|----------------|
| A | No urgency messaging |
| B | Seasonal urgency: "Storm season starts in June. Get your site live before the rush." |
| C | Competitive urgency: "Only 34% of Phoenix roofers have a professional website. Get ahead now." |

**Hypothesis**: Variant C (competitive urgency) will outperform because it is always relevant, not seasonally dependent. Variant B may outperform in the 2--3 months before peak season.

### Testing Infrastructure

- **Tool**: Google Optimize (free) or Posthog (free tier). Do NOT use Optimizely or VWO -- overkill for this traffic volume.
- **Traffic allocation**: 50/50 split for 2-variant tests. For 3+ variants, use equal allocation.
- **Minimum sample**: 100 conversions per variant before evaluating. At 10 leads/day goal, a 2-variant test on all traffic needs approximately 20 days.
- **Conversion events to track**: (1) Phone call initiated (click on tel: link), (2) Form submission completed, (3) Phone capture form submitted. Track all three separately AND as a combined "total conversion" metric.

---

## 13. Page Speed CRO

### Current Performance Concerns

**GSAP Animations**: The contact form uses GSAP for slide transitions. GSAP itself is approximately 25KB gzipped. The animations provide good UX feedback during the multi-slide form but should be:
- Loaded asynchronously (not render-blocking)
- Only initialized when the form modal opens (not on page load)
- Disabled if `prefers-reduced-motion` is set

**Lenis Smooth Scroll**: Can cause CLS (Cumulative Layout Shift) if it overrides native scroll behavior before layout is stable. Audit:
- Measure CLS on mobile with and without Lenis
- If CLS > 0.1, disable Lenis on mobile
- If CLS < 0.1, keep Lenis but load it after `DOMContentLoaded`

### Critical Rendering Path

What must load before the page is visually complete and interactive above the fold:

| Resource | Load Strategy | Why |
|----------|--------------|-----|
| HTML | Server-rendered (Next.js SSR/SSG) | Content visible immediately |
| Critical CSS | Inlined in `<head>` | Hero section styled without external CSS request |
| Hero image | `<img>` with `priority` (Next.js) or `loading="eager"` | LCP element must load fast |
| Fonts | `font-display: swap` + preload primary font | Text visible immediately, swap when font loads |
| Nav phone number | Part of HTML, no JS dependency | Must be clickable without JS loaded |
| CTA buttons | Part of HTML, no JS dependency | Must be clickable without JS loaded |

**What can wait (defer/lazy):**
- GSAP (only needed when form opens)
- Lenis (enhancement, not critical)
- Below-fold images (lazy load)
- Google Analytics / Tag Manager (defer)
- Form modal HTML (can be in DOM but hidden, or loaded on demand)
- Portfolio images (lazy load, below fold)
- Testimonial avatars (lazy load)

### Image Optimization Checklist

- [ ] All images in WebP format (PNG/JPG fallback for Safari < 14)
- [ ] Hero images: max 1200px wide (desktop), 800px wide (mobile), quality 80
- [ ] Portfolio screenshots: max 800px wide, quality 75
- [ ] Thumbnails / avatars: max 200px wide, quality 70
- [ ] Use Next.js `<Image>` component with `sizes` attribute for responsive serving
- [ ] Implement blur placeholder for all portfolio images (Next.js `placeholder="blur"`)
- [ ] SVG for icons and logos (not PNG)
- [ ] Total page image weight target: under 500KB on mobile, under 1MB on desktop

### Performance Budget

| Metric | Target | Why |
|--------|--------|-----|
| **LCP** (Largest Contentful Paint) | < 2.5s on 4G | Google Core Web Vital. Hero must render fast. |
| **FID** (First Input Delay) | < 100ms | Buttons must respond to taps instantly. |
| **CLS** (Cumulative Layout Shift) | < 0.1 | No layout jumps. Especially critical with Lenis. |
| **TTI** (Time to Interactive) | < 3.5s on 4G | Phone number and CTA buttons must work within 3.5s. |
| **Total page weight** | < 1MB (mobile) | Cellular connections on job sites. |
| **JavaScript bundle** | < 200KB gzipped | Includes Next.js runtime + GSAP + Lenis + everything. |
| **First byte (TTFB)** | < 600ms | Vercel/CDN should deliver this. If not, check ISR/SSG config. |

### Speed Monitoring

- **Google PageSpeed Insights**: Run monthly on homepage + 3 top industry+city pages.
- **Vercel Analytics**: Enable if not already. Built-in Web Vitals monitoring.
- **Real User Monitoring (RUM)**: Vercel Analytics provides this. Track Core Web Vitals by page type.
- **Lighthouse CI**: Add to build pipeline if not already. Block deploys that regress LCP by > 500ms.

### Quick Wins (Implement Immediately)

1. **Preload hero image**: Add `<link rel="preload" as="image" href="hero.webp">` in `<head>`.
2. **Preconnect to Formspark**: `<link rel="preconnect" href="https://submit-form.com">` (or whatever Formspark's domain is).
3. **Defer Google Analytics**: Move GA script to load after `DOMContentLoaded` or use `defer` attribute.
4. **Set explicit image dimensions**: All `<img>` tags must have `width` and `height` attributes to prevent CLS.
5. **Remove unused CSS**: Tailwind's purge should handle this, but verify the production CSS bundle is under 30KB gzipped.

---

## Implementation Priority

What to do first, in order of impact on reaching 10 leads/day:

| Priority | Action | Expected Impact | Effort |
|----------|--------|----------------|--------|
| **P0** | Add phone number everywhere (nav, hero, CTAs, sticky mobile bar) | +25--40% conversions | 2--3 hours |
| **P0** | Build sticky mobile bottom bar (phone + form buttons) | +15--25% mobile conversions | 3--4 hours |
| **P1** | Add quick phone capture form to industry+city pages | +10--20% conversions on highest-intent pages | 4--6 hours |
| **P1** | Simplify contact form for high-intent pages (3 fields vs 8) | +10--15% form completion rate | 3--4 hours |
| **P1** | Rearrange homepage component order per Section 2 | +5--10% homepage conversion | 2--3 hours |
| **P2** | Add quick stats bar to all page types | +3--5% via credibility | 2--3 hours |
| **P2** | Set up call tracking (even basic per-page-type numbers) | No direct impact, but enables all future optimization | 2--4 hours |
| **P2** | Implement trust signals near all CTAs and forms | +3--5% form completion | 1--2 hours |
| **P3** | A/B test hero CTA copy | +5--15% hero conversion (test-dependent) | 4--6 hours |
| **P3** | Optimize page speed (image optimization, deferred JS) | +3--7% via reduced bounce | 4--8 hours |
| **P3** | Build comparison pages with per-section CTAs | New conversion path, incremental | 8--12 hours per page |

**Timeline to 10 leads/day**: With P0 and P1 items implemented, and assuming current traffic of 500+ visitors/day across all 350+ pages, a 3--5% conversion rate yields 15--25 leads/day. If traffic is lower, the CRO improvements buy time while SEO scales traffic up.

---

## Appendix: CTA Copy Swipe File

Ready-to-use CTA copy organized by context.

### Hero CTAs
- "Get Your Free Website Mockup"
- "See What We'd Build for Your Business"
- "Get a Website That Brings You Jobs"
- "Start Getting More Calls This Month"
- "Call (778) 237-4700 -- Free Consultation"

### Mid-Page CTAs
- "Ready to stop losing jobs to competitors? Get started today."
- "Your competitors have websites. You should too. Let's build yours."
- "Want 15+ leads per month? It starts with the right website."
- "That's less than one [trade] job per month. See what we'd build for you."

### Form CTAs (Button Text)
- "Get My Free Mockup"
- "Call Me Back in 5 Minutes"
- "Get Started -- It's Free"
- "See What We'd Build for You"
- "Book My Free Strategy Call"

### Post-FAQ CTAs
- "Still have questions? Call (778) 237-4700 -- we're happy to chat."
- "Ready to get started? Book a free strategy call or call us now."
- "175+ trades businesses trust BuildLocal. Ready to join them?"

### Urgency CTAs (Seasonal / Contextual)
- "Storm season is coming. Get your website live before the demand surge."
- "Your competitors are already ranking for '[trade] near me.' Time to catch up."
- "New websites take 2--3 weeks to build. Start now, be live by [date]."
- "We onboard 8--10 clients per month. Book your spot for [month]."

### Phone CTAs
- "Call (778) 237-4700"
- "Call Us Now -- Free Consultation"
- "Prefer to talk? (778) 237-4700"
- "Questions? Call (778) 237-4700"
- "Tap to Call -- It's Free"

---

*This CRO playbook should be revisited monthly as traffic scales and conversion data accumulates. Every recommendation here is a starting point -- validate with real data and iterate.*
