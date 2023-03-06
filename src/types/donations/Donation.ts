export default interface Donation {
  amount: number;
  currency: string;
  donatedAt: string;
  donorId: number;
  donor: { name: string };
  id: number;
  motive: string;
  type: string;
}
