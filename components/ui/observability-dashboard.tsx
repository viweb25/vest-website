// 'use client'

// import {
// 	createContext,
// 	Fragment,
// 	useContext,
// 	useEffect,
// 	useState,
// 	type ReactNode,
// } from 'react'
// import DraggableWidgetGrid, { type WidgetItem } from '@/components/ui/draggable-widget-grid'
// import { SectionHeader } from '@/components/ui/section-header'

// /* ------------------------------------------------------------------ *
//  * Demo: an AI agent observability dashboard with eight widgets.
//  *
//  * All data is simulated and updates every few seconds (paused when the user
//  * prefers reduced motion). Updating values are not announced to screen
//  * readers; every chart has a text alternative and every status has a label.
//  * ------------------------------------------------------------------ */

// type Kind =
// 	| 'runs'
// 	| 'health'
// 	| 'cost'
// 	| 'failures'
// 	| 'traces'
// 	| 'evals'
// 	| 'tools'
// 	| 'models'

// interface Widget extends WidgetItem {
// 	kind: Kind
// }

// const WIDGETS: Widget[] = [
// 	{ id: 'runs', kind: 'runs', size: 'wide', label: 'Runs today' },
// 	{ id: 'health', kind: 'health', size: 'sm', label: 'System status' },
// 	{ id: 'cost', kind: 'cost', size: 'sm', label: 'Total cost' },
// 	{ id: 'failures', kind: 'failures', size: 'sm', label: 'Errors' },
// 	{ id: 'traces', kind: 'traces', size: 'wide', label: 'Recent traces' },
// 	{ id: 'evals', kind: 'evals', size: 'sm', label: 'Eval score' },
// 	{ id: 'tools', kind: 'tools', size: 'wide', label: 'Tool calls' },
// 	{ id: 'models', kind: 'models', size: 'wide', label: 'Token usage by model' },
// ]

// /* ------------------------------------------------------------------ *
//  * Live data
//  * ------------------------------------------------------------------ */

// const LiveContext = createContext(true)

// /**
//  * The demo's own palette, so the preview looks the same in any host theme.
//  * The grid itself only uses theme tokens.
//  */
// const PALETTE =
// 	'[--background:#ffffff] [--color-background:#ffffff] [--foreground:#09090b] [--color-foreground:#09090b] [--card:#ffffff] [--color-card:#ffffff] [--card-foreground:#09090b] [--color-card-foreground:#09090b] [--muted-foreground:#71717a] [--color-muted-foreground:#71717a] [--border:#e4e4e7] [--color-border:#e4e4e7] [--ring:#18181b] [--color-ring:#18181b]'

// const FONT_URL =
// 	'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap'
// const FONT =
// 	"'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"

// /** A counter that advances while live data is on and the page is visible. */
// function useTick(ms = 2000) {
// 	const live = useContext(LiveContext)
// 	const [tick, setTick] = useState(0)
// 	useEffect(() => {
// 		if (!live) return
// 		const id = window.setInterval(() => {
// 			if (!document.hidden) setTick((t) => t + 1)
// 		}, ms)
// 		return () => window.clearInterval(id)
// 	}, [live, ms])
// 	return tick
// }

// /** Deterministic noise, so server and client agree on the first frame. */
// function noise(seed: number) {
// 	const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453
// 	return x - Math.floor(x)
// }

// const fmt = (v: number) => v.toLocaleString('en-US')

// const median = (values: number[]) => {
// 	const sorted = [...values].sort((a, b) => a - b)
// 	const mid = Math.floor(sorted.length / 2)
// 	return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2
// }

// const duration = (v: number) =>
// 	v >= 1000 ? `${(v / 1000).toFixed(2)}s` : `${Math.round(v)}ms`



// type Tone = 'ok' | 'warn' | 'err' | 'idle'

// const DOT: Record<Tone, string> = {
// 	ok: 'bg-emerald-500',
// 	warn: 'bg-amber-500',
// 	err: 'bg-rose-500',
// 	idle: 'bg-muted-foreground/60',
// }

// const TEXT: Record<Tone, string> = {
// 	ok: 'text-emerald-600 dark:text-emerald-400',
// 	warn: 'text-amber-600 dark:text-amber-300',
// 	err: 'text-rose-600 dark:text-rose-400',
// 	idle: 'text-muted-foreground',
// }

// const ACCENT = 'bg-blue-500 dark:bg-blue-400'

// /** Heatmap levels, from empty to the busiest interval. */
// const HEAT = [
// 	'bg-foreground/[0.06]',
// 	'bg-blue-500/20',
// 	'bg-blue-500/35',
// 	'bg-blue-500/55',
// 	'bg-blue-500/85 dark:bg-blue-400/85',
// ]



