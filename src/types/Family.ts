import Contact from './Contact';

export default interface Family {
  id?: number;
  name: string;
  address: string;
  details: string | null;
  contacts: Contact[];
}
