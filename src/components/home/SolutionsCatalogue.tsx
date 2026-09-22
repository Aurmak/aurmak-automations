import React, { useMemo, useState } from 'react';
import { AUTOMATIONS_DATA } from '../../data/automations';
import { AutomationCard } from '../catalogue/AutomationCard';
import type { AutomationGroup } from '../../types/automation';

type Filter = AutomationGroup | 'All';

// One axis, by team, matching the "By team" lens elsewhere on the page. The card
// badge still shows the finer category; this only decides which cards are on screen.
const FILTERS: Filter[] = ['All', 'Finance', 'Operations', 'Productivity'];

export const SolutionsCatalogue: React.FC = () => {
  const [active, setActive] = useState<Filter>('All');
  const filtered = useMemo(
    () => (active === 'All' ? AUTOMATIONS_DATA : AUTOMATIONS_DATA.filter((a) => a.group === active)),
    [active]
  );

  return (
    <div className="space-y-6">
      <div
        role="tablist"
        aria-label="Filter automations by area"
        className="flex flex-wrap gap-2"
      >
        {FILTERS.map((filter) => {
          const isActive = filter === active;
          return (
            <button
              key={filter}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls="solutions-grid"
              onClick={() => setActive(filter)}
              className={`rounded-full border px-5 py-2.5 text-base font-semibold font-sans transition-all cursor-pointer ${
                isActive
                  ? 'bg-aurmak-humanFill text-white border-transparent shadow-sm'
                  : 'bg-white text-aurmak-textMuted border-aurmak-border hover:text-aurmak-navy hover:border-aurmak-borderHover'
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      <div
        id="solutions-grid"
        role="region"
        aria-live="polite"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filtered.map((automation) => (
          <AutomationCard key={automation.id} automation={automation} />
        ))}
      </div>
    </div>
  );
};
