import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
export function Logo({ small = false }) {
  return (
    <span className={`brand ${small ? "brand-small" : ""}`}>
      <span className="brand-icon">
        <svg viewBox="0 0 40 40" aria-hidden="true">
          <path
            d="M10 7c6-3 10 3 10 9 0-6 6-12 11-7 5 6-1 11-7 11 6 0 12 6 7 11-6 5-11-1-11-7 0 6-6 12-11 7-5-6 1-11 7-11-6 0-12-6-6-13Z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span>
        wonderlab<span className="brand-dot">.</span>
      </span>
    </span>
  );
}
export function IconButton({ label, children, className = "", ...props }) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      className={`icon-button ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
export function Modal({ children, onClose, className = "", label = "Dialog" }) {
  const box = useRef(null);
  useEffect(() => {
    const previous = document.activeElement;
    const focusable = () => [
      ...box.current.querySelectorAll(
        'button:not(:disabled), a[href], input:not(:disabled), select, textarea, [tabindex="0"]',
      ),
    ];
    focusable()[0]?.focus();
    const key = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
      if (e.key === "Tab") {
        const f = focusable(),
          first = f[0],
          last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("keydown", key);
      previous?.focus();
    };
  }, []);
  return (
    <div
      className="modal-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <section
        ref={box}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className={`modal ${className}`}
      >
        <IconButton
          label="Close dialog"
          className="modal-close"
          onClick={onClose}
        >
          <X size={19} />
        </IconButton>
        {children}
      </section>
    </div>
  );
}
export function EmptyState({ icon: Icon, title, children }) {
  return (
    <div className="empty-state">
      {Icon && <Icon size={32} />}
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}
