# Risk Management & Position Sizing

## The Complete Course

PIP:Insight Forex School — Course 15 of 15

First Edition — 2026

> This book is educational content only and is not financial advice. Nothing here is a recommendation to buy or sell any currency, instrument or product. Every chart, number and worked example is an illustration of technique, not a signal, and past patterns carry no guarantee of future repetition. Trading foreign exchange involves a substantial risk of loss and is not suitable for everyone. Never trade with money you cannot afford to lose, and consider seeking independent professional advice before risking capital.

# How to Use This Book

This is the last course in the PIP:Insight school, and it is the one the other fourteen were building towards. Everything you have studied — structure, zones, candles, indicators, sessions, news — answers one question: *where might I enter?* This book answers the question that actually decides whether you survive: *how much should I have on, and what happens when I'm wrong?*

That ordering is deliberate. Entries are learnable in weeks. Risk discipline takes longer, because it fights human nature rather than working with it. So read this book differently from the others. The earlier courses rewarded pattern recognition; this one rewards arithmetic and honesty. There are worked examples throughout — account sizes, stop distances, lot calculations, drawdown recovery tables. Do not skim them. Get a calculator, or better a spreadsheet, and reproduce every number yourself. If our figure and your figure disagree, stop and find out why. The maths here is not decoration; it is the course.

Work through the chapters in order. The first half builds the machinery: fixed-percentage risk, position sizing, risk-to-reward, expectancy. The second half builds the defences: drawdown limits, correlation, stop discipline, and the psychology of taking losses without unravelling. Chapter 10 then forces you to write it all down as a one-page risk plan. That written plan is the deliverable of the entire school. A trader with a mediocre entry method and an ironclad risk plan will still be trading in five years. The reverse is rarely true.

Practical suggestions. First, test everything on a demo account or at minimum size before you trust it — these are frameworks for you to validate, not instructions to follow blind. Second, keep a journal from day one of applying this material; the free PIP:Insight journal and discipline tracker exists precisely for logging risk per trade, R-multiples and rule breaches. Third, resist the urge to "improve" the numbers before you have 100 logged trades. The model works when it is boring.

One warning before you start: this book will feel less exciting than the pattern courses. Good. Excitement is expensive in this business.

# Chapter 1 — Why Risk Management Is the Real Strategy

## The uncomfortable inversion

Here is the editorial position of this entire book, stated up front so you can argue with it: risk management is not a supplement to your trading strategy. It *is* the strategy. Everything else — the pin bars, the moving averages, the supply zones — is entry decoration.

That sounds like an exaggeration, so let's earn it. Take two hypothetical traders as an illustration. Trader A has a genuinely decent entry method but risks whatever "feels right" — 3% here, 8% there, 15% when she's certain. Trader B has a distinctly average entry method — a coin flip with a slight edge — but risks a fixed 1% of her account on every single trade, without exception. Run those two forward through the same run of market conditions, including the inevitable bad patch, and Trader A's account has a meaningful chance of not existing at the end. Trader B's account will be bruised at worst. Not because B picked better trades. Because B could not be removed from the game by any plausible sequence of losses.

This is the inversion most new traders never make. They spend years searching for a method that avoids losing, when the professionals long ago accepted that losing is a fixed cost of the business — like rent — and organised everything around paying that cost in small, survivable instalments.

## Ruin is the only unrecoverable outcome

Every bad outcome in trading is recoverable except one. A losing month is recoverable. A broken rule is recoverable. A blown account is not — not just financially, but psychologically, because the trader who blows up rarely returns with their judgement intact.

The mathematics of ruin are brutally asymmetric, and we will do them properly in Chapter 6, but here is the headline. Lose 10% and you need roughly 11% to get back to level. Lose 20% and you need 25%. Lose 50% and you need 100% — you must double what remains. The hole deepens faster than your ability to climb out of it. Risk management is simply the practice of never letting the hole get deep.

Consider what a string of ten consecutive losses does at two different risk levels, compounding each loss on the remaining balance. At 1% risk per trade, ten straight losses leaves you with 0.99 to the power of ten — about 90.4% of your account. A 9.6% drawdown. Annoying. Survivable. At 5% risk per trade, the same ten losses leaves 0.95 to the power of ten — about 59.9% of your account. A 40% drawdown, which now requires a 67% gain just to restore. Same trader, same trades, same market. The only difference is the risk setting, and it is the difference between a bad fortnight and a crisis.

[FIGTPL: equity_curves | {"a":"1% risk per trade","b":"5% risk per trade"} | Caption: "Two equity curves trading the identical sequence of wins and losses, differing only in risk per trade. The 1% curve wobbles; the 5% curve craters during the same losing streak and spends the rest of the sequence climbing out of its own hole."]

And ten straight losses is not a freak event. If your method wins 45% of the time, the chance of losing any particular next eight trades in a row is 0.55 to the power of eight — a little under 1%. That sounds rare until you realise a moderately active trader places hundreds of trades a year, giving that "rare" streak hundreds of opportunities to occur. Over a 200-trade year it is more likely than not that you will meet a streak like that at some point. Your risk model must assume the streak is coming, because it is.

## Edge means nothing without survival

There is a seductive fallacy that goes: "If my method has an edge, the sizing doesn't matter — I'll come out ahead eventually." It fails because "eventually" requires you to still be solvent, and oversized bets convert a positive-expectancy method into a negative-expectancy account. A method that makes money at 1% risk can reliably destroy an account at 10% risk, purely because the drawdowns along the way exceed what the account — or the trader's nerve — can absorb. The edge never gets the chance to express itself.

This is why the pub version of this chapter is so short: *you cannot get rich in a market you have been carried out of.* Professional trading desks understand this in their bones, which is why the risk manager, not the star trader, has the final word. You are about to become both people. This book is the risk manager's training.

## What the rest of this book does

The plan from here: Chapter 2 fixes your risk per trade as a percentage. Chapter 3 turns that percentage into an exact lot size, every time, in under a minute. Chapters 4 and 5 build the statistical frame — reward-to-risk, expectancy, and why win rate is the most overrated number in trading. Chapter 6 handles drawdowns. Chapter 7 stops you accidentally tripling your risk through correlated positions. Chapter 8 covers stops, Chapter 9 covers the psychology of losing without losing your head, and Chapter 10 makes you write the whole thing down.

None of it is glamorous. All of it is the job.

**Chapter 1 in one sentence:** Your entry method decides how often you're right, but your risk management decides whether you're still here to be right — which makes it, not the entries, the real strategy.

# Chapter 2 — Risk Per Trade: The Fixed-Percentage Model

## One number to rule the account

The fixed-percentage model is the simplest serious risk framework in existence, and its simplicity is the point. The rule: on every trade, risk the same small percentage of your current account balance. Not a fixed pound amount forever. Not "whatever the setup deserves". A fixed percentage of what the account is worth *now*.

For most retail traders working through this school, we'd argue the right number is 1%, with 0.5% while you are still proving your method and 2% as an absolute ceiling for experienced traders with a long, journalled track record. Yes, you will find people online risking 5% or 10% and posting screenshots. You will not find them posting three years later.

