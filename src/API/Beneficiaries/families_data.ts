import Beneficiary from 'src/types/Beneficiary';
import {axiosClient} from './initialization';

export const updateFamily = async (
    id: string,
    data: { name?: string | null; address?: string | null; details?: string | null; contacts?: any }
) => {
    return axiosClient.patch('families/' + id, data);
};

export const getFamily = async (id: string) => {
    return axiosClient.get('families/' + id);
};

export const createBeneficiaries = async (id: string, beneficiaries: Beneficiary[]) => {
    for (const beneficiary of beneficiaries) {
        if (!beneficiary.education)
            continue;

        beneficiary.education!.year = beneficiary.education?.year?.replaceAll('_', '');
    }

    return axiosClient.post('families/' + id + '/beneficiaries', {beneficiaries: beneficiaries});
};
