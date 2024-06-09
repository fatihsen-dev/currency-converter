import { useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

export default function Navbar() {
   const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

   const themeHandle = (e) => {
      const theme = e.target.value;
      localStorage.setItem("theme", theme);
      setTheme(theme);

      if (theme === "dark") {
         document.body.classList.add("dark");
         document.body.classList.remove("light");
      } else {
         document.body.classList.add("light");
         document.body.classList.remove("dark");
      }
   };

   return (
      <nav>
         <div className='container'>
            <label htmlFor='theme-ctnr' className='theme-ctnr'>
               {theme === "dark" ? <FiMoon /> : <FiSun />}
               <select id='theme-ctnr' value={theme} onChange={themeHandle}>
                  <option value='dark'>Dark Mode</option>
                  <option value='light'>Light Mode</option>
               </select>
            </label>
         </div>
      </nav>
   );
}
