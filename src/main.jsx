import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import Index from "./routes/index";
import TokenMarket from "./routes/token-market";
import AccountProfiler from "./routes/account-profiler";
import TokenProfiler from "./routes/token-profiler";
import TransactionTracer from "./routes/transaction-tracer";
import ContractInspector from "./routes/contract-inspector";
import BlockTracker from "./routes/block-tracker";

import NoMatch from "./routes/no-match";
import ErrorPage from "./error-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          { path: "market", element: <TokenMarket /> },
          { path: "accountprofiler", element: <AccountProfiler /> },
          { path: "tokenprofiler", element: <TokenProfiler /> },
          { path: "transactiontracer", element: <TransactionTracer /> },
          { path: "contractinspector", element: <ContractInspector /> },
          { path: "blocktracker", element: <BlockTracker /> },
          { path: "*", element: <NoMatch /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