What "risk" means here needs to be precise: it is the amount you lose if your stop loss is hit. Not your margin. Not your position size. The distance from entry to stop, multiplied by your pip value, in your account currency. If that number equals 1% of your balance, you are risking 1%. Everything in Chapter 3 exists to make that equation balance.

## Why a percentage, not a fixed amount

A fixed percentage has a property that a fixed pound amount lacks: it automatically adjusts your bet size to your circumstances. As an illustration, start with £5,000 and risk 1% — that's £50 per trade. Lose four trades in a row and your balance is roughly £4,803; your next risk is £48.03, not £50. Win a good run up to £6,000 and your risk rises to £60. The model presses harder when you are doing well and eases off when you are doing badly, without you making a single discretionary decision.

That anti-martingale character is what makes fixed-fractional sizing so hard to ruin. Because each loss is a percentage of a shrinking base, no finite losing streak can take the account to zero — it can only shrink it. Contrast that with the trader who, after losses, *increases* size to "win it back". They have inverted the model: pressing hardest exactly when their capital and judgement are weakest. Chapter 9 deals with why that feels so tempting; the maths here simply notes that it is how accounts die.

## Choosing your number honestly

Why 1% and not 2% or 0.25%? Because the number must satisfy two constraints at once, and 1% sits comfortably inside both for most people.

Constraint one is statistical: your worst realistic losing streak must leave a drawdown you can trade out of. From Chapter 1, ten losses at 1% is a 9.6% drawdown; at 2% it is roughly 18.3% (0.98 to the tenth power is about 0.817); at 5% it is 40%. If you plan to trade for years, the ten-loss streak is a *when*, not an *if*. Choose the risk level whose when-it-happens drawdown you can look at without flinching.

Constraint two is psychological, and it is usually the binding one: the money at risk must be small enough that you can watch the trade lose *without interfering*. A useful self-test: if losing the amount would change how you take the next trade — hesitating on a valid setup, or lunging at an invalid one — the amount is too big, whatever the spreadsheet says. Most traders discover their honest psychological limit is lower than their theoretical one. Believe the psychology.

A brief word on the Kelly criterion, since advanced readers will meet it. Kelly computes the mathematically optimal fraction to bet given your exact edge and odds. It is elegant and, for traders, largely a trap: you never know your true edge (a backtest is an estimate, not a fact), Kelly's output is violently sensitive to that estimate, and full-Kelly drawdowns are horrific — routinely 50% or worse. If you must use it at all, practitioners talk of "quarter Kelly", and for a retail forex trader that quarter usually lands somewhere near — you guessed it — 1 to 2%. The boring answer keeps winning.

## The rules that make the model real

A percentage on its own is not a policy. Wrap it in rules:

- **Fixed means fixed.** No "high-conviction" exceptions. The trades you feel most certain about are precisely the ones where oversizing does the damage, because certainty is a feeling, not information. If you genuinely want a tiered model — say 0.5% for B-grade setups, 1% for A-grade — define the grades in writing *before* the trade, and audit yourself monthly in your journal.
- **Recalculate on current balance.** Weekly or per-trade, your choice, but written down. Per-trade is purer; a weekly snapshot is fine and simpler.
- **Risk is measured to the stop, always.** A trade without a stop has undefined risk, which under this model means it is not a permitted trade. No stop, no trade. We'll defend that properly in Chapter 8.
- **Percentage of equity, not of some imagined future balance.** You size from what the account is, not what it should have been.

None of these rules is intellectually difficult. Every one of them will be tested by your own emotions within your first month. That is the actual exam.

**Chapter 2 in one sentence:** Risk a fixed small percentage — for most traders 1% — of your current balance on every trade without exception, because the model that shrinks your bets when you're losing is the model that cannot be ruined by a losing streak.

# Chapter 3 — Position Sizing Mathematics: Pips, Lots and Account Currency

## The one formula

Everything in this chapter reduces to a single line of arithmetic:

**Position size = money risk ÷ (stop distance in pips × pip value per lot)**

Three inputs. Money risk comes from Chapter 2: your percentage times your balance. Stop distance comes from your chart analysis: the gap between entry and stop, in pips. Pip value is the only genuinely fiddly part, because it depends on the pair and on your account currency. Master those three and you can size any position on any pair in under a minute. Get any of them wrong and your "1% risk" is a fiction.

Note the order of operations, because it is the philosophical heart of the method: **the stop is placed first, on the chart, where the analysis says it belongs — and the position size is then calculated to fit it.** You never place the stop to suit a size you fancied trading. Size is the output, never the input.

[FIGTPL: flow | {"steps":["Balance × risk % = money risk","Mark stop on the chart","Measure stop distance in pips","Find pip value per lot (in your currency)","Size = money ÷ (pips × pip value)","Round DOWN to broker's step"],"decision":"Is the rounded size above your broker's minimum?"} | Caption: "The six-step sizing routine, run before every trade. The stop location is fixed by analysis in step two; the lot size is whatever number makes the maths obey your risk percentage."]

## Lots, mini lots and pip values

Housekeeping first. A **standard lot** is 100,000 units of the base currency; a **mini lot** is 10,000; a **micro lot** is 1,000. Brokers typically quote sizes in standard lots, so 0.10 lots is one mini lot and 0.01 is one micro lot.

For any pair, one pip's movement on one standard lot is worth **10 units of the quote currency** (the second-named currency). So on EUR/GBP, one pip on one standard lot is £10. On GBP/USD, it's $10. On USD/JPY — where a pip is 0.01 rather than 0.0001 — it's ¥1,000. Mini lots are a tenth of that; micro lots a hundredth.

If your account currency matches the quote currency, you are done. If not, you convert. That is the whole game.

## Worked example one: the clean case

Illustration only, as ever. Account: **£5,000**. Risk: **1% = £50**. Pair: **EUR/GBP** (quote currency GBP — matches the account). Planned stop: **25 pips**.

- Pip value per standard lot: £10.
- Cost of the stop per standard lot: 25 pips × £10 = £250.
- Size = £50 ÷ £250 = **0.20 lots** (two mini lots).

Check it backwards, always: 0.20 lots × £10 = £2 per pip; £2 × 25 pips = £50. Exactly 1%. The reverse check takes ten seconds and catches nearly every fat-finger error.

Notice what happens if your analysis instead demands a 50-pip stop: size = £50 ÷ (50 × £10) = 0.10 lots. Wider stop, smaller position, identical £50 risk. And with a 10-pip stop: 0.50 lots. Tighter stop, bigger position, still £50. **Stop distance and position size trade off against each other so that risk never moves.** Traders who feel a wide stop is "risking more" have it exactly backwards — the risk is constant; only the geometry changes.

## Worked example two: the conversion case

Account: **£5,000**, risk **1% = £50**. Pair: **GBP/USD**, quote currency USD — mismatch. Stop: **25 pips**. Assume GBP/USD trades at **1.2500** (illustrative rate).

