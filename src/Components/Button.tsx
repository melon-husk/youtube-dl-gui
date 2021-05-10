import React from 'react';

interface Props {
  buttonText: string;
  className?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ buttonText, onClick, className }: Props) => {
  return (
    <button
      type="button"
      className={`inline-block h-8 px-3 py-5 text-xl font-medium leading-[0rem] text-gray-200 bg-teal-600 border-2 border-gray-800 rounded-md hover:border-gray-200 hover:text-gray-100 focus:border-gray-200 ${className}`}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
};

Button.defaultProps = {
  className: '',
};

export default Button;
