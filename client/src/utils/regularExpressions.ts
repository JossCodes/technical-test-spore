export const getRegExp = (name: string) => {
  const regExp: {
    [key: string]: RegExp;
  } = {
    email: new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}"),
  };
  return regExp[name];
};
