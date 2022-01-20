import { format } from "date-fns";

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return format(date, "kk:mm - dd/MM/yyyy");
}

export default formatDate;
