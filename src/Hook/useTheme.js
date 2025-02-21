import { useContext } from "react";
import { ThemeContext } from "../Provider/ThemeProvider";

const useTheme = () => {
    const theme = useContext(ThemeContext)
    return theme
};

export default useTheme;