- Convert money risk into the quote currency: £50 × 1.2500 = **$62.50**.
- Pip value per standard lot: $10.
- Size = $62.50 ÷ (25 × $10) = **0.25 lots**.

Reverse check: 0.25 lots × $10 = $2.50 per pip; × 25 pips = $62.50; ÷ 1.25 = £50. Correct.

One more, with a yen cross, because JPY pairs frighten people unnecessarily. Account **£5,000**, risk **£50**, pair **USD/JPY**, stop **40 pips**, and suppose GBP/JPY sits at **195.00** (again, illustrative). Pip value per standard lot on USD/JPY is ¥1,000, which at 195.00 is ¥1,000 ÷ 195.00 ≈ **£5.13** per pip. Size = £50 ÷ (40 × £5.13) = £50 ÷ £205.20 ≈ 0.244 → round *down* to **0.24 lots**. Reverse check: 0.24 × £5.13 × 40 ≈ £49.25. Just under £50 — which is the correct side to miss on.

Rounding always goes down, never up. Rounding up "because it's only a bit" is how 1% quietly becomes 1.1%, then 1.3%, then a habit.

## Calculators, spreadsheets and the honesty check

Should you use a position size calculator? Yes — after you can do the maths by hand. Every serious platform and plenty of free websites will compute this for you, and in live trading you should let them, because speed matters and arithmetic under adrenaline is unreliable. But a trader who cannot reproduce the calculator's answer manually cannot spot when they've fed it garbage — wrong account currency, stop measured in points instead of pips, JPY pip size mishandled. Build a simple spreadsheet: balance, risk %, pair, stop pips, conversion rate in; lot size out. Sanity-check it against a known example like the ones above.

Two final traps. First, **spread**: your real loss if stopped is stop distance *plus* costs, so on tight stops (under ~15 pips) consider adding the typical spread to the stop distance in your sizing maths. Second, **minimum size**: if your calculated size rounds below your broker's minimum (often 0.01 lots), the correct response is to skip the trade or widen the account, never to take the trade oversized. On a £5,000 account at 1% this almost never binds; on a £300 account it binds constantly, which is itself useful information about whether that account is ready for live trading.

**Chapter 3 in one sentence:** Position size is always calculated — money risk divided by stop distance times pip value, converted into your account currency and rounded down — so that the stop lives where the analysis demands and the risk stays pinned at your fixed percentage.

# Chapter 4 — Risk-to-Reward and Expectancy

## Thinking in R

From this chapter on, we stop measuring trades in pounds and start measuring them in **R** — where 1R is simply the amount you risked on the trade. If you risked £50 and made £100, that's a +2R trade. If your stop was hit, that's −1R. Scratch the trade at entry, 0R.

R does two valuable things. It makes trades comparable across account sizes, pairs and time — a +2R trade on a £500 account and a +2R trade on a £50,000 account are the *same* trade, executed equally well. And it quietly enforces Chapter 2: you can only measure in R if every trade has a defined risk. A journal kept in R-multiples (the PIP:Insight journal is built around exactly this) becomes a clean record of skill, uncontaminated by deposit sizes and compounding.

Risk-to-reward, then, is just the R you are *aiming* for. A trade with a 25-pip stop and a 50-pip target is a 2R target — often written 1:2. The reward is measured to your target, the risk to your stop, both from entry.

[FIGTPL: risk_reward | {"rr":2.0} | Caption: "A 2R trade drawn to scale: the distance from entry to stop is one unit of risk, the distance to target is two. The picture makes the deal explicit — you are wagering one to win two, and the win rate you need follows directly from that ratio."]

## The break-even table

Here is the single most clarifying table in retail trading. For a given average reward-to-risk, the win rate needed just to break even (ignoring costs) is 1 ÷ (1 + R):

- Average winner 0.5R → need **66.7%** winners to break even
- Average winner 1R → need **50%**
- Average winner 2R → need **33.3%**
- Average winner 3R → need **25%**

Read that again, slowly, because it dismantles half the marketing in this industry. A trader whose winners average 2R can be wrong two times out of three and lose nothing. A trader whose winners average 0.5R — the classic "take profits quickly, let losers breathe" retail pattern — must be right two times in three merely to stand still, before spreads. One of those is a business model with slack in it. The other is a tightrope.

This is why we're opinionated on the point: for a discretionary retail trader paying retail spreads, consistently targeting less than 1R is close to structurally unworkable. It demands a win rate that almost nobody sustains, and it means one normal loss erases two wins. The setups you learned in earlier courses — trading from zones, from retests, with structure — exist precisely because they offer logical stops close to entry and targets meaningfully further away.

## Expectancy: the whole method in one number

Expectancy is the average R you make per trade, over many trades:

**Expectancy = (win rate × average win in R) − (loss rate × average loss in R)**

Worked illustration. Suppose 100 journalled trades show: win rate 45%, average winner +1.8R, average loser −1R (you honour your stops — note how expectancy silently assumes that discipline).

Expectancy = (0.45 × 1.8) − (0.55 × 1.0) = 0.81 − 0.55 = **+0.26R per trade**.

Meaning: across many trades, this method earns about a quarter of a unit of risk per trade on average. Over 100 trades that's roughly +26R; at 1% risk per trade, in the region of a 26% gross gain before compounding effects and costs — as an illustration of the arithmetic, emphatically not a projection. Now re-run it with sloppier discipline: same entries, but the average loser drifts to −1.3R because stops get nudged. Expectancy = 0.81 − (0.55 × 1.3) = 0.81 − 0.715 = **+0.095R**. Two-thirds of the edge just evaporated without a single entry changing. Most "failing strategies" die exactly here, in the loss column, not the entry column.

Three honest caveats. Expectancy from a backtest or a small sample is an *estimate* with wide error bars — 30 trades tells you almost nothing, 100 begins to whisper, several hundred starts to speak. Expectancy per trade must be multiplied by opportunity: +0.26R twice a month is a hobby, +0.1R forty times a month may be a better business. And expectancy assumes the future resembles the sample, which markets periodically decline to do. Treat the number as a compass, not a contract.

## Targets are a policy, not a hope

A final practical point. Your *planned* R and your *achieved* R will differ, because trades get stopped, partialed and trailed. What matters is that the achieved distribution, logged honestly in R, has positive expectancy at a win rate you actually produce. Some traders lift expectancy by taking partial profit at 1R and trailing the rest; others find partials just amputate their best winners and the full 2R target tests better. Both are legitimate policies. Neither can be chosen by feel — only by your own journal, over a real sample. Test, log, decide, write it down.

**Chapter 4 in one sentence:** Measure everything in R, insist on rewards that are a healthy multiple of risk, and judge your method by its expectancy — (win% × avg win) minus (loss% × avg loss) — because that single number, not any individual trade, is what you actually trade.

# Chapter 5 — Win Rate Myths: Thinking in Probabilities

## The most overrated number in trading

