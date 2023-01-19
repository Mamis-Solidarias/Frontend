import Clothes from './Clothes';
import Education from './Education';
import Health from './Health';
import Job from './Job';

export default interface Beneficiary {
  id?: string;
  familyId?: string;
  firstName: string;
  lastName: string;
  type: string;
  gender: string;
  birthday: string;
  dni: string;
  comments?: string;
  likes?: string;
  clothes?: Clothes;
  education?: Education;
  health?: Health;
  job?: Job;
  isActive?: boolean;
}
