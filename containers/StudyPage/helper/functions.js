/**
 * Created by mike on 10/16/16.
 */

import libPhoneNumber from 'google-libphonenumber';
const PNF = libPhoneNumber.PhoneNumberFormat;
const phoneUtil = libPhoneNumber.PhoneNumberUtil.getInstance();

export function formatPhone(phone) {
  let patientPhone;
  const phoneNumber = phoneUtil.parse(phone, '');
  const countryCode = phoneNumber.getCountryCode();
  if (countryCode === 1) {
    patientPhone = phoneUtil.format(phoneNumber, PNF.NATIONAL);
  } else {
    patientPhone = phoneUtil.format(phoneNumber, PNF.INTERNATIONAL);
  }
  return patientPhone;
}

export function normalizePhone(value) {
  if (!value) {
    return value;
  }
  const onlyNums = value.replace(/[^\d]+/g, '');
  if (onlyNums.length <= 10) {
    return `+1${onlyNums}`;
  }
  return `+${onlyNums}`;
}

export function normalizePhoneDisplay(value) {
  if (!value) {
    return value;
  }
  const onlyNums = value.replace(/[^\d]+/g, '');
  if (onlyNums.length <= 10) {
    return `(${onlyNums.slice(0, 3)}) ${onlyNums.slice(3, 6)}-${onlyNums.slice(6, 10)}`;
  } else if (onlyNums.length === 11 && value.slice(0, 2) === '+1') {
    return `(${onlyNums.slice(1, 4)}) ${onlyNums.slice(4, 7)}-${onlyNums.slice(7, 11)}`;
  }
  return `+${onlyNums}`;
}
