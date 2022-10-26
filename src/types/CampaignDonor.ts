export interface CampaignDonor {
  donorId: number;
  donationType: string;
  donationDropOffLocation: string;
}

export const defaultCampaignDonor: CampaignDonor = {
  donorId: 0,
  donationType: '',
  donationDropOffLocation: ''
};
