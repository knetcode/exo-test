export function onIdBlur(e: React.FocusEvent<HTMLInputElement>, setValue: (value: string) => void) {
  const idNumber = e.target.value;

  if (idNumber.length === 13 && /^\d{13}$/.test(idNumber)) {
    const yearDigits = idNumber.substring(0, 2);
    const month = idNumber.substring(2, 4);
    const day = idNumber.substring(4, 6);

    const currentYear = new Date().getFullYear();
    const currentCentury = Math.floor(currentYear / 100) * 100;
    const yearNum = parseInt(yearDigits);

    let fullYear;
    if (yearNum <= 30) {
      fullYear = currentCentury + yearNum;
    } else {
      fullYear = currentCentury - 100 + yearNum;
    }

    const formattedDate = `${fullYear}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;

    setValue(formattedDate);
  }
}
