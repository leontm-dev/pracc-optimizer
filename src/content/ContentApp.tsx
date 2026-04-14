import React from "react";

export default function ContentApp() {
  const [isdialogOpen, setIsDialogOpen] = React.useState(true);

  if (!isdialogOpen) {
    return (
      <div className="mx-auto p-6">
        <button
          onClick={() => setIsDialogOpen(true)}
          className="bg-white rounded-md p-3 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Open content script hint <span aria-hidden="true">+</span>
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl md:px-0 lg:p-6">
      <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl lg:rounded-3xl md:pt-24 md:h-full sm:h-screen lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
        <div className="absolute z-20 top-0 inset-x-0 flex justify-center overflow-hidden pointer-events-none">
          <div className="w-432 flex-none flex justify-end">
            <picture></picture>
          </div>
        </div>
        <div className="mx-auto max-w-md text-center lg:py-12 lg:mx-0 lg:flex-auto lg:text-left">
          <div className="flex items-center justify-center space-x-4 my-4 mx-auto">
            <div className="text-3xl text-white">+</div>

            <div className="text-3xl text-white">+</div>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            This is a content script running React, TypeScript, and Tailwind.css
            Live Update Proof 21
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Learn more about creating cross-browser extensions by{" "}
            <button
              onClick={() => setIsDialogOpen(false)}
              className="underline hover:no-underline
            "
            >
              closing this hint
            </button>
            .
          </p>
        </div>
        <div className="relative mt-16 h-80 lg:mt-8"></div>
      </div>
    </div>
  );
}
