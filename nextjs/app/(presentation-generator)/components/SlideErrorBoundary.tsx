"use client";

import React from "react";
import { withTranslation } from "next-i18next";

interface SlideErrorBoundaryProps {
  children: React.ReactNode;
  label?: string;
  t: (key: string, options?: any) => string;
}

interface SlideErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

class SlideErrorBoundaryComponent extends React.Component<
  SlideErrorBoundaryProps,
  SlideErrorBoundaryState
> {
  constructor(props: SlideErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error: unknown): SlideErrorBoundaryState {
    return {
      hasError: true,
      errorMessage: error instanceof Error ? error.message : String(error),
    };
  }

  componentDidCatch(error: unknown) {
    // Optionally log to an error reporting service
    // eslint-disable-next-line no-console
    console.error("Slide render error:", error);
  }

  render() {
    const { t, label } = this.props;
    
    if (this.state.hasError) {
      return (
        <div className="aspect-video w-full h-full bg-red-50 text-red-700 flex flex-col items-start justify-start p-4 space-y-2 rounded-md border border-red-200">
          <div className="text-sm font-semibold">
            {label ? t('slide_error_boundary.error_label', { label }) : t('slide_error_boundary.error_default')}
          </div>
          <pre className="text-xs whitespace-pre-wrap break-words max-h-full overflow-auto bg-red-100 rounded-md p-2 border border-red-200">
            {this.state.errorMessage}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

const SlideErrorBoundary = withTranslation('component')(SlideErrorBoundaryComponent);

export default SlideErrorBoundary;


