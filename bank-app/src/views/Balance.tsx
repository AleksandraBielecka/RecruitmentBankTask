import React from "react";

interface IBalanceProps {
  sum: number;
}

const Balance: React.FC<IBalanceProps> = ({ sum }) => {
  return (
    <div className="mg-tp30">
      <h4>Balance:</h4>
      {sum?.toFixed(2)}
    </div>
  );
};

export default Balance;