// function Shell({
// 	title,
// 	meta,
// 	children,
// }: {
// 	title: string
// 	meta?: ReactNode
// 	children: ReactNode
// }) {
// 	return (
// 		<section className="@container flex h-full flex-col gap-4 p-4 sm:p-[22px]">
// 			<header className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 text-[14px] leading-none">
// 				<h3 className="truncate text-[12px] tracking-[0.1em] text-muted-foreground uppercase">
// 					{title}
// 				</h3>
// 				{meta && <span className="shrink-0 text-muted-foreground">{meta}</span>}
// 			</header>
// 			<div className="flex min-h-0 flex-1 flex-col">{children}</div>
// 		</section>
// 	)
// }

// function Big({
// 	children,
// 	unit,
// 	unitWide = false,
// }: {
// 	children: ReactNode
// 	unit?: string
// 	/** Only show the unit on tiles wide enough to keep it on one line. */
// 	unitWide?: boolean
// }) {
// 	return (
// 		<p className="text-[28px] leading-none font-normal tracking-tight text-foreground tabular-nums @[240px]:text-[30px]">
// 			{children}
// 			{unit && (
// 				<span
// 					className={`text-[13px] tracking-normal text-muted-foreground ${unitWide ? 'sr-only @[200px]:not-sr-only' : ''
// 						}`}>
// 					{/* A real space: `not-sr-only` would wipe a margin. */}
// 					{'\u00a0'}
// 					{unit}
// 				</span>
// 			)}
// 		</p>
// 	)
// }

// /** A change against a previous period, said in words as well as an arrow. */
// function Delta({
// 	value,
// 	against,
// 	suffix,
// 	good = 'up',
// }: {
// 	value: number
// 	against: string
// 	/** Shown after the number when there is room, e.g. "MoM". */
// 	suffix?: string
// 	good?: 'up' | 'down'
// }) {
// 	const up = value >= 0
// 	const tone: Tone = up === (good === 'up') ? 'ok' : 'err'
// 	return (
// 		<span className={`text-[14px] tabular-nums ${TEXT[tone]}`}>
// 			<span aria-hidden="true">{up ? '↑' : '↓'} </span>
// 			{Math.abs(value)}%
// 			{suffix && (
// 				<span aria-hidden="true" className="text-muted-foreground">
// 					{' '}
// 					{suffix}
// 				</span>
// 			)}
// 			<span className="sr-only"> {against}</span>
// 		</span>
// 	)
// }

// function Dot({ tone, pulse = false }: { tone: Tone; pulse?: boolean }) {
// 	return (
// 		<span aria-hidden="true" className="relative inline-flex size-2 shrink-0">
// 			{pulse && (
// 				<span
// 					className={`absolute inset-0 animate-ping rounded-full opacity-50 motion-reduce:hidden ${DOT[tone]}`}
// 				/>
// 			)}
// 			<span className={`relative size-2 rounded-full ${DOT[tone]}`} />
// 		</span>
// 	)
// }

// /** Label on the left, value on the right, one quiet line. */
// function Row({
// 	children,
// 	value,
// 	className = '',
// }: {
// 	children: ReactNode
// 	value: ReactNode
// 	className?: string
// }) {
// 	return (
// 		<div className={`flex items-center gap-2 text-[13px] ${className}`}>
// 			<dt className="flex min-w-0 items-center gap-2 truncate text-foreground">
// 				{children}
// 			</dt>
// 			<dd className="ml-auto text-muted-foreground tabular-nums">{value}</dd>
// 		</div>
// 	)
// }

// /* ------------------------------------------------------------------ *
//  * Runs: a minimap of the last five days, one cell per 45 minutes
//  * ------------------------------------------------------------------ */

// const DAYS = ['Sat', 'Sun', 'Mon', 'Tue', 'Today']
// const SLOTS = 32
// const SLOT_MINUTES = 45
// /** 21:00 today, as a slot. Everything after it has not happened yet. */
// const NOW = 28
// const HOURS = ['12AM', '6AM', '12PM', '6PM']

// function runsAt(day: number, slot: number) {
// 	const hour = (slot * SLOT_MINUTES) / 60
// 	const weekend = DAYS[day] === 'Sat' || DAYS[day] === 'Sun'
// 	// Never quite idle, a morning ramp, a long afternoon peak, quieter weekends.
// 	const shape =
// 		3.5 +
// 		Math.exp(-((hour - 15) ** 2) / 30) * 18 +
// 		Math.exp(-((hour - 10) ** 2) / 10) * 11
// 	return Math.max(
// 		0,
// 		Math.round(
// 			shape * 3.3 * (weekend ? 0.5 : 1) * (0.5 + noise(day * 97 + slot)),
// 		),
// 	)
// }

