import React from 'react';
import ContentLoader from 'react-content-loader';

interface CardLoaderProps {}

const CardLoader: React.FC<CardLoaderProps> = (props) => {
  return (
    <ContentLoader
      width={250}
      height={150}
      viewBox="0 0 250 150"
      backgroundColor="#f0f0f0"
      foregroundColor="#dedede"
      {...props}
    >
      <rect x="0" y="0" rx="25" ry="25" width="250" height="150" />
    </ContentLoader>
  );
};
export default CardLoader;
