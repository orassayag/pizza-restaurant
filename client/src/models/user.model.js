export default class UserModel {
  constructor({
    firstName,
    lastName,
    address,
    houseNumber,
    city,
    email,
    phone,
    dateOfBirth,
    isNewsLetter,
    gender,
    imageId,
  }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.houseNumber = houseNumber;
    this.city = city;
    this.email = email;
    this.phone = phone;
    this.dateOfBirth = dateOfBirth;
    this.isNewsLetter = isNewsLetter;
    this.gender = gender;
    this.imageId = imageId;
  }
}
