import React from 'react';
import PropTypes from 'prop-types';

const ConfirmBox = ({
  className,
  title,
  content,
  onCancel,
  onConfirm,
  confirmLabel,
  cancelLabel,
}) => {
  return (
    <div className={`w-full flex flex-col gap-8 ${className ? className : ''}`}>
      <div className="flex flex-col justify-center gap-3">
        {title && <h1 className="font-semibold text-[20px]">{title}</h1>}
        {content && <p className="text-[16px]">{content}</p>}
      </div>
      <div className="flex gap-6 justify-end">
        <button
          className="duration-200 px-[16px] py-[8px] rounded font-normal hover:brightness-105 hover:text-red-600 hover:bg-red-100"
          onClick={onCancel}
        >
          {cancelLabel || 'Huỷ'}
        </button>
        <button
          className="duration-200 px-[16px] py-[8px] rounded font-normal text-white bg-[var(--color-primary)] hover:brightness-105"
          onClick={onConfirm}
        >
          {confirmLabel || 'Xác nhận'}
        </button>
      </div>
    </div>
  );
};

ConfirmBox.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.node,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  confirmLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
};

export default ConfirmBox;
