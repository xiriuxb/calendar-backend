import moment from "moment";
const isDate = (value: any) => {
  if (!value) return false;
  const date = moment(value);
  return date.isValid();
};

export default isDate;
