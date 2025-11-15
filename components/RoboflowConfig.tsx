
import React from 'react';
import type { RoboflowConfig as RoboflowConfigType } from '../types';
import { SettingsIcon } from './icons/Icons';

interface RoboflowConfigProps {
  config: RoboflowConfigType;
  setConfig: React.Dispatch<React.SetStateAction<RoboflowConfigType>>;
}

export const RoboflowConfig: React.FC<RoboflowConfigProps> = ({ config, setConfig }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="bg-white dark:bg-secondary-800 p-6 sm:p-8 rounded-xl shadow-lg border border-secondary-200 dark:border-secondary-700">
      <div className="flex items-center space-x-3 mb-4">
        <SettingsIcon className="h-6 w-6 text-primary-600" />
        <h2 className="text-xl font-bold text-secondary-900 dark:text-secondary-100">API Configuration</h2>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
            Roboflow Model URL
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="url"
              id="url"
              value={config.url}
              onChange={handleChange}
              className="block w-full rounded-md border-secondary-300 dark:border-secondary-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-secondary-50 dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100"
              placeholder="https://detect.roboflow.com/brain-tumor-detector-3aukq/3"
            />
          </div>
        </div>
        <div>
          <label htmlFor="apiKey" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
            API Key
          </label>
          <div className="mt-1">
            <input
              type="password"
              name="apiKey"
              id="apiKey"
              value={config.apiKey}
              onChange={handleChange}
              className="block w-full rounded-md border-secondary-300 dark:border-secondary-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-secondary-50 dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100"
              placeholder="zeHvcjTIboeUUuAmXhKv"
            />
          </div>
        </div>
      </div>
      <p className="mt-3 text-xs text-secondary-500 dark:text-secondary-400">
        You can find these details in your Roboflow project under the 'Deploy' tab for your trained classification model. Your credentials are saved locally in your browser.
      </p>
    </div>
  );
};
