interface DonationFilters {
  donorId?: number;
  from?: Date;
  to?: Date;
  query?: string;
}

export const defaultFilters: DonationFilters = {};

export default DonationFilters;
