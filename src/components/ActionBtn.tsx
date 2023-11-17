import React from "react";

type ActionBtnProps = {
  text: string;
  onClick: () => void;
  disabled?: boolean;
};

const ActionBtn: React.FC<ActionBtnProps> = ({ text, onClick, disabled }) => {
  return (
    <button onClick={onClick} className="btn mx-2 m-4" disabled={disabled}>
      {text}
    </button>
  );
};

export default ActionBtn;
