export interface DonationsPaging {
  pageCursor?: string;
  previousCursors: string[];
  nextCursor?: string;
  pageNumber: number;
  limit: number;
}

export const PAGE_LIMITS = { SMALL: 10, MEDIUM: 20, LARGE: 30 };

export const defaultPagingSettings: DonationsPaging = {
  previousCursors: [],
  pageNumber: 0,
  limit: PAGE_LIMITS.SMALL
};
