import React from "react";
import { StoryFn } from "@storybook/react";

type CssVariables = { [key: string]: string };

export type ThemeOverrideProps = {
  overrides: CssVariables;
};

const ThemeOverride: React.FC<React.PropsWithChildren<ThemeOverrideProps>> = ({
  children,
  overrides,
}) => {
  const style = {
    ...Object.keys(overrides).reduce((acc: CssVariables, key) => {
      acc[`--${key}`] = overrides[key];
      return acc;
    }, {}),
  };

  style.height = "100%";
  style.width = "100%";

  return <div style={style}>{children}</div>;
};

const withThemeOverride = (overrides: CssVariables) => (StoryFn: StoryFn) =>
  (
    <ThemeOverride overrides={overrides}>
      <StoryFn />
    </ThemeOverride>
  );

export default withThemeOverride;
