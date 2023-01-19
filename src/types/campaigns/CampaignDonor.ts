export interface CampaignDonor {
  donorId: string;
  donationType: string;
  donationDropOffLocation: string;
  observations: string;
}

export const defaultCampaignDonor: CampaignDonor = {
  donorId: '',
  donationType: '',
  donationDropOffLocation: '',
  observations: ''
};
