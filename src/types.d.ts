// Type declarations for modules without TypeScript definitions

declare module 'react-scripts';

// Type declarations for ChartJS components
declare module 'chart.js' {
  export interface ChartData {
    labels?: Array<string>;
    datasets: Array<{
      label?: string;
      data: Array<number>;
      backgroundColor?: string | string[];
      borderColor?: string | string[];
      borderWidth?: number;
      fill?: boolean;
      tension?: number;
    }>;
  }

  export interface ChartOptions {
    responsive?: boolean;
    maintainAspectRatio?: boolean;
    plugins?: {
      legend?: {
        position?: 'top' | 'bottom' | 'left' | 'right';
        display?: boolean;
      };
      title?: {
        display?: boolean;
        text?: string;
      };
    };
    scales?: {
      y?: {
        beginAtZero?: boolean;
        ticks?: {
          callback?: (value: any) => string;
        };
      };
      x?: {
        grid?: {
          display?: boolean;
        };
      };
    };
  }
}

declare module 'react-chartjs-2' {
  import { Component } from 'react';
  import { ChartData, ChartOptions } from 'chart.js';

  export class Line extends Component<{
    data: ChartData;
    options?: ChartOptions;
    height?: number;
    width?: number;
  }> {}

  export class Bar extends Component<{
    data: ChartData;
    options?: ChartOptions;
    height?: number;
    width?: number;
  }> {}

  export class Pie extends Component<{
    data: ChartData;
    options?: ChartOptions;
    height?: number;
    width?: number;
  }> {}

  export class Doughnut extends Component<{
    data: ChartData;
    options?: ChartOptions;
    height?: number;
    width?: number;
  }> {}
}

// Declare environment variables
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    REACT_APP_API_URL: string;
  }
}
