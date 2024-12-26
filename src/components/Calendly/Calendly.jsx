import React from "react";
import { InlineWidget, PopupButton, PopupWidget } from "react-calendly";

export default function Calendly() {
  const URL = "https://calendly.com/deepak96153/ri5e-product-meeting";
  //   return (
  //     <div>
  //       <h1>Calendly</h1>
  //       <div>
  //         <InlineWidget url={URL} />
  //       </div>
  //     </div>
  //   );
  //   return (
  //     <div>
  //       <PopupWidget
  //         rootElement={document.getElementById("root")}
  //         url={URL}
  //         text="Click here to schedule"
  //         textColor="#ffffff"
  //         color="#00a2ff"
  //       />
  //     </div>
  //   );
  return (
    <div className="flex justify-center">
      <PopupButton
        url={URL}
        rootElement={document.getElementById("root")}
        text="Schedule meeting"
        className="min-w-48 rounded border border-white bg-transparent p-2 font-semibold text-white transition hover:bg-gray-300 hover:text-black md:w-full"
      />
    </div>
  );
}
