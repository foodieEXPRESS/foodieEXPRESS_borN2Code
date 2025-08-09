import React from 'react';
import type { PageTitleProps } from '../../types/propsTypes';

const PageTitle: React.FC<PageTitleProps> = ({ title, subtitle }) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2 font-sans">
        {title}
      </h1>
      <p className="text-gray-600 font-sans">
        {subtitle}
      </p>
    </div>
  );
};

export default PageTitle;
