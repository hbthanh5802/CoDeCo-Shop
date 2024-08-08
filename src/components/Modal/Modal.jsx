import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import { IoClose } from 'react-icons/io5';
import './Modal.scss';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className={`modal-overlay transition-all duration-1000 fixed inset-0 flex justify-center items-center ${
        isOpen ? 'visible bg-black/20' : 'invisible'
      }`}
      onClick={onClose}
    >
      <div className={`modal-content animate__animated animate__bounceIn`}>
        <button
          className="modal-close duration-200 flex items-center p-[2px] rounded-full border border-[#f7f7f7] hover:bg-[#f7f7f7]"
          onClick={onClose}
        >
          <IoClose className="flex text-[24px]" />
        </button>
        <div onClick={(e) => e.stopPropagation()}>{children}</div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;
