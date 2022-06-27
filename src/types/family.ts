import { editField, getItem } from '../utils/universal';
import { beneficiaries, Beneficiary, editFamilyId } from './beneficiary';

interface Family {
  id: string;
  name: string;
  address: string;
  connectivityDetails: string;
  communityId: string;
  members: Beneficiary[];
}

let families: Family[] = [];
let familyId: number = 0;

const createFamily = (
  name: string,
  address: string,
  connectivityDetails: string,
  communityId: string
): void => {
  families.push({
    id: familyId.toString(),
    name,
    address,
    connectivityDetails,
    communityId,
    members: [],
  });
  familyId += 1;
};

createFamily('Rodriguez', 'Av. Olascoaga 2305', 'isampedro@itba.edu.ar', '1');
createFamily('Palo', 'Juan Ortega 1555', 'Whatsapp del Hortencia', '1');
createFamily('Eustaquio', 'Brasil 322', '+54 9 11 3456787', '1');
createFamily('Junin', 'Sarmiento 63', 'Whatsapp del Hortencia', '1');
createFamily('Vera', 'Neuquen 55', 'Whatsapp del Hortencia', '1');

const getFamily = (familyId: string): Family | null => {
  return getItem(families, familyId);
};

const editName = (id: string, name: string): boolean => {
  return editField(families, id, 'name', name);
};

const editAddress = (id: string, address: string): boolean => {
  return editField(families, id, 'address', address);
};

const editConnectivityDetails = (
  id: string,
  connectivityDetails: string
): boolean => {
  return editField(families, id, 'connectivityDetails', connectivityDetails);
};

const editCommunityId = (id: string, communityId: string): boolean => {
  return editField(families, id, 'communityId', communityId);
};

const getMembers = (id: string) => {
  return beneficiaries.filter((benef) => benef.familyId === id);
};

const addMember = (benef: Beneficiary, familyId: string): boolean => {
  const familiesList: Family[] = families.filter(
    (family) => family.id === familyId
  );

  if (!!familiesList) {
    editFamilyId(benef.id, familyId);
    familiesList[0].members.push(benef);
    return true;
  }

  return false;
};

const removeMember = (benef: Beneficiary, familyId: string): boolean => {
  const familiesList: Family[] = families.filter(
    (family) => family.id === familyId
  );

  if (!!familiesList) {
    editFamilyId(benef.id, '-1');
    familiesList[0].members = familiesList[0].members.filter(
      (member) => member.id === benef.id
    );
    return true;
  }

  return false;
};

export {
  families,
  createFamily,
  getFamily,
  getMembers,
  editName,
  editAddress,
  editConnectivityDetails,
  editCommunityId,
  addMember,
  removeMember,
};

export type { Family };