If expectancy is the most underrated number in trading, win rate is the most overrated. The retail world is drenched in it — "92% accurate signals", screenshots of twenty green trades — because win rate is the number that *feels* like skill. Being right feels good; being profitable is abstract.

But Chapter 4 already showed you the trap: win rate means nothing without the size of the wins and losses attached. A 90% win rate method that makes 0.2R per winner and drops 3R per loser has an expectancy of (0.9 × 0.2) − (0.1 × 3.0) = 0.18 − 0.30 = **−0.12R**. It loses money while being right nine times out of ten — and this is not a contrived case; it is the natural signature of selling premium-style behaviour: snatching tiny profits and letting rare losses run. Meanwhile a 35% win rate at 3R per winner earns (0.35 × 3) − (0.65 × 1) = 1.05 − 0.65 = **+0.40R**, a genuinely strong result achieved while being wrong most of the time.

The pub version: *you can be mostly wrong and rich, or mostly right and broke.* The Opta version is the two equations above.

## One trade means nothing

The deeper shift this chapter asks of you is to stop evaluating single trades at all. A good trade is one where you followed a positive-expectancy process at correct size — *regardless of whether it won*. A bad trade is a rule violation — *regardless of whether it paid*. This feels absurd at first, because the market will frequently reward bad process and punish good process on any given trade. That's not a flaw in the framework; it is precisely why the framework exists. Randomness dominates the short run. Process dominates the long run. Casinos lose hands all night and remodel the lobby every few years on exactly this logic — the edge per hand is tiny, the certainty across a million hands is near total. You are the casino, not the gambler, but only if you size like the casino.

This is also why your journal must record R-multiples and rule adherence, not just profit. Reviewed at the single-trade level, your results are noise. Reviewed at the 50-trade level, they are a distribution — and distributions are where the truth lives.

[FIGTPL: histogram | {"kind":"r_dist"} | Caption: "A realistic distribution of trade outcomes in R: a tall stack of small losses near −1R, a cluster of small wins, and a thinner tail of larger winners. Profitability lives in the shape of the whole distribution — protect the left edge, and let the right tail pay for everything."]

## Streaks are normal, and your gut can't do the maths

Humans are catastrophically bad at intuiting randomness. Shown a genuinely random win/loss sequence, most people insist it's streaky and rigged; shown a smooth alternating sequence, they call it random. This matters because your emotional system will treat every losing streak as evidence that the method is broken, and the maths says streaks of surprising length are simply *what randomness looks like*.

Numbers, as illustrations. With a 45% win rate, the probability that any given run of eight trades is all losers is 0.55⁸ ≈ 0.84%. Rare? Per attempt, yes. But across a 200-trade year there are nearly two hundred places such a run could start, and it becomes *more likely than not* that you'll see one. A five-loss streak (0.55⁵ ≈ 5%) you should expect several times a year, as routinely as rain. Your risk model — 1% per trade — is built so that these entirely normal streaks cost roughly 5–8% of the account rather than half of it. If a five-loss streak makes you abandon your method, you never had a method; you had a mood.

The same coin has another side: the winning streak. Seven wins in a row is also just randomness flexing, and it is exactly when traders decide they've "cracked it", double their size, and hand back a month of gains in three trades. Probability theory is politely indifferent to your recent form. The fixed-percentage model's greatest gift may be that it ignores your feelings in both directions.

## Sample size, and the discipline of not knowing

How many trades before you can trust your numbers? There is no magic threshold, but the working guidance we give: below 30 trades, conclude nothing. Around 100, you may cautiously believe the *sign* of your expectancy. By 300, patterns in your data (which sessions, which setups, which pairs) begin to deserve attention. This is genuinely hard to accept, because it means your first months of results — good or bad — are mostly uninformative, and you must keep executing a process you cannot yet prove. Two consolations. First, at 1% risk, the tuition for those months is capped and survivable, which is rather the point of this book. Second, discipline data arrives much faster than profit data: you can know within twenty trades whether you are *following your rules*, and in the early months that is the only statistic that matters. Track it in the free PIP:Insight discipline tracker and grade yourself on adherence, not P&L.

**Chapter 5 in one sentence:** Win rate without win size is a vanity metric — think instead in probabilities and distributions, expect losing streaks as a mathematical certainty rather than a verdict, and judge yourself over samples of fifty-plus trades, never over one.

# Chapter 6 — Drawdown: Measuring It, Limiting It, Recovering From It

## What drawdown actually is

Drawdown is the distance between your account's peak and its subsequent trough, expressed as a percentage of the peak. Grow £5,000 to £6,000, slip back to £5,100 — your drawdown is (6,000 − 5,100) ÷ 6,000 = **15%**, even though you're still up on your deposit. Measuring from the peak matters because that is how it feels, and because peak-to-trough is what will test your discipline. Every trader, forever, spends most of their time somewhere below their high-water mark; new equity highs are the exception, not the norm. Accepting that is half of this chapter.

**Maximum drawdown** — the deepest such valley in your history — is arguably the most important statistic in your journal after expectancy, because it defines what your method demands of your nerve. A method that earns +0.3R per trade with a historical 12% max drawdown and one that earns the same with a 45% max drawdown are utterly different products, and only one of them will still have you attached to it after a bad quarter.

## The cruel arithmetic of recovery

Losses and gains are not symmetric, and every trader should be able to recite this table from memory:

- Lose **10%** → need **+11.1%** to recover (1 ÷ 0.90)
- Lose **20%** → need **+25%** (1 ÷ 0.80)
- Lose **30%** → need **+42.9%** (1 ÷ 0.70)
- Lose **50%** → need **+100%** (1 ÷ 0.50)
- Lose **70%** → need **+233%** (1 ÷ 0.30)

The curve is gentle at first and then vicious. A 10% drawdown is a routine cost of doing business; the recovery required is barely larger than the loss. By 30% the recovery is half as large again as the loss. By 50% you need to *double* the remains, using a method that presumably just halved you — and, worse, you must do it with damaged confidence and (under fixed-percentage sizing) smaller absolute bets. This is the mathematical case for fighting like hell over the difference between a 10% drawdown and a 30% one. They are not three times different in consequence; they are categorically different.

Note also the flip side, which is the quiet elegance of fixed-fractional sizing: because your 1% shrinks with the balance, the model automatically de-risks in drawdown — and because it grows on the way back up, recovery in R terms is symmetric even though recovery in percentage terms is not. Losing 10R and making 10R back roughly restores you. The asymmetry only savages traders who size in fixed pounds, or who size *up* when down.

## Limits: deciding your surrender lines in advance

A drawdown limit is a pre-committed circuit breaker: a loss threshold at which you stop trading and change something, decided while calm and enforced while not. We suggest three layers, with illustrative numbers you should tune to your own tolerance:

