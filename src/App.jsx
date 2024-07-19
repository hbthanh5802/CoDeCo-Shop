import { Fragment, useEffect, useId, useState } from 'react';
import './App.css';
import routes from '@/routers/index';
import {
  Route,
  Routes,
  unstable_HistoryRouter as HistoryRouter,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { customHistory } from '@/utils/history';

import 'react-toastify/dist/ReactToastify.css';
import DefaultLayout from '@/layouts/DefaultLayout';

function App() {
  const routeId = useId();
  const pathname = window.location.pathname;

  return (
    <HistoryRouter history={customHistory}>
      <div
        className={[
          'App font-body container min-h-screen flex flex-col items-center',
          pathname.startsWith('/auth/')
            ? 'max-w-full'
            : 'px-[80px] max-w-[1440px]',
        ].join(' ')}
      >
        <Routes>
          {routes.map((route, index) => {
            let Layout = DefaultLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }
            const Page = route.component;
            return (
              <Route
                key={`${routeId}-${index}`}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
      <ToastContainer
        stacked
        closeOnClick
        position="top-right"
        autoClose={1500}
        theme="colored"
      />
    </HistoryRouter>
  );
}

export default App;
