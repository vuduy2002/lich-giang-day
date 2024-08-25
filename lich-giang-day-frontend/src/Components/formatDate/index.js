  // Hàm chuyển từ mm/dd/yyyy sang dd/mm/yyyy
export const convertToMMDDYYYY = (date) => {
    const [day, month, year] = date.split('-');
    return `${month}/${day}/${year}`;
  }

  // Hàm chuyển từ mm/dd/yyyy sang dd/mm/yyyy
export const  convertToDDMMYYYY= (date) => {
    const [month, day, year] = date.split('-');
    return `${day}/${month}/${year}`;
  }

  // Hàm chuyển từ mm/dd/yyyy sang dd/mm/yyyy
  export const convertFromYYYYMMDD = (date) => {
    if (!date || typeof date !== 'string') {
      return ''; // hoặc giá trị mặc định phù hợp với trường hợp của bạn
    }
  
    const parts = date.split('-');
    if (parts.length !== 3) {
      return ''; // hoặc giá trị mặc định khác tùy thuộc vào yêu cầu của bạn
    }
  
    const [year, month, day] = parts;
    return `${day}/${month}/${year}`;
  };
  



