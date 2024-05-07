export const formatDateDDMMYYYY = (oldFormat) => {
  const newDate = new Date(oldFormat);
  const day = newDate.getDate().toString().padStart(2, '0'); 
  const month = (newDate.getMonth() + 2).toString().padStart(2, '0'); 
  const year = newDate.getFullYear(); 
  return `${day}/${month}/${year}`;
}