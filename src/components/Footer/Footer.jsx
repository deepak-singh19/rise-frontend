import { footerLinks } from "../../lib/constants/data";

export default function Footer() {
  return (
    <footer className="bg-black text-center text-white">
      <div className="flex flex-col p-4">
        <p className="mb-2 text-4xl font-bold">Ri5e</p>
        <hr className="h-1 w-[90%] self-center rounded-xl bg-white/20" />
      </div>
      <div className="flex justify-center gap-x-12 p-4">
        <div className="flex justify-center">
          <ul>
            {footerLinks.map((footerLink) => (
              <li
                key={footerLink.link}
                className="p-2 text-xl hover:scale-110 hover:font-medium active:scale-105"
              >
                <a href={footerLink.link}>{footerLink.title}</a>
              </li>
            ))}
          </ul>
        </div>
        {/* if required */}
        {/* <div className="flex justify-center">
          <ul>
            {footerLinks.map((footerLink) => (
              <li key={footerLink.link} className="p-2 hover:font-medium hover:scale-110 active:scale-105">
                <a href={footerLink.link}>{footerLink.title}</a>
              </li>
            ))}
          </ul>
      
        </div> */}
      </div>
      <div className="flex flex-col justify-center p-4">
        <hr className="my-2 h-1 w-[90%] self-center rounded-xl bg-white/20" />
        <p className="text-xs font-medium text-white/50">
          {" "}
          &copy;{Date().split(" ")[3]} Ri5e. All Rights Reserved.{" "}
        </p>
      </div>
    </footer>
  );
}
