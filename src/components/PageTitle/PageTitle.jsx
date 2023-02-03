import React from 'react';
import './PageTitle.scss';

function PageTitle(props) {
  const { title, subtitle, description } = props;
  return (
    <div className="page-title flex">
      <div className="text-center max-w-lg m-auto">
        <h1 className="header__title text-4xl">{title}</h1>
        <h2 className="header__subtitle">{subtitle}</h2>
        <span className="header__description">{description}</span>
      </div>
    </div>
  );
}

export default PageTitle;
