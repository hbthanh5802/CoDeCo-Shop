import React, { useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Router } from 'react-router-dom';

const HistoryRouter = ({ basename, children, history }) => {
  let [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      basename={basename}
      location={state.location}
      navigator={history}
      navigationType={state.action}
    >
      {children}
    </Router>
  );
};

export default HistoryRouter;
