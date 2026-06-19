import type { DayLogEntry } from '../../pages/DayLog'

type RecentRatingProps = {
	entries: DayLogEntry[]
}

export default function RecentRating({ entries }: RecentRatingProps) {
	return (
		<section className="rounded-2xl bg-white/80 p-6 shadow-sm ring-1 ring-black/5 backdrop-blur">
			<h2 className="m-0 text-2xl font-semibold text-slate-900">Recent Entries</h2>
			<p className="mt-2 text-sm text-slate-600">Your latest 3 saved day logs.</p>

			{entries.length === 0 ? (
				<p className="mt-5 rounded-xl bg-slate-100 px-3 py-4 text-sm text-slate-600">
					No entries yet. Save your first day rating.
				</p>
			) : (
				<ul className="mt-5 m-0 grid list-none gap-3 p-0">
					{entries.map((entry) => (
						<li key={entry.id} className="rounded-xl border border-slate-200 bg-white p-4">
							<div className="flex flex-wrap items-center justify-between gap-2">
								<strong className="text-slate-900">{entry.rating}</strong>
								<span className="text-xs text-slate-500">{entry.displayDateTime}</span>
							</div>
							<p className="mt-2 mb-0 text-sm text-slate-700">{entry.note || 'No note added.'}</p>
						</li>
					))}
				</ul>
			)}
		</section>
	)
}