- **Daily stop: 3R (or 3%).** Three full losses in a day and you are done until tomorrow. Not because a fourth trade can't win, but because *you* are no longer the trader who did the analysis this morning. The daily stop's real job is preventing tilt, and it is the single highest-value rule in this book for anyone with a revenge-trading streak.
- **Weekly stop: 5–6R.** A losing week caps here; spend the remainder reviewing the journal instead of the charts.
- **Account review line: 10–15% from peak.** Hitting this doesn't just pause you; it triggers a formal review — sample of recent trades, rule-adherence audit, market-condition check — and many traders sensibly halve risk (to 0.5%) until they've made back half the drawdown. Halving risk in deep drawdown costs little expectancy and buys enormous psychological breathing room.

The essential property of all three: they are written down *before* they're needed. A limit invented mid-crisis is a negotiation, and you will lose it.

[FIGTPL: equity_curves | {"a":"With daily 3R stop","b":"No daily limit"} | Caption: "Two traders hit the same bad morning. One stops at −3R and takes a scratch on the day; the other keeps swinging, tilts, and turns a bad morning into the worst week on the curve. The limit doesn't improve the trades — it amputates the tail."]

## Recovering like a professional

When — not if — you find yourself in a proper drawdown, the professional playbook is boring and specific. First, **diagnose before changing anything**: is this variance (rules followed, normal streak — the correct response is *nothing*), degradation (market regime shifted away from your method), or discipline (rules broken — the problem is you, not the method)? Your R-journal answers this in twenty minutes; without one you are guessing. Second, **cut size, never raise it** — 0.5% until the curve stabilises. The urge to "trade your way out quickly" at bigger size is the recovery-arithmetic trap wearing a cape. Third, **shrink the mission**: your goal in drawdown is not new equity highs; it is one week of clean rule-following, then another. The account heals as a side effect of process, and at 1% risk, it has time to. That is the whole design.

**Chapter 6 in one sentence:** Measure drawdown from peak to trough, respect the brutal asymmetry that deep losses require far larger gains to repair, and pre-commit to daily, weekly and account-level loss limits so that no single bad stretch can put you in the part of the recovery table you can't climb out of.

# Chapter 7 — Correlation and Portfolio-Level Risk

## The 1% rule's blind spot

Everything so far has treated trades one at a time. Here is the blind spot: suppose you're long EUR/USD, long GBP/USD, and short USD/CHF, each sized to a tidy 1%. Three trades, three separate ideas — surely 1% each?

No. All three of those positions are, to a first approximation, the *same* position: short the US dollar. EUR/USD and GBP/USD tend to move together much of the time, and USD/CHF tends to move opposite to EUR/USD, so shorting it is another way of buying euros. If a strong US inflation surprise sends the dollar flying, all three trades can hit their stops on the same headline within the same hour. Your "1% per trade" was, in dollar-event terms, a single 3% trade wearing three hats. You did everything Chapter 2 and 3 taught, and still tripled your intended risk.

Correlation is the degree to which instruments move together, conventionally scored from +1 (lockstep) through 0 (unrelated) to −1 (mirror image). Forex is unusually treacherous here because every price is a *pair* — each currency appears in many instruments, so overlap is structural, not incidental. You cannot diversify away from the dollar by trading five different dollar pairs.

## Knowing your real position

The practical skill is translating a list of trades into a statement of exposure. The method is almost embarrassingly simple: for each open and pending trade, write down which currency you are effectively long and which you are short, with its risk. The earlier trio becomes: long EUR 1%, long GBP 1%, long CHF 1%, short USD 3%. Written that way, the concentration is impossible to miss. Do this in ten seconds before adding any position: *what does my book already say about the currencies in this new trade?*

Correlations also shift with regime, which is why memorised rules ("EUR/USD and GBP/USD are 0.85 correlated") age badly. In calm markets, pairs drift on local stories and correlations slacken. In stress, correlations lurch toward one — everything becomes a single risk-on/risk-off trade, with safe-haven flows into the yen, franc and dollar on one side and everything else on the other. The portfolio that looked diversified on a quiet Tuesday behaves like one big position on the bad Friday. Rule of thumb worth framing: **diversification is weakest exactly when you need it most.** Free correlation matrices are widely available and worth a monthly glance, but the currency-exposure exercise above catches most of the danger without any data at all.

Two further couplings worth knowing. Commodity currencies ride their exports — CAD with oil, AUD with metals and China sentiment — so an oil trade and a CAD trade can be cousins. And gold, indices and forex risk pairs often swing on the same global mood, so "diversifying" into gold while long AUD/JPY may diversify nothing.

[FIGTPL: equity_curves | {"a":"Mixed, capped exposure","b":"Three USD shorts at once"} | Caption: "Two books with identical per-trade risk. The concentrated book's positions win and lose together, producing violent equity swings; the exposure-capped book takes the same signals but never lets one currency dominate, and its curve breathes instead of lurching."]

## Portfolio rules that fit on an index card

The fix is not a hedge fund risk engine; it is three written caps sitting on top of your per-trade rule:

- **Per-currency cap: 2% total risk against any single currency.** Count every open and pending trade's contribution. If you're already short 2% of USD across your book, the next dollar-short setup — however lovely — is a pass, or a replacement for an existing position, not an addition.
- **Total open risk cap: around 4–6%.** The sum of all open-trade risk, as if every stop were hit simultaneously on one horrible headline. This number is your true worst-case day (barring gaps), and it should be one you can absorb and calmly trade the next morning. Under this cap, "how many trades can I have open?" answers itself: four to six at 1%, fewer if correlated — because correlated positions should be *counted together*, not merely noticed. Two tightly-linked 1% trades are nearer one 2% trade; book them that way against your caps.
- **Correlated-entry discount: halve the size when knowingly doubling a theme.** If you genuinely want two expressions of the same idea — say, dollar weakness via two pairs — take each at 0.5% so the theme totals 1%. You keep the diversification of two structures without doubling the bet.

One refinement as trades mature: once a position's stop has been moved to breakeven, its open risk is roughly zero, and it stops counting against the caps — freeing room for the next idea. This gives disciplined trade management a portfolio dividend, and it is a better reason to move stops than impatience (Chapter 8 has words about the difference).

## The mindset: one book, not many bets

The deeper shift this chapter asks for is identity-level: stop being a person who takes trades, and start being a person who runs a book. A trade-taker asks "is this a good setup?" A book-runner asks "what does adding this do to what I already hold?" Same charts, different question, and the second question is the one every professional desk is organised around. Your caps are small enough to hold in your head, but write them into the Chapter 10 plan anyway — because the day you most need them is the day three beautiful, near-identical setups appear at once, and beauty in triplicate is precisely how correlation gets paid.

**Chapter 7 in one sentence:** Your real risk is per-currency and per-book, not per-trade — so cap total exposure to any one currency and to the whole account, count correlated trades as one position, and always ask what a new trade does to the book you already hold.

# Chapter 8 — Stop Losses: Placement Philosophy and Discipline

## What a stop actually is

A stop loss is the price at which your trade idea is objectively wrong. Not "where it would hurt to lose more" — where the *reason you entered no longer exists*. If you bought a bounce from support, your idea is invalid when price is trading clearly through that support. If you shorted a lower-high in a downtrend, the idea dies when price takes out that high. The stop simply automates the admission.

