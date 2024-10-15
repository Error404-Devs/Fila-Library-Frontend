import { useTheme } from "next-themes";

export const DarkModeSwitch = () => {

    const { setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme("dark")}
      className="flex items-center justify-center w-12 h-6 bg-gray-200 dark:bg-gray-600 rounded-full p-1 transition-colors duration-300 focus:outline-none"
    >
      {/* <span
        className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
           === 'dark' ? 'translate-x-6' : ''
        }`}
      /> */}
    </button>
  );
};
