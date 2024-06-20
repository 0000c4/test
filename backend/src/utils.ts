export const timeConverter = (UNIX_timestamp: number): string => {
    const time = new Date(UNIX_timestamp * 1000);
    return addZero(time.getDate()) + '.' + addZero(time.getMonth()) + '.' + time.getFullYear() + ' ' + addZero(time.getHours()) + ':' + addZero(time.getMinutes());
  }

  const addZero = (number: number): string | number =>{
    if(String(number).length === 1){
      return '0' + String(number)
    }
    else{
      return number
    }
  }