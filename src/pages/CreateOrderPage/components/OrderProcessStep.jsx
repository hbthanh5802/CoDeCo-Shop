import React, { useId } from 'react';
import PropTypes from 'prop-types';

import { AiOutlineRight } from 'react-icons/ai';

const OrderProcessStep = ({
  initialProcess = 1,
  canNext = false,
  currentProcess = 1,
  processStepList = [],
  handleSetProcess = () => {},
}) => {
  const processId = useId();
  const processLength = processStepList.length;

  if (processLength === 0) return <>Process List is empty</>;
  return (
    <div className="flex items-center flex-wrap gap-[12px]">
      {processStepList.map((processStepItem, index) => {
        const { process, title } = processStepItem;
        return (
          <div
            key={`${processId}-${index}`}
            className={`duration-100 flex items-center gap-[12px] text-[18px] select-none`}
          >
            <span
              className={`duration-100 flex items-center gap-[12px] ${
                process === currentProcess
                  ? 'text-[var(--color-primary)] px-[8px] py-[2px] border border-[#e58411]/[0.3] bg-[#e58411]/[0.02] rounded-md'
                  : ''
              }`}
            >
              {title}
            </span>
            {index < processLength - 1 && (
              <span>
                <AiOutlineRight />
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

OrderProcessStep.propTypes = {
  initialProcess: PropTypes.number,
  currentProcess: PropTypes.number,
  processStepList: PropTypes.array,
  handleSetProcess: PropTypes.func,
  canNext: PropTypes.bool,
};

export default OrderProcessStep;
