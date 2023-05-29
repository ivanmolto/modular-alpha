import { Fragment, useState } from "react";
import { Link, Outlet, useMatch, useResolvedPath } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import {
  BriefcaseIcon,
  CodeBracketIcon,
  HomeIcon,
  FireIcon,
  Bars3Icon,
  QueueListIcon,
  Square2StackIcon,
  StarIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

function CustomLink({ children, to, ...props }) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <div>
      <Link
        className={
          match
            ? "bg-bit text-black group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md"
            : "text-white hover:text-white hover:bg-mant group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md"
        }
        to={to}
        {...props}
        aria-current="page"
      >
        {children}
      </Link>
    </div>
  );
}

const Root = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="min-h-full font-montserrat">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 flex z-40">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-mant">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex-shrink-0 flex items-center px-4 font-semibold text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#c1ff3c"
                      className="w-8 h-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z"
                      />
                    </svg>

                    <span className="ml-2 text-bit text-2xl">
                      Modular Alpha
                    </span>
                  </div>
                  <nav
                    className="mt-5 flex-shrink-0 h-full divide-y divide-mant overflow-y-auto"
                    aria-label="Sidebar"
                  >
                    <div className="px-2 space-y-1">
                      <ul>
                        <CustomLink to="/market">
                          <FireIcon
                            className="mr-4 flex-shrink-0 h-6 w-6"
                            aria-hidden="true"
                          />
                          Token Market Overview
                        </CustomLink>
                      </ul>
                      <ul>
                        <CustomLink to="/accountprofiler">
                          <BriefcaseIcon
                            className="mr-4 flex-shrink-0 h-6 w-6"
                            aria-hidden="true"
                          />
                          Address Profiler
                        </CustomLink>
                      </ul>
                      <ul>
                        <CustomLink to="/tokenprofiler">
                          <StarIcon
                            className="mr-4 flex-shrink-0 h-6 w-6"
                            aria-hidden="true"
                          />
                          Token Profiler
                        </CustomLink>
                      </ul>
                      <ul>
                        <CustomLink to="/transactiontracer">
                          <QueueListIcon
                            className="mr-4 flex-shrink-0 h-6 w-6"
                            aria-hidden="true"
                          />
                          Transaction Tracer
                        </CustomLink>
                      </ul>
                      <ul>
                        <CustomLink to="/contractinspector">
                          <CodeBracketIcon
                            className="mr-4 flex-shrink-0 h-6 w-6"
                            aria-hidden="true"
                          />
                          Contract Inspector
                        </CustomLink>
                      </ul>
                      <ul>
                        <CustomLink to="/blocktracker">
                          <Square2StackIcon
                            className="mr-4 flex-shrink-0 h-6 w-6"
                            aria-hidden="true"
                          />
                          Block Tracker
                        </CustomLink>
                      </ul>
                    </div>
                    <div className="mt-6 pt-6">
                      <div className="px-2 space-y-1">
                        <CustomLink to="/">
                          <HomeIcon
                            className="mr-4 flex-shrink-0 h-6 w-6"
                            aria-hidden="true"
                          />
                          Home
                        </CustomLink>
                        <a
                          key="GitHub"
                          rel="noreferrer"
                          target="_blank"
                          href="https://github.com/ivanmolto/modularalpha"
                          className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-white hover:text-white hover:bg-mant"
                        >
                          <svg
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            className="mr-4 h-6 w-6"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Repo
                        </a>
                        <a
                          key="Twitter"
                          rel="noreferrer"
                          target="_blank"
                          href="https://twitter.com/ivanmolto"
                          className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-white hover:text-white hover:bg-mant"
                        >
                          <svg
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            className="mr-4 h-6 w-6 text-white"
                          >
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                          </svg>
                          Twitter
                        </a>
                      </div>
                    </div>
                  </nav>
                </Dialog.Panel>
              </Transition.Child>
              <div className="flex-shrink-0 w-14" aria-hidden="true"></div>
            </div>
          </Dialog>
        </Transition.Root>

        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
          <div className="flex flex-col flex-grow bg-black pt-5 pb-4 overflow-y-auto ">
            <div className="flex items-center flex-shrink-0 px-4 text-lg font-semibold text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill=""
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#c1ff3c"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z"
                />
              </svg>

              <span className="ml-2 text-bit text-2xl">Modular Alpha</span>
            </div>
            <nav
              className="mt-5 flex-1 flex flex-col divide-y divide-bit overflow-y-auto"
              aria-label="Sidebar"
            >
              <div className="px-2 space-y-1">
                <ul>
                  <CustomLink to="/market">
                    <FireIcon
                      className="mr-4 flex-shrink-0 h-6 w-6"
                      aria-hidden="true"
                    />
                    Token Market Overview
                  </CustomLink>
                </ul>
                <ul>
                  <CustomLink to="/accountprofiler">
                    <BriefcaseIcon
                      className="mr-4 flex-shrink-0 h-6 w-6"
                      aria-hidden="true"
                    />
                    Address Profiler
                  </CustomLink>
                </ul>
                <ul>
                  <CustomLink to="/tokenprofiler">
                    <StarIcon
                      className="mr-4 flex-shrink-0 h-6 w-6"
                      aria-hidden="true"
                    />
                    Token Profiler
                  </CustomLink>
                </ul>
                <ul>
                  <CustomLink to="/transactiontracer">
                    <QueueListIcon
                      className="mr-4 flex-shrink-0 h-6 w-6"
                      aria-hidden="true"
                    />
                    Transaction Tracer
                  </CustomLink>
                </ul>
                <ul>
                  <CustomLink to="/contractinspector">
                    <CodeBracketIcon
                      className="mr-4 flex-shrink-0 h-6 w-6"
                      aria-hidden="true"
                    />
                    Contract Inspector
                  </CustomLink>
                </ul>
                <ul>
                  <CustomLink to="/blocktracker">
                    <Square2StackIcon
                      className="mr-4 flex-shrink-0 h-6 w-6"
                      aria-hidden="true"
                    />
                    Block Tracker
                  </CustomLink>
                </ul>
              </div>
              <div className="mt-6 pt-6">
                <div className="px-2 space-y-1">
                  <CustomLink to="/">
                    <HomeIcon
                      className="mr-4 flex-shrink-0 h-6 w-6"
                      aria-hidden="true"
                    />
                    Home
                  </CustomLink>
                  <a
                    key="GitHub"
                    href="https://github.com/ivanmolto/modularalpha"
                    rel="noreferrer"
                    target="_blank"
                    className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-white hover:text-white hover:bg-mant"
                  >
                    <svg
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="mr-4 h-6 w-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Repo
                  </a>
                  <a
                    key="Twitter"
                    rel="noreferrer"
                    target="_blank"
                    href="https://twitter.com/ivanmolto"
                    className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-white hover:text-white hover:bg-mant"
                  >
                    <svg
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="mr-4 h-6 w-6"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                    Twitter
                  </a>
                </div>
              </div>
            </nav>
            <div className="flex-shrink-0 flex justify-around items-center px-4 mb-4"></div>
            <div className="text-white justify-center mx-auto items-center px-4 py-3 mb-4 rounded-lg border-2 border-bit">
              Built on Mantle
            </div>
          </div>
        </div>

        <div className="lg:pl-64 flex flex-col flex-1">
          <div className="relative z-10 flex-shrink-0 flex h-16 bg-gray-50 border-b border-gray-200 lg:border-none">
            <button
              type="button"
              className="px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emant lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
};
export default Root;
