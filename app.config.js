const IS_DEV = process.env.APP_VARIANT === "development";
const IS_PREVIEW = process.env.APP_VARIANT === "preview";

export default ({ config }) => ({
  ...config,
  name: getAppName(),
  ios: {
    ...config.ios,
    bundleIdentifier: getUniqueIdentifier(),
  },
  android: {
    ...config.android,
    package: getUniqueIdentifier(),
  },
});

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return "com.fusionfroze.flip.dev";
  }

  if (IS_PREVIEW) {
    return "com.fusionfroze.flip.preview";
  }

  return "com.fusionfroze.flip";
};

const getAppName = () => {
  if (IS_DEV) {
    return "Flip (Dev)";
  }

  if (IS_PREVIEW) {
    return "Flip (Preview)";
  }

  return "Flip: Heads or Tails";
};