This definition does real work, because it settles the placement argument before it starts. The stop goes where the analysis says the idea fails — and then, per Chapter 3, the position size is calculated to fit that distance at your fixed risk. Traders who place stops by pain threshold ("I'll risk 20 pips because £40 is what I can stomach") have the whole machine backwards: they've let their comfort dictate where the market must prove them wrong, and the market is spectacularly indifferent to their comfort. If the analytically-correct stop makes the position too large for 1%, the answer is a smaller position, and if the size rounds below your broker's minimum, the answer is no trade. It is never a tighter, analysis-free stop.

## Placement: beyond the obvious, behind the noise

Structure-based placement has one refinement that separates tidy theory from surviving practice: **don't place stops at the obvious level — place them beyond it, with room for the overshoot.** Support and resistance are zones, not lines, and the areas just past clean levels are where an enormous concentration of retail stops sits. Price routinely probes through a level — on a spread widening, a stop cascade, a burst of pre-news noise — and then resumes the original direction, having collected the stops parked exactly at the line. Being "right about the level, wrong by four pips" is one of trading's most instructive humiliations, and you only need it a few times before the lesson lands.

[FIGTPL: stop_run | {} | Caption: "Price spikes through an obvious support level — where the tidy-minded stops are clustered — then reverses and continues higher. The trader whose stop sat just below the line was right about the trade and still paid full price; the trader whose stop sat beyond the wick's likely reach kept the position."]

Practical placement, then: identify the invalidation structure (the swing low, the zone boundary), and set the stop a sensible buffer *beyond* it — beyond the recent wicks, plus the spread. Many traders scale the buffer to current volatility using the Average True Range: something like one ATR beyond the swing on the entry timeframe is a common, testable convention. The exact recipe matters less than the principle: the stop should require the market to do something *meaningful*, not something *routine*, to take you out. Test your convention on your own trades and log the results; the "would my old stop have survived?" column in a journal is brutally educational.

A note on stop *types*. A hard stop-loss order sits at the broker and executes without you. A "mental stop" sits in your head and executes through the same nervous system that wants very badly not to lose. For retail traders we regard this as settled: **hard stops, always, placed at entry**. Yes, slippage on a violent gap can fill you worse than your level — stops are not a force field, and news events (Course 13) deserve their own respect. A mental stop in that same gap does not fill better; it fills never.

## The three sins of stop management

Once placed, a stop invites three characteristic sins, in ascending order of destructiveness:

**Widening.** Price approaches your stop and you move it further away, "giving it room". Understand what this actually is: a live, unauthorised increase in risk on a trade that is going against you — the worst possible candidate for extra funding. The 1% you sized became 1.5%, decided in the exact emotional state this book exists to bypass. A moved-away stop also breaks your R-journal, because the trade's loss is no longer −1R. One rule, no exceptions: **stops move only toward the trade, never away.**

**Deleting.** Widening's terminal form. The trader removes the stop entirely and "waits for it to come back". Sometimes it does, which is worse — the lesson learned is lethal, and the market eventually presents the invoice with interest. A large fraction of account-ending losses on retail books are a stop that was removed.

**Strangling.** The opposite vice: moving stops to breakeven or trailing them tight the moment a trade shows a small profit, out of fear of "giving back" open gains. It feels like discipline; it is usually fear in a high-vis vest. Systematically cutting winners at +0.3R while taking full −1R losses wrecks the expectancy arithmetic of Chapter 4 from the profit side. Breakeven moves and trailing rules are legitimate — but only as *pre-written policy* (say, stop to entry after +1R, then trail behind swings), applied identically to every trade and judged over a sample in your journal. If your rule is "when I get nervous", you don't have a rule.

## Discipline is the placement

Here is the honest close. Stop placement is a solvable technical problem — an afternoon of study and a testable convention. Stop *discipline* is a career-long behavioural problem, because every single stop-out delivers a small dose of pain, and human beings are wired to negotiate with pain. The traders who last are not the ones who never feel the urge to move a stop; they are the ones who have made moving it structurally difficult — hard orders, written rules, a journal that records every violation in red, and position sizes small enough (Chapter 2, again) that honouring the stop is merely unpleasant rather than unbearable. Your stop is the one promise you make on every trade. Keep it, and every other number in this book still works. Break it, and none of them do.

**Chapter 8 in one sentence:** Place your stop where the trade idea is objectively dead — beyond the obvious level, with room for the noise — size the position to fit it, and then treat it as inviolable, because a stop that can be widened, deleted or panicked into is not a stop at all.

# Chapter 9 — The Psychology of Losing Well

## The skill nobody advertises

No one opens a brokerage account to become excellent at losing. Yet if your method wins 45% of the time — a perfectly good figure, as Chapter 4 showed — you will take *thousands* of losses over a trading career. Losing is not an occasional malfunction of trading; it is the majority activity, the way missed shots are the majority activity of even elite strikers. The question is never whether you'll lose. It is whether you lose *well*: at planned size, at the planned stop, with your judgement intact for the next trade. This chapter is about the gap between knowing the maths of Chapters 1–8 and being able to execute it while your nervous system objects.

Why does a −1R loss — a pre-agreed, budgeted, statistically inevitable cost — feel like an emergency? Because you are running ancient hardware. Loss aversion means losses register roughly twice as intensely as equivalent gains, so a rational −£50 lands like −£100 of feeling. The brain also hates *realising* a loss far more than holding one, which is the entire psychology behind deleted stops: an open loss is still "not really lost". Trading presses these buttons hundreds of times a year. You cannot uninstall the hardware. You can only build procedures the hardware can't override — which is, quietly, what every rule in this book has been.

## Tilt, and the revenge trade

The most expensive psychological event in retail trading has a name borrowed from poker: **tilt**. The sequence is depressingly standard. A loss — often a slightly unfair-feeling one, stopped by a wick before the move goes your way. A hot flush of injustice. Then the revenge trade: bigger size, thinner setup, entered minutes later, because the goal has silently changed from *trading well* to *getting it back*. That trade loses too, because it was chosen by anger, and now the trader is down 3R in an hour, fully tilted, making decisions that would embarrass them by Thursday. Ask any experienced trader for their worst day and you will hear this story; the entries differ, the shape never does.

[FIGTPL: equity_curves | {"a":"Disciplined: took the loss, stopped","b":"Revenge: doubled size to get it back"} | Caption: "Two traders take the identical opening loss. One books −1R and closes the platform; the other chases it at growing size, and the curve shows the signature tilt cascade — each 'recovery' trade dug from a deeper, angrier hole."]

The defences are mechanical, because in-the-moment willpower is precisely what tilt disables:

