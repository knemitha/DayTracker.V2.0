import { useState } from 'react'
import type { FormEvent } from 'react'

export type DayRatingValue = 'Bad' | 'Neutral' | 'Good' | 'Great'

type DayRatingProps = {
	onSaveEntry: (rating: DayRatingValue, note: string) => void
}

const ratingOptions: DayRatingValue[] = ['Bad', 'Neutral', 'Good', 'Great']

export default function DayRating({ onSaveEntry }: DayRatingProps) {
	const [rating, setRating] = useState<DayRatingValue>('Neutral')
	const [note, setNote] = useState('')

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		onSaveEntry(rating, note.trim())
		setNote('')
	}

	return (
		<section className="rounded-2xl bg-white/80 p-6 shadow-sm ring-1 ring-black/5 backdrop-blur">
			<h2 className="m-0 text-2xl font-semibold text-slate-900">Rate Your Day</h2>
			<p className="mt-2 text-sm text-slate-600">Select your day rating and add a quick note.</p>

			<form className="mt-5 grid gap-4" onSubmit={handleSubmit}>
				<div>
					<label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="day-rating">
						Day rating
					</label>
					<select
						id="day-rating"
						className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none transition focus:border-slate-500"
						value={rating}
						onChange={(event) => setRating(event.target.value as DayRatingValue)}
					>
						{ratingOptions.map((option) => (
							<option key={option} value={option}>
								{option}
							</option>
						))}
					</select>
				</div>

				<div>
					<label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="day-note">
						Note
					</label>
					<textarea
						id="day-note"
						className="min-h-28 w-full resize-y rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none transition focus:border-slate-500"
						placeholder="Write a short note about your day..."
						value={note}
						onChange={(event) => setNote(event.target.value)}
					/>
				</div>

				<button
					type="submit"
					className="inline-flex w-fit items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
				>
					Save Entry
				</button>
			</form>
		</section>
	)
}
