"use client";

import { adminInputClassName, adminLabelClassName } from "@/lib/admin-ui";

export type ItineraryDayForm = {
  dayNumber: number;
  title: string;
  cities: string;
  summary: string;
};

type Props = {
  days: ItineraryDayForm[];
  onChange: (days: ItineraryDayForm[]) => void;
};

export function PackageItineraryEditor({ days, onChange }: Props) {
  function updateDay(index: number, patch: Partial<ItineraryDayForm>) {
    onChange(days.map((day, i) => (i === index ? { ...day, ...patch } : day)));
  }

  function addDay() {
    onChange([
      ...days,
      {
        dayNumber: days.length + 1,
        title: "",
        cities: "",
        summary: "",
      },
    ]);
  }

  function removeDay(index: number) {
    if (days.length <= 1) return;
    onChange(
      days
        .filter((_, i) => i !== index)
        .map((day, i) => ({ ...day, dayNumber: i + 1 })),
    );
  }

  function onDragStart(e: React.DragEvent, index: number) {
    e.dataTransfer.setData("text/plain", String(index));
    e.dataTransfer.effectAllowed = "move";
  }

  function onDrop(e: React.DragEvent, toIndex: number) {
    e.preventDefault();
    const fromIndex = Number(e.dataTransfer.getData("text/plain"));
    if (Number.isNaN(fromIndex) || fromIndex === toIndex) return;
    const next = [...days];
    const [moved] = next.splice(fromIndex, 1);
    if (!moved) return;
    next.splice(toIndex, 0, moved);
    onChange(next.map((day, i) => ({ ...day, dayNumber: i + 1 })));
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <p className={adminLabelClassName()}>Day-wise itinerary</p>
        <button type="button" className="btn-secondary px-3 py-1.5 text-xs" onClick={addDay}>
          Add day
        </button>
      </div>
      <p className="text-xs text-stone-500">Drag the handle to reorder days.</p>
      <ul className="space-y-3">
        {days.map((day, index) => (
          <li
            key={`day-${index}`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => onDrop(e, index)}
            className="rounded-xl border border-stone-200 bg-white p-4"
          >
            <div className="mb-3 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  draggable
                  onDragStart={(e) => onDragStart(e, index)}
                  className="cursor-grab rounded border border-stone-200 bg-stone-50 px-2 py-1 text-xs text-stone-500 active:cursor-grabbing"
                  aria-label={`Drag day ${day.dayNumber}`}
                >
                  ⋮⋮
                </button>
                <span className="text-sm font-semibold text-teal-800">Day {day.dayNumber}</span>
              </div>
              <button
                type="button"
                className="text-xs text-red-600 hover:underline disabled:opacity-40"
                disabled={days.length <= 1}
                onClick={() => removeDay(index)}
              >
                Remove
              </button>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <label className={adminLabelClassName()}>Title</label>
                <input
                  value={day.title}
                  onChange={(e) => updateDay(index, { title: e.target.value })}
                  required
                  className={adminInputClassName()}
                />
              </div>
              <div>
                <label className={adminLabelClassName()}>Cities (comma separated)</label>
                <input
                  value={day.cities}
                  onChange={(e) => updateDay(index, { cities: e.target.value })}
                  required
                  placeholder="Udaipur, Jaipur"
                  className={adminInputClassName()}
                />
              </div>
              <div className="md:col-span-2">
                <label className={adminLabelClassName()}>Summary</label>
                <textarea
                  value={day.summary}
                  onChange={(e) => updateDay(index, { summary: e.target.value })}
                  required
                  rows={3}
                  className={adminInputClassName()}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