// const slotClock = (slot: number) => {
// 	const minutes = slot * SLOT_MINUTES
// 	return `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`
// }

// function Runs() {
// 	const t = useTick(2500)
// 	const today = DAYS.length - 1
// 	const grid = DAYS.map((_, d) =>
// 		Array.from({ length: SLOTS }, (_, s) =>
// 			d === today && s > NOW
// 				? null
// 				: runsAt(d, s) + (d === today && s === NOW ? t % 12 : 0),
// 		),
// 	)
// 	const peak = Math.max(...grid.flat().map((v) => v ?? 0))
// 	const total = grid[today].reduce<number>((a, v) => a + (v ?? 0), 0)

// 	return (
// 		<Shell
// 			title="Runs today"
// 			meta={
// 				<Delta
// 					value={12}
// 					against="compared with yesterday"
// 					suffix="vs yesterday"
// 				/>
// 			}>
// 			<Big>{fmt(total)}</Big>
// 			<div className="mt-auto">
// 				<div
// 					role="img"
// 					aria-label={`Runs per 45 minutes over the last 5 days. ${fmt(total)} runs so far today, busiest in the afternoon, quieter at the weekend.`}
// 					className="grid grid-cols-1 items-center gap-x-3 gap-y-[3px] @[480px]:grid-cols-[auto_minmax(0,1fr)]">
// 					{grid.map((row, d) => (
// 						<Fragment key={DAYS[d]}>
// 							<span
// 								aria-hidden="true"
// 								className={`hidden text-[12px] leading-none @[480px]:block ${d === today ? 'text-foreground' : 'text-muted-foreground'
// 									}`}>
// 								{DAYS[d]}
// 							</span>
// 							<span className="grid grid-cols-[repeat(32,minmax(0,1fr))] gap-[3px]">
// 								{row.map((v, s) => {
// 									const level =
// 										v === null || v === 0
// 											? 0
// 											: Math.max(1, Math.ceil((v / peak) * 4))
// 									return (
// 										<span
// 											key={s}
// 											title={
// 												v === null
// 													? undefined
// 													: `${DAYS[d]} ${slotClock(s)} · ${v} runs`
// 											}
// 											className={`aspect-square rounded-[2.5px] transition-colors duration-700 motion-reduce:transition-none ${d === today && s === NOW
// 													? 'bg-blue-600 dark:bg-blue-300'
// 													: HEAT[level]
// 												}`}
// 										/>
// 									)
// 								})}
// 							</span>
// 						</Fragment>
// 					))}
// 					{/* Day and hour labels only where the tile is tall enough. */}
// 					<span aria-hidden="true" className="hidden @[480px]:block" />
// 					<span
// 						aria-hidden="true"
// 						className="mt-2 hidden grid-cols-4 text-[12px] text-muted-foreground @[480px]:grid">
// 						{HOURS.map((h) => (
// 							<span key={h}>{h}</span>
// 						))}
// 					</span>
// 				</div>
// 			</div>
// 		</Shell>
// 	)
// }

// /* ------------------------------------------------------------------ *
//  * System health: uptime as a status-page strip
//  * ------------------------------------------------------------------ */

// /** Days in the last 30 that had an incident, and how bad. */
// const INCIDENTS: Record<number, Tone> = { 8: 'warn', 21: 'warn' }

// function Health() {
// 	const t = useTick(5000)
// 	const degraded = t % 6 === 5
// 	return (
// 		<Shell title="System status" meta="30d">
// 			<Big unit="uptime" unitWide>
// 				99.98%
// 			</Big>
// 			<p
// 				className={`mt-3 flex items-center gap-2 text-[13px] ${degraded ? TEXT.warn : 'text-foreground'
// 					}`}>
// 				<Dot tone={degraded ? 'warn' : 'ok'} pulse />
// 				<span className="truncate">
// 					{degraded ? 'Degraded performance' : 'All systems operational'}
// 				</span>
// 			</p>
// 			<div className="mt-auto">
// 				<div
// 					role="img"
// 					aria-label="Uptime over the last 30 days: 28 days operational, 2 days with degraded performance."
// 					className="flex h-5 gap-[2px] @[240px]:h-6">
// 					{Array.from({ length: 30 }, (_, i) => (
// 						<span
// 							key={i}
// 							className={`flex-1 rounded-[1.5px] ${INCIDENTS[i] ? 'bg-amber-400/80' : 'bg-foreground/15'
// 								}`}
// 						/>
// 					))}
// 				</div>
// 			</div>
// 		</Shell>
// 	)
// }

