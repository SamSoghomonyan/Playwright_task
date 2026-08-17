import RegisterFormData from "./Type";
const Email = `testuser_${Date.now()}@example.com`;
const InvalidEmailData = `testuser_${Date.now()}example.com`;
const Password = `@Testpassword${Date.now()}`;
const name = `name_${Date.now()}`;
const surname = `surname_${Date.now()}`;

export const validUserData: RegisterFormData = {
  firstName: name,
  lastName: surname,
  dob: '2000-12-12',
  street: 'Abovyan',
  houseNumber: '324',
  postalCode: '0924',
  city: 'Yerevan',
  state: 'Armavir',
  country: 'AM',
  phone: '37477855844',
  email: Email,
  password: Password,
};

export const invalidEmailData: RegisterFormData = {
  firstName: name,
  lastName: surname,
  dob: '2000-12-12',
  street: 'Abovyan',
  houseNumber: '324',
  postalCode: '0924',
  city: 'Yerevan',
  country: 'AM',
  phone: '37477855844',
  email: InvalidEmailData,
  password: Password,
};

export const ContactInfon = {
  firstName: name,
  lastName: surname,
  email: Email,
  subject: 'status-of-order',
  message: 'Hello, I am writing to check the status of my order. Please provide an update as soon as possible. Thanks!' // > 50 նիշ
}

export const ShortMessage = {
  firstName: name,
  lastName: surname,
  email: Email,
  subject: 'status-of-order',
  message: 'Too short message'
}

export const SubCategories = [
  'Hand Saw',
  'Wrench',
  'Screwdriver',
  'Pliers',
  'Chisels',
  'Measures'
];