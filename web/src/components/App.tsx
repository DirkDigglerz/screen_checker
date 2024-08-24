import '@mantine/dates/styles.css';
import React, { useEffect, useState } from "react";
import "./App.css";
import Warning from "./Warning/main";
import { MantineProvider } from '@mantine/core';
import theme from '../theme';
import { useSettings } from '../providers/settings/settings';

const App: React.FC = () => {
  const [curTheme, setCurTheme] = useState(theme);
  const settings = useSettings();
  // Ensure the theme is updated when the settings change
  useEffect(() => {
    const cloned = { ...curTheme };
    console.log('new theme' + settings.primaryColor + settings.primaryShade);
    cloned.primaryColor = settings.primaryColor;
    cloned.primaryShade = settings.primaryShade;
    setCurTheme(cloned);
  }, [settings]);

  return (
        
    <MantineProvider theme={curTheme} defaultColorScheme='dark'>
      <Warning />
    </MantineProvider>
  );
};

export default App;
