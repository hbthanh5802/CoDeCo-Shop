import React, { useId } from 'react';
import PropTypes from 'prop-types';

import { AiOutlineRight } from 'react-icons/ai';

const OrderProcessStep = ({
  initialProcess = 1,
  currentProcess = 1,
  processStepList = [],
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
            className="duration-150 flex items-center gap-[12px] text-[18px]"
          >
            <span
              className={`duration-150 flex items-center gap-[12px] ${
                process === currentProcess
                  ? 'text-[var(--color-primary)] font-semibold'
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
};

export default OrderProcessStep;
