export const takeABreak = async (timeout = 0) =>
  new Promise((resolve) => setTimeout(resolve, timeout));