// /* ------------------------------------------------------------------ *
//  * Total cost
//  * ------------------------------------------------------------------ */

// function Cost() {
// 	const t = useTick(3000)
// 	const days = Array.from({ length: 14 }, (_, i) =>
// 		Math.round(9 + noise(i * 5) * 7 + i * 0.35),
// 	)
// 	// Today's bar and the month total drift, then wrap, so the scale holds.
// 	days[13] = Math.round(12 + (t % 30) * 0.2)
// 	const month = 184.2 + (t % 30) * 0.07
// 	const max = Math.max(...days)
// 	return (
// 		<Shell
// 			title="Total cost"
// 			meta={
// 				<Delta
// 					value={8}
// 					against="compared with last month"
// 					suffix="MoM"
// 					good="down"
// 				/>
// 			}>
// 			<Big unit="MTD">${month.toFixed(0)}</Big>
// 			<div
// 				role="img"
// 				aria-label={`Daily cost over the last 14 days, between $${Math.min(...days)} and $${max}. Today $${days[13]}.`}
// 				className="mt-auto flex h-10 items-end gap-[3px]">
// 				{days.map((d, i) => (
// 					<span
// 						key={i}
// 						className={`flex-1 rounded-full transition-[height] duration-700 motion-reduce:transition-none ${i === days.length - 1 ? ACCENT : 'bg-foreground/15'
// 							}`}
// 						style={{ height: `${(d / max) * 100}%` }}
// 					/>
// 				))}
// 			</div>
// 		</Shell>
// 	)
// }

// /* ------------------------------------------------------------------ *
//  * Failures
//  * ------------------------------------------------------------------ */

// function Failures() {
// 	const t = useTick(5000)
// 	const causes = [
// 		{ name: 'timeout', count: 9 + (Math.floor(t / 3) % 5) },
// 		{ name: 'rate-limit', count: 7 },
// 		{ name: 'tool-error', count: 5 + (Math.floor(t / 5) % 4) },
// 	]
// 	const total = causes.reduce((a, c) => a + c.count, 0) + 2
// 	return (
// 		<Shell title="Errors" meta="24h">
// 			<Big unit={`${((total / 1262) * 100).toFixed(1)}% rate`}>{total}</Big>
// 			<dl className="mt-auto space-y-2">
// 				{causes.map((c, i) => (
// 					<Row key={c.name} value={c.count}>
// 						<Dot tone={i === 0 ? 'err' : 'idle'} />
// 						{c.name}
// 					</Row>
// 				))}
// 			</dl>
// 		</Shell>
// 	)
// }

// /* ------------------------------------------------------------------ *
//  * Latest traces
//  * ------------------------------------------------------------------ */

// const AGENTS = [
// 	'research_agent',
// 	'support_agent',
// 	'code_agent',
// 	'planner',
// 	'reviewer',
// ]

// function trace(n: number) {
// 	const r = noise(n * 3)
// 	const tone: Tone = r > 0.9 ? 'err' : r > 0.8 ? 'warn' : 'ok'
// 	return {
// 		n,
// 		id: `tr_${Math.floor(noise(n) * 0xffffff)
// 			.toString(16)
// 			.padStart(6, '0')}`,
// 		agent: AGENTS[Math.floor(noise(n * 7) * AGENTS.length)],
// 		ms: 400 + noise(n * 13) * 3200,
// 		tone,
// 	}
// }

// const TRACE_WORD: Record<Tone, string> = {
// 	ok: 'success',
// 	warn: 'slow',
// 	err: 'error',
// 	idle: 'pending',
// }

// function Traces() {
// 	const t = useTick(2200)
// 	const rows = Array.from({ length: 4 }, (_, i) => trace(t + 40 - i))
// 	const longest = 3600
// 	return (
// 		<Shell
// 			title="Recent traces"
// 			meta={
// 				<span className="flex items-center gap-1.5">
// 					<Dot tone="ok" pulse />
// 					live
// 				</span>
// 			}>
// 			<Big unit="p50">{duration(median(rows.map((r) => r.ms)))}</Big>
// 			<ol
// 				aria-label="Most recent agent runs"
// 				className="mt-auto space-y-2 text-[13px]">
// 				{rows.map((r, i) => (
// 					<li
// 						key={r.n}
// 						className={`grid-cols-[6px_minmax(0,1fr)_60px] items-center gap-3 @[440px]:grid-cols-[6px_84px_minmax(0,1fr)_26%_60px] ${i === 0 ? 'text-foreground' : 'text-muted-foreground'
// 							} ${
// 							// Short tiles keep the newest.
// 							i >= 3
// 								? 'hidden @[520px]:grid'
// 								: i === 2
// 									? 'hidden @[360px]:grid'
// 									: 'grid'
// 							}`}>
// 						<Dot tone={r.tone} />
// 						<span className="truncate">
// 							{r.id}
// 							<span className="sr-only">
// 								, {TRACE_WORD[r.tone]}, {r.agent},
// 							</span>
// 						</span>
// 						<span aria-hidden="true" className="hidden truncate @[440px]:block">
// 							{r.agent}
// 						</span>
// 						<span
// 							aria-hidden="true"
// 							className="hidden h-[3px] rounded-full bg-foreground/10 @[440px]:block">
// 							<span
// 								className={`block h-full rounded-full ${i === 0 ? ACCENT : 'bg-foreground/25'}`}
// 								style={{ width: `${(r.ms / longest) * 100}%` }}
// 							/>
// 						</span>
// 						<span className="text-right tabular-nums">{duration(r.ms)}</span>
// 					</li>
// 				))}
// 			</ol>
// 		</Shell>
// 	)
// }

