
import React from 'react';
import type { RoboflowPrediction, GeminiAnalysis } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { MicroscopeIcon, FileTextIcon, ShieldAlertIcon } from './icons/Icons';

interface AnalysisResultProps {
  predictions: RoboflowPrediction[];
  analysis: GeminiAnalysis;
}

const SeverityBadge: React.FC<{ severity: 'Low' | 'Medium' | 'High' | 'Critical' }> = ({ severity }) => {
  const baseClasses = "px-2.5 py-1 text-xs font-semibold rounded-full inline-block";
  const colorClasses = {
    Low: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
    Medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300",
    High: "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300",
    Critical: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300",
  };
  return <span className={`${baseClasses} ${colorClasses[severity]}`}>{severity}</span>;
};


export const AnalysisResult: React.FC<AnalysisResultProps> = ({ predictions, analysis }) => {
  const chartData = predictions.map(p => ({ name: p.class, confidence: (p.confidence * 100).toFixed(1) }));
  const isDarkMode = document.documentElement.classList.contains('dark');
  const axisColor = isDarkMode ? '#94a3b8' : '#64748b';
  const gridColor = isDarkMode ? '#334155' : '#e2e8f0';


  return (
    <div className="bg-white dark:bg-secondary-800 p-6 rounded-xl shadow-lg border border-secondary-200 dark:border-secondary-700">
      <div className="flex items-center space-x-3 mb-6">
        <MicroscopeIcon className="h-7 w-7 text-primary-600" />
        <h2 className="text-xl font-bold text-secondary-900 dark:text-secondary-100">Analysis Results</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Predictions Chart */}
        <div className="p-4 rounded-lg bg-secondary-50 dark:bg-secondary-700/50 border dark:border-secondary-600">
          <h3 className="text-lg font-semibold text-secondary-800 dark:text-secondary-200 mb-4">Model Predictions</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis type="number" domain={[0, 100]} unit="%" style={{ fontSize: '0.75rem' }} stroke={axisColor} />
                <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: '0.75rem' }} stroke={axisColor} />
                <Tooltip 
                    cursor={{fill: isDarkMode ? 'rgba(51, 65, 85, 0.5)' : 'rgba(219, 234, 254, 0.4)'}} 
                    contentStyle={{
                        fontSize: '0.875rem',
                        borderRadius: '0.5rem',
                        backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                        borderColor: isDarkMode ? '#475569' : '#dbeafe'
                    }}
                />
                <Bar dataKey="confidence" fill="#3b82f6" barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Assessment */}
        <div className="p-4 rounded-lg bg-secondary-50 dark:bg-secondary-700/50 border dark:border-secondary-600 flex flex-col">
            <h3 className="text-lg font-semibold text-secondary-800 dark:text-secondary-200 mb-4 flex items-center space-x-2">
                <ShieldAlertIcon className="h-5 w-5 text-secondary-600 dark:text-secondary-400" />
                <span>Risk Assessment</span>
            </h3>
            <div className="mb-3">
              <SeverityBadge severity={analysis.riskAssessment.severity} />
            </div>
            <p className="text-sm text-secondary-600 dark:text-secondary-300 flex-grow">{analysis.riskAssessment.justification}</p>
        </div>
      </div>
      
      {/* Explanation & Summary */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-secondary-800 dark:text-secondary-200 mb-2 flex items-center space-x-2">
            <FileTextIcon className="h-5 w-5 text-secondary-600 dark:text-secondary-400" />
            <span>Explanation & Summary</span>
        </h3>
        <div className="space-y-4 text-sm text-secondary-700 dark:text-secondary-300 prose prose-sm dark:prose-invert max-w-none">
            <p>{analysis.explanation}</p>
            <div className="bg-primary-50 dark:bg-primary-900/30 p-4 rounded-lg border border-primary-200 dark:border-primary-800/60">
                <h4 className="font-semibold text-primary-800 dark:text-primary-300">{analysis.summary.title}</h4>
                <ul className="mt-2 list-disc list-inside space-y-1">
                    {analysis.summary.points.map((point, index) => (
                        <li key={index}>{point}</li>
                    ))}
                </ul>
            </div>
        </div>
      </div>

    </div>
  );
};