- **The daily stop (Chapter 6) is a tilt-breaker first and a risk rule second.** Three losses, platform closed. Tomorrow's market will be there tomorrow.
- **A between-trades ritual.** After any loss: stand up, leave the screen for ten minutes, and re-enter only through your written checklist. Tilt needs momentum; a ritual removes it.
- **Fixed size, enforced in advance.** The revenge trade's weapon is size. If your platform, spreadsheet and rules make 1% the only available bet, revenge is limited to being merely annoying.
- **Name it in the journal.** Log emotional state alongside every trade in the free PIP:Insight journal and discipline tracker. Traders are routinely astonished at what the "state" column reveals — whole categories of loss that occur only after other losses, only late at night, only after checking P&L mid-trade. You cannot fix a pattern you refuse to record.

## Losing well, winning carefully

What does losing *well* actually look like? It is almost anticlimactic. The stop is hit at planned size. You feel the sting — feeling nothing is not the goal and not on offer — you log the trade, grade your process, and the loss changes nothing about the next trade except the balance it's sized from. The professional reframe that makes this possible: a −1R loss on a valid setup is not a mistake. It is *the cost of goods sold* — the fee the market charges for a look at your edge. Mistakes are rule breaches, and only rule breaches. By that accounting, you can have a losing day with zero mistakes, and a winning day riddled with them; over a career, the second is far more dangerous.

And a warning from the other tail, because it's less discussed and nearly as costly: **winning badly**. A hot streak — which Chapter 5 showed is just probability breathing — produces euphoria, and euphoria produces oversizing, thinner setups and skipped checklists with the same reliability that anger does. Overconfidence blows up more funded traders than fear ever has, because fear at least keeps size small. The equanimity you're building must be symmetric: streaks in *either* direction are noise, and your size, checklist and caps do not know what your last five trades did. That indifference is not coldness. It is the entire trick.

None of this arrives by reading a chapter. It arrives through reps — hundreds of correctly-sized losses taken and logged until the sting fades to paperwork — which is one more argument, as if we needed it, for keeping risk at a level where the reps are affordable.

**Chapter 9 in one sentence:** Losses are the majority activity of even good trading, so build mechanical defences — fixed size, daily stops, rituals and an honest journal — that let you take them at planned cost with your judgement intact, and stay equally suspicious of the euphoria that follows winning.

# Chapter 10 — Your Complete Risk Plan: A Written Framework

## Why it must be written

Everything this school has taught you now compresses onto one page. Not a manifesto — a **written risk plan**: the small set of numbers and rules that govern every trade you take, drafted while calm, so that no decision of consequence is ever made while emotional. The writing-down is not a formality. An unwritten rule is a preference, and Chapters 8 and 9 showed exactly what your brain does to preferences under fire: it negotiates. A written rule can be broken, but it cannot be *blurred* — the breach is visible, loggable, and therefore fixable. That visibility is the whole technology.

The plan also does something subtler: it converts trading from a stream of open-ended judgement calls into a short checklist of yes/no questions. Judgement is expensive and depletes across a day; checklists are cheap and don't. You want your scarce judgement spent on reading the market, not on re-deciding, for the hundredth time, how much to risk.

## The eight sections

Your plan should answer eight questions, each in a sentence or two. Illustrative answers below — yours must come from your own testing, tolerance and journal, not copied from ours.

**1. Risk per trade.** *"1% of current balance, calculated per trade, measured to the stop. 0.5% while in drawdown review (see 5)."* — Chapter 2.

**2. Sizing procedure.** *"Stop placed first by analysis; size = money risk ÷ (stop pips × pip value in GBP); rounded down; reverse-checked before entry."* — Chapter 3.

**3. Minimum trade quality.** *"Only setups from my tested playbook, minimum 2R target at a structure-based stop with buffer. If the honest target is under 1.5R, pass."* — Chapters 4 and 8.

**4. Portfolio caps.** *"Max 2% total risk against any one currency; max 5% total open risk; correlated trades counted together; second expression of a theme at half size."* — Chapter 7.

**5. Loss limits.** *"Daily stop: −3R, platform closed. Weekly: −6R. At −10% from equity peak: trading paused, formal review, risk halved until half the drawdown is recovered."* — Chapter 6.

**6. Stop discipline.** *"Hard stop at broker on every trade at entry. Stops move only toward the trade. Breakeven at +1R; trail per written rule. Any widening or deletion is a red-flag breach, journalled same day."* — Chapter 8.

**7. Journalling.** *"Every trade logged in R in the PIP:Insight journal — setup grade, emotional state, rule adherence. Weekly 30-minute review; monthly stats review at 30+ trades."* — Chapters 5 and 9.

**8. Breach protocol.** *"Any broken rule: flatten the position if still open, log the breach, done trading for the day. Three breaches in a month triggers a size cut to 0.5% for the following month."* — because a plan without consequences is a poster.

[FIGTPL: flow | {"steps":["Setup matches written playbook?","Stop placed at invalidation + buffer","Honest target ≥ my minimum R?","Currency & book caps clear?","Size calculated and reverse-checked","Enter; log in journal"],"decision":"Any answer no? Stand aside — flat is a position."} | Caption: "The pre-trade checklist that operationalises the entire risk plan. Every question is binary, every answer is written down before entry, and a single 'no' ends the process — the plan's power is that nothing here requires judgement in the moment."]

## Making it stick

Three habits turn the page into practice. **Put it in sight** — printed beside the screen, not in a folder; its job is to be in your eye-line at the exact moment you're tempted. **Review on schedule, revise rarely** — reread weekly, but amend at most monthly, in writing, with a dated reason, and *never* on a trading day or inside a drawdown. A plan you can edit while losing is not a plan; it's a diary of your moods. The version history itself becomes valuable data — if you find yourself repeatedly loosening the same rule, that rule is where your edge is leaking. **Grade adherence before profit** — each week, score yourself purely on rule-following. A green week of rule-adherence with a red P&L is a good week; you executed, variance did the rest. Enough green adherence weeks, and the P&L column sorts itself out to whatever your edge honestly is — which is all anyone can ask.

## The capstone, closed

Fifteen courses ago you learned what a pip was. Since then: structure, zones, candles, indicators, patterns, sessions, news — a whole vocabulary for forming opinions about price. This book's closing argument is that all of it was the *smaller* half of the craft. Markets will always be uncertain; your risk is the one variable you fully control, and controlling it is what lets every other skill compound instead of resetting to zero. The traders still standing in ten years will not be the ones who found the perfect entry. They'll be the ones who never needed it — because they sized every trade like it could lose, knowing that any trade can, and built a framework that made survival automatic and growth merely patient. Write the plan. Test it small. Log everything. Stay in the game — that was always the strategy.

**Chapter 10 in one sentence:** Compress every rule in this book into a one-page written risk plan — risk percentage, sizing procedure, quality bar, caps, limits, stop rules, journalling and breach protocol — then grade yourself on following it, because the written plan is the strategy and everything else is execution.

# The One-Page Version

1. **Risk management is the strategy; entries are decoration.** You cannot compound an edge from an account that no longer exists, so survival is the first target every single day.

2. **Risk a fixed percentage — about 1% — of current balance on every trade, no exceptions.** Ten straight losses at 1% is a 9.6% dent; at 5% it is a 40% crater. The streak is coming either way.