// /* ------------------------------------------------------------------ *
//  * Evals
//  * ------------------------------------------------------------------ */

// const EVALS = [
// 	{ name: 'Faithfulness', value: 0.94 },
// 	{ name: 'Relevancy', value: 0.89 },
// 	{ name: 'Correctness', value: 0.91 },
// ]

// function Evals() {
// 	const score = EVALS.reduce((a, e) => a + e.value, 0) / EVALS.length
// 	return (
// 		<Shell title="Eval score">
// 			<div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
// 				<Big>{score.toFixed(2)}</Big>
// 				<span className={`text-[14px] tabular-nums ${TEXT.ok}`}>
// 					<span aria-hidden="true">↑ </span>0.03
// 					<span className="sr-only"> since the previous experiment</span>
// 				</span>
// 			</div>
// 			<dl className="mt-auto space-y-2">
// 				{EVALS.map((e) => (
// 					<Row key={e.name} value={e.value.toFixed(2)}>
// 						{e.name}
// 					</Row>
// 				))}
// 			</dl>
// 		</Shell>
// 	)
// }

// /* ------------------------------------------------------------------ *
//  * Tool usage
//  * ------------------------------------------------------------------ */

// const TOOLS = [
// 	{ name: 'web_search', calls: 412 },
// 	{ name: 'code_interpreter', calls: 268 },
// 	{ name: 'sql_query', calls: 197 },
// 	{ name: 'retrieve_docs', calls: 143 },
// ]

// function Tools() {
// 	const t = useTick(3000)
// 	const rows = TOOLS.map((tool, i) => ({
// 		...tool,
// 		calls: tool.calls + Math.floor((t % 50) * (4 - i) * 0.6),
// 	}))
// 	const max = Math.max(...rows.map((r) => r.calls))
// 	const total = rows.reduce((a, r) => a + r.calls, 0)
// 	return (
// 		<Shell title="Tool calls" meta="24h">
// 			<Big>{fmt(total)}</Big>
// 			<table className="mt-auto w-full table-fixed text-left text-[13px]">
// 				<caption className="sr-only">Tool calls in the last 24 hours</caption>
// 				<thead className="sr-only">
// 					<tr>
// 						<th scope="col">tool</th>
// 						<th scope="col">share</th>
// 						<th scope="col">calls</th>
// 					</tr>
// 				</thead>
// 				<tbody>
// 					{rows.map((r, i) => (
// 						<tr
// 							key={r.name}
// 							className={
// 								// Short tiles keep the busiest tools.
// 								i >= 3
// 									? 'hidden @[520px]:table-row'
// 									: i === 2
// 										? 'hidden @[360px]:table-row'
// 										: ''
// 							}>
// 							<th
// 								scope="row"
// 								className={`w-[140px] truncate py-[6px] pr-3 font-normal ${i === 0 ? 'text-foreground' : 'text-muted-foreground'
// 									}`}>
// 								{r.name}
// 							</th>
// 							<td className="py-[6px]">
// 								<span
// 									aria-hidden="true"
// 									className="block h-[3px] rounded-full bg-foreground/10">
// 									<span
// 										className={`block h-full rounded-full transition-[width] duration-700 motion-reduce:transition-none ${i === 0 ? ACCENT : 'bg-foreground/25'
// 											}`}
// 										style={{ width: `${(r.calls / max) * 100}%` }}
// 									/>
// 								</span>
// 							</td>
// 							<td className="w-[56px] py-[6px] text-right text-muted-foreground tabular-nums">
// 								{r.calls}
// 							</td>
// 						</tr>
// 					))}
// 				</tbody>
// 			</table>
// 		</Shell>
// 	)
// }

