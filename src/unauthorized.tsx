import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface UnauthorizedPageProps {
  setShowNavFooter: (value: boolean) => void;
}

export default function Unauthorized({
  setShowNavFooter,
}: UnauthorizedPageProps) {
  const navigate = useNavigate();

  const routeChange = () => {
    navigate("/");
    setShowNavFooter(false);
  };

  //trigger showNavFooter asap, so nav and footer dont show up in 404
  useEffect(() => {
    setShowNavFooter(false);
  }, []);

  return (
    <section className="flex justify-center items-center h-screen">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-sky-600">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
            Somethings missing.
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            Sorry, we cant find that page. Youll find lots to explore on the
            home page.{" "}
          </p>
          <button
            type="button"
            className="font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2 
                   transition-transform transform active:scale-95"
            onClick={routeChange}
          >
            Back to Homepage
          </button>
        </div>
      </div>
    </section>
  );
}
