export interface DonationsRequest {
  "donorId": number;
  "amount": number;
  "currency": string;
  "participantId": number | null;
  "campaignId": number;
  "campaign": string;
}
