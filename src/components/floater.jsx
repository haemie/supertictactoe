import React, { useRef, useEffect } from 'react';

const Floater = () => {
  const ref = useRef();

  useEffect(() => {
    document.addEventListener('mousemove', (e) => {
      ref.current.style.left = e.clientX + 'px';
      ref.current.style.top = e.clientY + 'px';
    });
  }, []);

  return (
    <div
      ref={ref}
      style={{ width: '100px', height: '100px', backgroundColor: 'red' }}
    />
  );
};

export default Floater;
