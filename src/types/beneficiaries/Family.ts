import Contact from './Contact';

export default interface Family {
  id?: string;
  name: string;
  address: string;
  details: string | null;
  contacts: Contact[];
}
