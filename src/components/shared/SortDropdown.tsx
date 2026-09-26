"use client";

import { SortKey } from "@/lib/types";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "./icons";

type SortOption = {
  key: SortKey;
  label: string;
};

const OPTIONS: SortOption[] = [
  { key: "duration", label: "Duration" },
  { key: "calories", label: "Calories" },
  { key: "rating", label: "Rating" },
];

type SortDropdownProps = {
  value: SortKey;
  onChange: (key: SortKey) => void;
};

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentOption =
    OPTIONS.find((option) => option.key === value) ?? OPTIONS[0];

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleSelect = (key: SortKey) => {
    onChange(key);
    setOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`group flex h-10 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-medium backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondary/20 ${
          open
            ? "border-secondary/40 bg-card text-muted shadow-sm shadow-secondary/5"
            : "border-border bg-card/80 text-muted-2 hover:border-border/80 hover:bg-card hover:text-muted"
        }`}
      >
        <span className="text-muted-2">Sort by</span>

        <span className="font-semibold text-ink">{currentOption.label}</span>

        <ChevronDown
          aria-hidden="true"
          className={`h-4 w-4 transition-transform duration-200 ${
            open ? "rotate-180 text-secondary" : "text-muted-2"
          }`}
        />
      </button>

      {/* Dropdown */}
      <div
        className={`absolute left-0 z-30 mt-2 w-48 origin-top-left transition-all duration-200 md:left-auto md:right-0 md:origin-top-right
        ${
          open
            ? "visible translate-y-0 scale-100 opacity-100"
            : "invisible -translate-y-1 scale-95 opacity-0"
        }`}
      >
        <ul
          role="listbox"
          aria-label="Sort workouts"
          className="overflow-hidden rounded-2xl border border-border bg-card/95 p-1.5 shadow-xl backdrop-blur-xl"
        >
          {/* Dropdown label */}
          <li className="px-3 pb-1.5 pt-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-2">
              Sort workouts
            </span>
          </li>

          {OPTIONS.map((option) => {
            const isSelected = option.key === value;

            return (
              <li key={option.key}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(option.key)}
                  className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 my-1.5 md:my-2 text-left text-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-secondary/20 ${
                    isSelected
                      ? "bg-secondary/10 font-medium text-secondary"
                      : "text-muted-2 hover:bg-panel-skeleton hover:text-ink"
                  }`}
                >
                  <span>{option.label}</span>

                  {isSelected && (
                    <Check aria-hidden="true" className="h-4 w-4" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
