import { axiosClient } from './initialization';
import { DonationsRequest } from 'src/types/donations/DonationsRequest';

export const createDonation = async (donation: DonationsRequest) => {
  return axiosClient.post('/donations/monetary/campaign', donation);
};
