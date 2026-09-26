"use client";

import { SortKey } from "@/lib/types";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "./icons";

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

  // console.log("open:", open);

  return (
    <div ref={dropdownRef} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => {
          // console.log("Clicked");
          setOpen((prev) => !prev);
        }}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="group flex py-2.5 items-center gap-2 rounded-full border border-border bg-card/80 px-4 text-sm font-medium text-muted-2 backdrop-blur-sm transition-all duration-200 hover:border-border/80 hover:bg-card hover:text-muted focus:outline-none focus:ring-2 focus:ring-secondary/20 cursor-pointer"
      >
        <span>Sort By:</span>

        <span className="text-ink">{currentOption.label}</span>

        <ChevronDown
          aria-hidden="true"
          className={`h-4 w-4 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <ul
          role="listbox"
          aria-label="Sort workouts"
          className="absolute right-0 z-30 mt-2 w-44 overflow-hidden rounded-2xl border border-border bg-card/95 p-1.5 shadow-xl backdrop-blur-xl"
        >
          {OPTIONS.map((option) => {
            const isSelected = option.key === value;

            return (
              <li key={option.key}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(option.key)}
                  className={`flex w-full items-center justify-between rounded-xl my-1.5 md:my-2 px-3 py-2.5 text-left text-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-secondary/20 ${
                    isSelected
                      ? "bg-panel-skeleton text-primary"
                      : "text-muted-2 hover:bg-panel-skeleton/70 hover:text-muted"
                  }`}
                >
                  <span>{option.label}</span>

                  {isSelected && (
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full bg-secondary"
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/* "use client";

import { SortKey } from "@/lib/types";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const OPTIONS: { key: SortKey; label: string }[] = [
  { key: "duration", label: "Duration" },
  { key: "calories", label: "Calories" },
  { key: "rating", label: "Rating" },
];

export default function SortDropdown({
  value,
  onChange,
}: {
  value: SortKey;
  onChange: (key: SortKey) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = OPTIONS.find((o) => o.key === value) ?? OPTIONS[0];

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted-2 hover:text-muted"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        Sort By: <span className="text-ink">{current.label}</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-20 mt-2 w-40 overflow-hidden rounded-xl border border-border bg-card shadow-lg"
        >
          {OPTIONS.map((opt) => (
            <li key={opt.key}>
              <button
                type="button"
                onClick={() => {
                  onChange(opt.key);
                  setOpen(false);
                }}
                className={`block w-full px-4 py-2 text-left text-sm hover:bg-panel-skeleton ${
                  opt.key === value ? "text-primary" : "text-muted-2"
                }`}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
 */
