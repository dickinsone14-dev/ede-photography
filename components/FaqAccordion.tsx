"use client";

import { useState, useRef, useEffect } from "react";

interface FaqItemData {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItemData[];
}

function FaqItem({ item, index, isOpen, onToggle }: { item: FaqItemData; index: number; isOpen: boolean; onToggle: () => void }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonId = `faq-button-${index}`;
  const panelId = `faq-panel-${index}`;

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    if (isOpen) {
      el.style.maxHeight = el.scrollHeight + "px";
    } else {
      el.style.maxHeight = "0";
    }
  }, [isOpen]);

  return (
    <div>
      <button
        id={buttonId}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="text-sm md:text-base font-medium text-brand-text pr-8 group-hover:text-brand-teal transition-colors">
          {item.question}
        </span>
        <svg
          className={`w-5 h-5 text-brand-text-faint flex-shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        id={panelId}
        ref={contentRef}
        role="region"
        aria-labelledby={buttonId}
        className="overflow-hidden transition-all duration-200"
        style={{ maxHeight: 0 }}
      >
        <p className="text-sm text-brand-text-light leading-relaxed pb-5">
          {item.answer}
        </p>
      </div>
    </div>
  );
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-brand-border">
      {items.map((item, index) => (
        <FaqItem
          key={index}
          item={item}
          index={index}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  );
}
