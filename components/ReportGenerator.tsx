
import React, { useState, useRef } from 'react';
import type { ReportData } from '../types';
import { DownloadIcon } from './icons/Icons';
import { useReportGenerator } from '../hooks/useReportGenerator';
import { PrintableReport } from './PrintableReport';

interface ReportGeneratorProps {
  data: ReportData;
}

export const ReportGenerator: React.FC<ReportGeneratorProps> = ({ data }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const printableRef = useRef<HTMLDivElement>(null);
  const { generatePdf } = useReportGenerator(printableRef);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      await generatePdf(`NeuroScan_Report_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      alert("Could not generate the report. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-secondary-800 p-6 rounded-xl shadow-lg border border-secondary-200 dark:border-secondary-700 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-secondary-900 dark:text-secondary-100">Generate Report</h2>
          <p className="text-sm text-secondary-600 dark:text-secondary-400 mt-1">Download a comprehensive PDF report of the analysis.</p>
        </div>
        <button
          onClick={handleDownload}
          disabled={isGenerating}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-secondary-300 dark:disabled:bg-secondary-600 disabled:cursor-not-allowed transition-all"
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            <>
              <DownloadIcon className="-ml-1 mr-2 h-5 w-5" />
              Download Report
            </>
          )}
        </button>
      </div>
      
      {/* Hidden component for printing */}
      <div className="absolute -left-full -top-full opacity-0 invisible" aria-hidden="true">
        <div ref={printableRef}>
          <PrintableReport data={data} />
        </div>
      </div>
    </>
  );
};