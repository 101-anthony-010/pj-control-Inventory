export const formatDateDDMMYYYY2 = (oldFormat) => {
  const newDate = new Date(oldFormat);
  // Obtener la fecha local en UTC
  const localDate = new Date(newDate.getTime() + newDate.getTimezoneOffset() * 60000);
  const day = localDate.getDate().toString().padStart(2, '0');
  const month = (localDate.getMonth() + 1).toString().padStart(2, '0');
  const year = localDate.getFullYear();
  return `${day}/${month}/${year}`;
}
