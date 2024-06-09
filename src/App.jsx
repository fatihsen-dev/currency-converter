import { useEffect } from "react";
import Currency from "./components/Currency";
import Navbar from "./ui/Navbar";

export default function App() {
   useEffect(() => {
      const theme = localStorage.getItem("theme");

      if (theme) {
         if (theme === "dark") {
            document.body.classList.add("dark");
            document.body.classList.remove("light");
         } else {
            document.body.classList.add("light");
            document.body.classList.remove("dark");
         }
      } else {
         localStorage.setItem("theme", "dark");
         document.body.classList.add("dark");
         document.body.classList.remove("light");
      }
   }, []);

   return (
      <>
         <Navbar />
         <Currency />
      </>
   );
}
