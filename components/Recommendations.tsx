
import React from 'react';
import type { Recommendation } from '../types';
import { AlertTriangleIcon, CheckSquareIcon, ClipboardListIcon } from './icons/Icons';

interface RecommendationsProps {
  recommendation: Recommendation;
}

const PriorityBadge: React.FC<{ priority: 'Low' | 'Medium' | 'High' }> = ({ priority }) => {
  const baseClasses = "px-3 py-1 text-sm font-bold rounded-full inline-flex items-center";
  const colorClasses = {
    Low: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
    Medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300",
    High: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300",
  };
  return <span className={`${baseClasses} ${colorClasses[priority]}`}>{priority} Priority</span>;
};

export const Recommendations: React.FC<RecommendationsProps> = ({ recommendation }) => {
  return (
    <div className="bg-white dark:bg-secondary-800 p-6 rounded-xl shadow-lg border border-secondary-200 dark:border-secondary-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <ClipboardListIcon className="h-7 w-7 text-primary-600" />
          <h2 className="text-xl font-bold text-secondary-900 dark:text-secondary-100">Recommendations</h2>
        </div>
        <PriorityBadge priority={recommendation.priority} />
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-secondary-800 dark:text-secondary-200 mb-2 flex items-center space-x-2">
            <CheckSquareIcon className="h-5 w-5 text-secondary-600 dark:text-secondary-400" />
            <span>Recommended Next Steps</span>
          </h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-secondary-700 dark:text-secondary-300 pl-2">
            {recommendation.nextSteps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </div>
        
        {recommendation.followUp && (
          <div>
            <h3 className="text-lg font-semibold text-secondary-800 dark:text-secondary-200 mb-2">Follow-up Plan</h3>
            <p className="text-sm text-secondary-600 dark:text-secondary-300 bg-secondary-50 dark:bg-secondary-700/50 p-3 rounded-md border dark:border-secondary-600">{recommendation.followUp}</p>
          </div>
        )}

        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/40 border-l-4 border-yellow-400 dark:border-yellow-600">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangleIcon className="h-5 w-5 text-yellow-500 dark:text-yellow-400"/>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">{recommendation.disclaimer}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};