// /* ------------------------------------------------------------------ *
//  * Model usage
//  * ------------------------------------------------------------------ */

// const MODELS = [
// 	{ name: 'claude-sonnet-5', share: 0.52, swatch: ACCENT },
// 	{
// 		name: 'claude-haiku-4.5',
// 		share: 0.27,
// 		swatch: 'bg-blue-500/55 dark:bg-blue-400/55',
// 	},
// 	{
// 		name: 'claude-opus-5',
// 		share: 0.13,
// 		swatch: 'bg-blue-500/30 dark:bg-blue-400/30',
// 	},
// 	{ name: 'embed-v3', share: 0.08, swatch: 'bg-foreground/20' },
// ]

// function Models() {
// 	return (
// 		<Shell title="Token usage" meta="by model · 24h">
// 			<Big unit="tokens">12.3M</Big>
// 			<dl className="mt-auto grid grid-cols-2 gap-x-6 gap-y-2">
// 				{MODELS.map((m) => (
// 					<Row key={m.name} value={`${Math.round(m.share * 100)}%`}>
// 						<span
// 							aria-hidden="true"
// 							className={`size-1.5 shrink-0 rounded-full ${m.swatch}`}
// 						/>
// 						<span className="truncate">{m.name}</span>
// 					</Row>
// 				))}
// 			</dl>
// 			<div
// 				role="img"
// 				aria-label={`Share of tokens: ${MODELS.map((m) => `${m.name} ${Math.round(m.share * 100)}%`).join(', ')}.`}
// 				className="mt-4 flex h-[3px] gap-[3px]">
// 				{MODELS.map((m) => (
// 					<span
// 						key={m.name}
// 						className={`h-full rounded-full ${m.swatch}`}
// 						style={{ width: `${m.share * 100}%` }}
// 					/>
// 				))}
// 			</div>
// 		</Shell>
// 	)
// }

// /* ------------------------------------------------------------------ *
//  * Board
//  * ------------------------------------------------------------------ */

// const VIEWS: Record<Kind, () => ReactNode> = {
// 	runs: Runs,
// 	health: Health,
// 	cost: Cost,
// 	failures: Failures,
// 	traces: Traces,
// 	evals: Evals,
// 	tools: Tools,
// 	models: Models,
// }

// const renderWidget = (item: Widget) => {
// 	const View = VIEWS[item.kind]
// 	return <View />
// }

// export function ObservabilityDashboard() {
// 	const [live, setLive] = useState(true)

// 	useEffect(() => {
// 		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches)
// 			setLive(false)
// 	}, [])

// 	return (
// 		<section className={`w-full bg-white py-20 px-4 ${PALETTE}`}>
// 			<div className="max-w-7xl mx-auto">
// 				<SectionHeader
// 					eyebrow="Consectetur"
// 					title={<>Industries We Serve</>}
// 					description="Move over a tile to tilt it. Each industry lists the kind of support we typically provide."
// 					className="text-center sm:text-left"
// 				/>
// 				<LiveContext.Provider value={live}>
// 					<DraggableWidgetGrid
// 						items={WIDGETS}
// 						renderItem={(item) => renderWidget(item as Widget)}
// 					/>
// 				</LiveContext.Provider>
// 			</div>
// 		</section>
// 	)
// }

'use client'

