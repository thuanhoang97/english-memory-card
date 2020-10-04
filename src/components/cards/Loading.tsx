import React from 'react';

type Props = {
  percent: number;
};

const Loading: React.VFC<Props> = ({ percent }) => {
  return (
    <div className="loading">
      <div className="loading__bg" style={{ width: `${percent}%` }}></div>
      <p className="loading__percent">{percent}%</p>
    </div>
  );
};

export default Loading;
