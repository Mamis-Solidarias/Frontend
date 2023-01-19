import { CampaignDonor } from 'src/types/campaigns/CampaignDonor';
import { JuntosEdition, JuntosEditionModify } from 'src/types/campaigns/JuntosEdition';
import { MochiEdition, MochiEditionModify, MochiImport } from 'src/types/campaigns/MochiEdition';
import { axiosClient } from './initialization';

export const createMochiEdition = async (campaign: MochiEdition) => {
  return axiosClient.post('/campaigns/mochi', campaign);
};

export const modifyMochiEdition = async (campaign: MochiEditionModify, id: string) => {
  return axiosClient.put('/campaigns/mochi/' + id, campaign);
};

export const deleteMochiEdition = async (id: string) => {
  return axiosClient.delete('/campaigns/mochi/' + id);
};

export const mochiEditionImport = async (mochiImport: MochiImport, previousCampaignId: number) => {
  return axiosClient.post('/campaigns/mochi/' + previousCampaignId, mochiImport);
};

export const assignDonor = async (id: string, donorData: CampaignDonor) => {
  return axiosClient.put('/campaigns/mochi/participants/' + id, donorData);
};

export const deleteMochiDonor = async (id: string) => {
  return axiosClient.delete('/campaigns/mochi/participants/' + id);
};

export const createJuntosEdition = async (campaign: JuntosEdition) => {
  return axiosClient.post('/campaigns/juntos', campaign);
};

export const modifyJuntosEdition = async (campaign: JuntosEditionModify, id: string) => {
  return axiosClient.put('/campaigns/mochi/' + id, campaign);
};