import {
	createContext,
	Fragment,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from 'react'
import DraggableWidgetGrid, { type WidgetItem } from '@/components/ui/draggable-widget-grid'
import { SectionHeader } from '@/components/ui/section-header'
import { Plane, Car, Factory, Settings2, Building2, HardHat, Flame, Zap, Cpu, FlaskConical, Anchor, Gauge } from 'lucide-react'

const ICON_MAP: Record<string, any> = {
	plane: Plane,
	car: Car,
	factory: Factory,
	gear: Settings2,
	struct: Building2,
	crane: HardHat,
	flame: Flame,
	bolt: Zap,
	chip: Cpu,
	flask: FlaskConical,
	bridge: Anchor,
	gauge: Gauge
}

/* ------------------------------------------------------------------ *
 * Industries We Serve Dashboard
 *
 * Populated dynamically with industry profiles, capabilities, and live
 * telemetry markers while preserving layout, tokens, and animations.
 * ------------------------------------------------------------------ */

const IND = [
	['plane', 'Aerospace & Defense', 'Test automation, data acquisition and validation workflows for demanding programmes.'],
	['car', 'Automotive', 'HIL and functional test systems, CAN communication and end-of-line data logging.'],
	['factory', 'Manufacturing', 'Machine monitoring, production data and quality traceability.'],
	['gear', 'Industrial Automation', 'PLC, HMI and SCADA integration for machines and production lines.'],
	['struct', 'Structural Engineering', 'Structural drawings, connection details and technical documentation.'],
	['crane', 'Construction', 'Construction documentation, layouts and quantity take-off.'],
	['flame', 'Steel Fabrication', 'Shop drawings, fabrication lists and bills of materials.'],
	['bolt', 'Energy', 'Monitoring, test and data platforms for equipment and assets.'],
	['chip', 'Electronics', 'Automated test benches, instrument control and production test.'],
	['flask', 'Research & Development', 'Flexible lab automation and data-acquisition frameworks.'],
	['bridge', 'Infrastructure', 'Engineering documentation and digital records for large assets.'],
	['gauge', 'Testing & Measurement', 'DAQ, PXI, cDAQ and cRIO systems with reporting pipelines.']
] as const

interface Widget extends WidgetItem {
	keyName: string
	title: string
	description: string
	index: number
}

// 12 widgets mapped from IND (alternating wide and compact sizes to balance the grid)
const WIDGETS: Widget[] = IND.map(([keyName, title, description], index) => {
	const isWide = [0, 4, 6, 7, 10, 11].includes(index)
	return {
		id: `ind-${keyName}`,
		keyName,
		title,
		description,
		index,
		size: isWide ? 'wide' : 'sm',
		label: title,
	}
})

/* ------------------------------------------------------------------ *
 * Live telemetry & styling
 * ------------------------------------------------------------------ */

const LiveContext = createContext(true)

const PALETTE =
	'[--background:#ffffff] [--color-background:#ffffff] [--foreground:#09090b] [--color-foreground:#09090b] [--card:#ffffff] [--color-card:#ffffff] [--card-foreground:#09090b] [--color-card-foreground:#09090b] [--muted-foreground:#71717a] [--color-muted-foreground:#71717a] [--border:#e4e4e7] [--color-border:#e4e4e7] [--ring:#18181b] [--color-ring:#18181b]'

function useTick(ms = 2000) {
	const live = useContext(LiveContext)
	const [tick, setTick] = useState(0)
	useEffect(() => {
		if (!live) return
		const id = window.setInterval(() => {
			if (!document.hidden) setTick((t) => t + 1)
		}, ms)
		return () => window.clearInterval(id)
	}, [live, ms])
	return tick
}

function noise(seed: number) {
	const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453
	return x - Math.floor(x)
}

type Tone = 'ok' | 'warn' | 'err' | 'idle'

const DOT: Record<Tone, string> = {
	ok: 'bg-emerald-500',
	warn: 'bg-amber-500',
	err: 'bg-rose-500',
	idle: 'bg-muted-foreground/60',
}

const TEXT: Record<Tone, string> = {
	ok: 'text-emerald-600 dark:text-emerald-400',
	warn: 'text-amber-600 dark:text-amber-300',
	err: 'text-rose-600 dark:text-rose-400',
	idle: 'text-muted-foreground',
}

const ACCENT = 'bg-zinc-800 dark:bg-zinc-200'

const HEAT = [
	'bg-foreground/[0.06]',
	'bg-zinc-800/20',
	'bg-zinc-800/35',
	'bg-zinc-800/55',
	'bg-zinc-800/85 dark:bg-zinc-200/85',
]

function Shell({
	title,
	meta,
	children,
	icon,
}: {
	title: string
	meta?: ReactNode
	children: ReactNode
	icon?: ReactNode
}) {
	return (
		<section className="@container flex h-full flex-col gap-4 p-4 sm:p-[22px]">
			<header className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 text-[14px] leading-none">
				<div className="flex items-center gap-2.5">
					{icon}
					<h3 className="truncate text-[15px] font-extrabold text-black dark:text-white uppercase tracking-wide">
						{title}
					</h3>
				</div>
				{meta && <span className="shrink-0 text-muted-foreground">{meta}</span>}
			</header>
			<div className="flex min-h-0 flex-1 flex-col">{children}</div>
		</section>
	)
}

function Big({
	children,
	unit,
	unitWide = false,
}: {
	children: ReactNode
	unit?: string
	unitWide?: boolean
}) {
	return (
		<p className="text-[24px] leading-snug font-normal tracking-tight text-foreground tabular-nums @[240px]:text-[26px]">
			{children}
			{unit && (
				<span
					className={`text-[13px] tracking-normal text-muted-foreground ${unitWide ? 'sr-only @[200px]:not-sr-only' : ''
						}`}>
					{'\u00a0'}
					{unit}
				</span>
			)}
		</p>
	)
}

function Dot({ tone, pulse = false }: { tone: Tone; pulse?: boolean }) {
	return (
		<span aria-hidden="true" className="relative inline-flex size-2 shrink-0">
			{pulse && (
				<span
					className={`absolute inset-0 animate-ping rounded-full opacity-50 motion-reduce:hidden ${DOT[tone]}`}
				/>
			)}
			<span className={`relative size-2 rounded-full ${DOT[tone]}`} />
		</span>
	)
}

function Row({
	children,
	value,
	className = '',
}: {
	children: ReactNode
	value: ReactNode
	className?: string
}) {
	return (
		<div className={`flex items-center gap-2 text-[13px] ${className}`}>
			<dt className="flex min-w-0 items-center gap-2 truncate text-foreground">
				{children}
			</dt>
			<dd className="ml-auto text-muted-foreground tabular-nums">{value}</dd>
		</div>
	)
}

/* ------------------------------------------------------------------ *
 * Widget Views Renderers for Industry Data
 * ------------------------------------------------------------------ */

function IndustryWidgetView({ item }: { item: Widget }) {
	const t = useTick(2500)
	const { keyName, title, description, size, index } = item
	const Icon = ICON_MAP[keyName] || Plane

	if (size === 'wide') {
		const slots = 24
		const activeUnits = Math.round(18 + noise(index * 31 + t) * 15)
		const bars = Array.from({ length: 12 }, (_, i) =>
			Math.round(40 + noise(index * 17 + i) * 50 + (i === 11 ? (t % 10) * 1.5 : 0)),
		)
		const maxBar = Math.max(...bars)

		return (
			<Shell
				title={title}
				icon={<Icon className="w-5 h-5 text-orange-500" />}
				meta={
					<span className="flex items-center gap-1.5 text-[12px]">
						<Dot tone="ok" pulse />
						<span>Active</span>
					</span>
				}>
				<Big unit="deployments">{activeUnits}</Big>
				<p className="mt-2 text-[13px] leading-relaxed text-muted-foreground line-clamp-2">
					{description}
				</p>
				<div className="mt-auto pt-3">
					<div className="flex items-center justify-between text-[11px] text-muted-foreground mb-1.5">
						<span>Throughput & Validation Activity</span>
						<span className="tabular-nums font-mono text-[10px] uppercase">
							id: {keyName}
						</span>
					</div>
					<div
						role="img"
						aria-label={`Activity trend for ${title}`}
						className="flex h-7 items-end gap-[3px]">
						{bars.map((b, i) => (
							<span
								key={i}
								className={`flex-1 rounded-full transition-[height] duration-700 motion-reduce:transition-none bg-foreground/15`}
								style={{ height: `${(b / maxBar) * 100}%` }}
							/>
						))}
					</div>
				</div>
			</Shell>
		)
	}

	// Standard / compact view
	const readiness = (98.2 + noise(index * 13) * 1.6).toFixed(1)
	const sampleSpecs = [
		{ label: 'Platform Type', val: keyName.toUpperCase() },
		{ label: 'Reliability', val: `${readiness}%` },
	]

	return (
		<Shell
			title={title}
			icon={<Icon className="w-5 h-5 text-orange-500" />}
			meta={
				<span className={`text-[12px] font-mono uppercase ${TEXT.ok}`}>
					ready
				</span>
			}>
			<Big unit="spec score">{readiness}%</Big>
			<p className="mt-2 text-[12px] leading-relaxed text-muted-foreground line-clamp-3">
				{description}
			</p>
			<dl className="mt-auto space-y-1.5 pt-2 border-t border-border/50">
				{sampleSpecs.map((s, i) => (
					<Row key={s.label} value={s.val}>
						<Dot tone={i === 1 ? 'ok' : 'idle'} />
						<span className="text-[12px]">{s.label}</span>
					</Row>
				))}
			</dl>
		</Shell>
	)
}

/* ------------------------------------------------------------------ *
 * Root Component
 * ------------------------------------------------------------------ */

export function ObservabilityDashboard() {
	const [live, setLive] = useState(true)

	useEffect(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			setLive(false)
		}
	}, [])

	return (
		<section className={`w-full bg-white py-20 px-4 ${PALETTE}`}>
			<div className="max-w-7xl mx-auto">
				<SectionHeader
					eyebrow="Industries"
					title={<>Industries We Serve</>}
					description="Move over a tile to tilt it. Each industry lists the kind of support we typically provide."
					className="text-center sm:text-left"
				/>
				<LiveContext.Provider value={live}>
					<DraggableWidgetGrid
						items={WIDGETS}
						renderItem={(item) => <IndustryWidgetView item={item as Widget} />}
					/>
				</LiveContext.Provider>
			</div>
		</section>
	)
}

export default ObservabilityDashboard