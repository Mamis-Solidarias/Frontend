import { editField, getItem } from '../utils/universal'

interface Beneficiary {
  id: string
  familyId: string
  firstName: string
  lastName: string
  documentId: string
  sex: number
  birthday: Date
  type: string
  isActive: boolean
  comments?: string
}

const beneficiaries: Beneficiary[] = []
let beneficiaryId = 0

const createBeneficiary = (
  familyId: string,
  firstName: string,
  lastName: string,
  sex: number,
  birthday: Date,
  documentId: string,
  type: string,
  isActive: boolean,
  comments?: string
): void => {
  beneficiaries.push({
    id: beneficiaryId.toString(),
    familyId,
    firstName,
    lastName,
    sex,
    birthday,
    documentId,
    type,
    isActive,
    comments
  })
  beneficiaryId += 1
}

createBeneficiary('1', 'hortencia', 'palo', 0, new Date('04/03/2000'), '41107875', 'Guardian', true)
createBeneficiary('1', 'hortencio', 'palo', 1, new Date('04/03/2000'), '41107875', 'Beneficiario', true)
createBeneficiary('1', 'lulo', 'palo', 1, new Date('04/03/2000'), '41107875', 'Beneficiario', true)
createBeneficiary('1', 'lalo', 'palo', 1, new Date('04/03/2000'), '41107875', 'Beneficiario', true)
createBeneficiary('1', 'roro', 'palo', 1, new Date('04/03/2000'), '41107875', 'Guardian', true)

const getBeneficiary = (benefId: string): Beneficiary => {
  return getItem(beneficiaries, benefId)
}

const deactivateBeneficiary = (id: string): boolean => {
  return editField(beneficiaries, id, 'isActive', false)
}

const activateBeneficiary = (id: string): boolean => {
  return editField(beneficiaries, id, 'isActive', true)
}

const editFirstName = (id: string, firstName: string): boolean => {
  return editField(beneficiaries, id, 'firstName', firstName)
}

const editLastName = (id: string, lastName: string): boolean => {
  return editField(beneficiaries, id, 'lastName', lastName)
}

const editFamilyId = (id: string, familyId: string): boolean => {
  return editField(beneficiaries, id, 'familyId', familyId)
}

const editDocumentId = (id: string, documentId: string): boolean => {
  return editField(beneficiaries, id, 'documentId', documentId)
}

const editSex = (id: string, sex: number): boolean => {
  return editField(beneficiaries, id, 'sex', sex)
}

const editBirthday = (id: string, birthday: Date): boolean => {
  return editField(beneficiaries, id, 'birthday', birthday)
}

const editType = (id: string, type: string): boolean => {
  return editField(beneficiaries, id, 'type', type)
}

const editComments = (id: string, comments: string): boolean => {
  return editField(beneficiaries, id, 'comments', comments)
}

export {
  beneficiaries,
  createBeneficiary,
  getBeneficiary,
  deactivateBeneficiary,
  activateBeneficiary,
  editFirstName,
  editLastName,
  editFamilyId,
  editDocumentId,
  editSex,
  editBirthday,
  editType,
  editComments
}

export type { Beneficiary }
