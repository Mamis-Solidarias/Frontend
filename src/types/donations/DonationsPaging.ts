export interface DonationsPaging {
  pageCursor?: string;
  previousCursors: string[];
  nextCursor?: string;
  pageNumber: number;
  limit: number;
}

export const PAGE_LIMITS = { SMALL: 5, MEDIUM: 10, LARGE: 15 };

export const defaultPagingSettings: DonationsPaging = {
  previousCursors: [],
  pageNumber: 0,
  limit: PAGE_LIMITS.SMALL
};
