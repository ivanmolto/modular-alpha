import { Link } from "react-router-dom";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";

const NoMatch = () => {
  return (
    <div className="min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8 bg-gray-50">
      <div className="max-w-max mx-auto">
        <main className="sm:flex">
          <p className="text-4xl font-extrabold text-mant sm:text-5xl font-montserrat">
            404
          </p>
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-mant-200 sm:pl-6">
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl font-montserrat">
                Page not found
              </h1>
              <p className="mt-1 text-base text-gray-900 font-montserrat">
                Please check the URL in the address bar and try again.
              </p>
            </div>
            <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-mant hover:bg-bit hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mant"
              >
                <ArrowLeftCircleIcon
                  className="-ml-1 mr-3 h-5 w-5"
                  aria-hidden="true"
                />
                Go back home
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
export default NoMatch;
