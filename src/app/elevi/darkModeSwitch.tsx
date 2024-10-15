import { useTheme } from "next-themes";
import { Sun, Moon } from 'lucide-react';
import "../../styles/styles.css"

export const DarkModeSwitch = () => {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <input type="checkbox" className="input" id="darkmode-toggle" checked={theme === "dark"}></input>
      <label htmlFor="darkmode-toggle" className="button flex items-center justify-center w-12 h-6 bg-gray-200 dark:bg-gray-600 rounded-full p-1 transition-colors duration-300 focus:outline-none"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
        <span className="toggle-circle w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300"></span>
      </label>
    </>
  );
};
