export default interface RegisterFormData {
  firstName: string;
  lastName: string;
  dob: string;
  street?: string;
  postalCode: string;
  houseNumber?: string;
  city?: string;
  state?: string;
  country: string;
  phone: string;
  email: string;
  password: string;
}
export  type ContactErrorFields =
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'subject'
  | 'message';