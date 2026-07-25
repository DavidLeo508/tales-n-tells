"use client";

import { useState } from "react";

interface Store {
  name: string;
  address: string;
  whatsappUrl: string;
}

interface Props {
  stores: Store[];
  buttonLabel?: string;
}

export default function CollectPrintModal({
  stores,
  buttonLabel = "Collect Print",
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Collect Print Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full px-4 py-3 bg-ink text-bone border border-bone/30 hover:bg-accent hover:text-white hover:border-accent font-bold text-xs tracking-widest uppercase transition-all duration-300"
      >
        {buttonLabel}
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/70 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
<div
  className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-ink border border-accent/30 p-8 md:p-10 shadow-[0_0_30px_rgba(220,38,38,0.12)]"
  onClick={(e) => e.stopPropagation()}

          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-bone/50 hover:text-accent text-2xl transition-colors"
              aria-label="Close"
            >
              ×
            </button>

            {/* Modal Heading */}
            <div className="mb-8 pr-8">
              <span className="text-accent text-[10px] font-bold tracking-[0.3em] uppercase">
                Physical Edition
              </span>

              <h2 className="text-3xl md:text-4xl font-black italic tracking-tighter uppercase text-bone mt-2">
                Collect Print.
              </h2>

              <p className="text-bone/50 text-sm leading-relaxed mt-4">
                Choose a store below to order your physical copy of Tales 'N'
                Tells through WhatsApp.
              </p>
            </div>

            {/* Store List */}
            <div className="flex flex-col gap-4">
              {stores.map((store, index) => (
                <div
                  key={index}
                  className="border border-bone/10 bg-bone/5 p-5 hover:border-accent/40 transition-colors"
                >
                  <h3 className="text-bone font-bold text-lg">
                    {store.name}
                  </h3>

                  <p className="text-bone/50 text-sm mt-2 mb-5">
                    {store.address}
                  </p>

                  <a
                    href={store.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center px-5 py-3 bg-accent text-white font-bold text-xs tracking-widest uppercase hover:bg-accent/90 transition-all"
                  >
                    Order via WhatsApp
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}