// @ts-nocheck
import React from 'react';

interface ComponentProps {
  /**
   * Title text for the component.
   */
  title: string;
}

/**
 * Standard Codehava React Component Template
 * AI MUST ADHERE TO THIS RULE:
 * 1. Dilarang melakukan fetch data langsung di komponen UI (presentational component). Fetch harus di parent atau via state-manager.
 * 2. Wajib menggunakan struktur class Tailwind yang rapi dan konsisten.
 */
export default function StandardComponent({ title }: ComponentProps) {
  return (
    <div className="flex flex-col gap-4 p-4 rounded-xl shadow-sm border border-gray-100 bg-white">
      <h2 className="text-xl font-bold text-gray-800 tracking-tight">
        {title}
      </h2>
      <div className="text-gray-600 font-medium">
        {/* Konten komponen di sini */}
        Isi komponen
      </div>
    </div>
  );
}
