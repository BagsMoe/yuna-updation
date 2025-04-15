'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';
import { FieldError } from 'react-hook-form';

type ErrorMessages = {
  [key: string]: string;
};

type HelperErrorTextProps = {
  error?: FieldError;
  messages?: ErrorMessages;
};

export const HelperErrorText: React.FC<HelperErrorTextProps> = ({ error, messages = {} }) => {
  if (!error) return null;

  const errorType = error.type ?? 'default';
  const message = messages[errorType] || error.message;

  return (
    <p className="flex items-start text-xs text-red-500 gap-1.5">
      <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
      {message}
    </p>
  );
};
