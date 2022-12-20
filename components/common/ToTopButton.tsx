import React from 'react';
import { SlArrowUp } from 'react-icons/sl';

const ToTopButton = () => {
  return (
    <button
      className="fixed bottom-8 right-8 hover:bg-pink-100 p-4 rounded-full"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <SlArrowUp size={'2rem'} />
    </button>
  );
};

export default ToTopButton;
