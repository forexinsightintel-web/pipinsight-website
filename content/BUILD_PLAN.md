# pip-insight.co.uk build plan (staged 14 Jul 2026)

## Assets now in /content
- catalog.json — the 15-strategy course catalog (videos mirror ebooks,
  £14.99-£24.99, FCA-safe pitches). Renders the store grid.
- ebooks/course1_support_resistance_mastery.md — flagship ebook manuscript
  (11k words, 13 chart placeholders) ready for PDF generation + Stripe product.

## Next builds (in order)
1. LIVE DAILY ANALYSIS FEED: homepage "today's snapshot" is hardcoded (stale
   since June). Fix: pipinsight-daily workflow POSTs analyses.json to this
   repo (commit to content/daily/) or to Supabase; homepage reads it
   server-side. One workflow step + one fetch.
2. EBOOK STORE: /courses grid from catalog.json -> Stripe Checkout one-off
   payments (keys already in dependencies) -> Supabase purchase record ->
   signed download URL for the PDF.
3. JOURNAL v2 (£9.99/mo): extend src/app/journal — AI trade analysis
   (Anthropic API), equity curve, setup analytics, session tagging synced to
   the daily analysis feed. Stripe subscription gate.
4. Ebooks 2-15: manuscripts generated per catalog.json chapter outlines.