3. **Size is calculated, never chosen.** Stop goes where the idea is invalid; then size = money risk ÷ (stop pips × pip value), converted to your currency, rounded down, reverse-checked.

4. **Demand rewards that are a multiple of risk.** At 2R average winners you break even winning just 33% of the time; at 0.5R you need 67%. Give yourself the version with slack in it.

5. **Judge the method by expectancy over 50+ trades, never by one trade.** (Win% × avg win) − (loss% × avg loss), measured in R from an honest journal, is the only score that matters.

6. **Win rate without win size is a vanity metric, and streaks are just randomness breathing.** Expect five-loss runs several times a year and act on none of them if the rules were followed.

7. **Respect the recovery table.** −10% needs +11%, −20% needs +25%, −50% needs +100% — so pre-commit daily (≈3R), weekly and peak-drawdown limits, and cut size in drawdown rather than pressing.

8. **Think per-book, not per-trade.** Cap total risk against any one currency (≈2%) and across the account (≈5%), and count correlated trades as one position, because in a storm they are.

9. **Stops are placed beyond the obvious level, sized to, and never widened.** Hard orders at the broker, moves toward the trade only; a −1R loss on a valid setup is cost of goods, not a mistake.

10. **Write the plan, journal every trade, grade adherence before profit.** Rules drafted calm and enforced hot are the entire difference between a trader and a person with opinions and a platform.

# Test Yourself — 15 Questions

**1.** Under the fixed-percentage model with 1% risk, a trader's £5,000 account suffers four consecutive losses. Their risk on the fifth trade should be:

A. £50, because the model fixes the amount at the starting balance
B. Roughly £48, because it's 1% of the current, reduced balance
C. £100, to recover the losses faster
D. £25, because risk must halve after any losing streak

**2.** An account risks 5% per trade and takes ten consecutive losses. Approximately how much of the account remains?

A. 50%
B. 90%
C. 60%
D. 75%

**3.** Account £5,000, risk 1%, pair EUR/GBP, stop 25 pips. The correct position size is:

A. 0.10 lots
B. 0.25 lots
C. 0.50 lots
D. 0.20 lots

**4.** With a £50 money risk on GBP/USD at 1.2500 and a 25-pip stop, the correct size is 0.25 lots. If the analysis instead requires a 50-pip stop, the trader should:

A. Keep 0.25 lots and accept the larger risk
B. Halve the size to about 0.12–0.13 lots so the money risk is unchanged
C. Tighten the stop back to 25 pips to keep the size
D. Skip the trade, since wider stops always mean more risk

**5.** A method's winners average 2R. The minimum win rate needed to break even (ignoring costs) is approximately:

A. 50%
B. 25%
C. 33%
D. 66%

**6.** A trader wins 45% of the time with average winners of +1.8R and average losers of −1R. The expectancy per trade is:

A. +0.26R
B. −0.10R
C. +0.81R
D. +1.25R

**7.** A method wins 90% of the time, averaging +0.2R per winner and −3R per loser. This method is:

A. Excellent, because the win rate is very high
B. Break-even
C. Losing money, with an expectancy of about −0.12R
D. Impossible — high win rates cannot lose

**8.** A trader with a 45% win rate experiences five losses in a row. The most statistically sound response is:

A. Abandon the method, since streaks prove it's broken
B. Double position size to recover quickly
C. Nothing, if rules were followed — streaks of this length are expected several times a year
D. Remove stops so trades have room to come back

**9.** An account grows from £5,000 to £6,000, then falls to £5,100. Its drawdown is:

A. 15%
B. 2%
C. 18%
D. 10%

**10.** After a 20% drawdown, the gain required to return to the previous peak is:

A. 20%
B. 22%
C. 30%
D. 25%

**11.** A trader is long EUR/USD, long GBP/USD and short USD/CHF, each at 1% risk. Their effective exposure is closest to:

A. Three independent 1% positions
B. Roughly a single 3% short-dollar position
C. Zero, because the trades hedge each other
D. 1%, because only the largest position counts

**12.** The primary purpose of a daily loss limit (e.g. −3R, stop for the day) is to:

A. Guarantee profitable weeks
B. Interrupt tilt before emotional decisions compound the damage
C. Satisfy broker margin requirements
D. Increase the number of trades taken next day

**13.** According to this book, a stop loss should be placed:

A. At a fixed pip distance that keeps the loss comfortable
B. Exactly at the support or resistance line
C. Beyond the level where the trade idea is objectively invalid, with a buffer for noise and spread
D. Nowhere — mental stops give more flexibility

**14.** Price approaches a trader's stop, and they move it further away to "give the trade room". This action:

A. Is prudent trade management
B. Reduces risk by avoiding a realised loss
C. Is an unauthorised, emotionally-driven increase in risk on a losing trade
D. Improves the trade's R-multiple

**15.** The book argues the single most important document a trader owns is:

A. A library of entry patterns
B. Their broker statement
C. A written risk plan covering size, limits, caps, stops and breach protocol
D. A subscription to a signal service

## Answer Key

**1. B** — Fixed-fractional sizing recalculates from the current balance (~£4,803 × 1% ≈ £48), automatically shrinking risk in a losing run.

**2. C** — 0.95¹⁰ ≈ 0.599, so roughly 60% remains: a 40% drawdown needing a 67% gain to repair.

**3. D** — £50 ÷ (25 pips × £10 per pip per lot) = 0.20 lots; the reverse check gives 0.20 × £10 × 25 = £50.

**4. B** — Size and stop distance trade off to hold money risk constant; doubling the stop halves the size ($62.50 ÷ 500 = 0.125 lots).

**5. C** — Break-even win rate is 1 ÷ (1 + R) = 1 ÷ 3 ≈ 33.3%.

**6. A** — (0.45 × 1.8) − (0.55 × 1.0) = 0.81 − 0.55 = +0.26R per trade.

**7. C** — (0.9 × 0.2) − (0.1 × 3.0) = 0.18 − 0.30 = −0.12R: mostly right and still losing, because win size was ignored.

**8. C** — At a 55% loss probability, five-loss streaks (≈5% per attempt) are routine across a year of trading; process, not results, decides changes.

**9. A** — Drawdown is measured peak to trough: (6,000 − 5,100) ÷ 6,000 = 15%, regardless of the original deposit.

**10. D** — From 80% of peak you need 1 ÷ 0.80 = 1.25, i.e. a 25% gain: losses require disproportionately larger recoveries.

**11. B** — All three positions are effectively short USD, so one dollar-moving event can stop all three at once; exposure must be counted per currency.

**12. B** — The daily stop is a circuit breaker for the trader's state; its main product is preventing revenge trades, not improving any single trade.

**13. C** — The stop marks objective invalidation, sits beyond the obvious level where clustered stops get run, and the position is then sized to fit it.

**14. C** — Widening a stop raises risk mid-trade, in the worst emotional state, on a losing position — the model's cardinal sin; stops move only toward the trade.

**15. C** — The written risk plan is the capstone deliverable: rules drafted calm and enforced hot are what keep a trader in the game.
