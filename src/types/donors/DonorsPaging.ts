export interface DonorsPaging {
  pageCursor: string | null;
  previousCursors: string[];
  nextCursor: string | null;
  pageNumber: number;
  limit: number;
}

export const PAGE_LIMITS = { SMALL: 5, MEDIUM: 10, LARGE: 15 };

export const defaultPagingSettings: DonorsPaging = {
  pageCursor: null,
  previousCursors: [],
  nextCursor: null,
  pageNumber: 0,
  limit: PAGE_LIMITS.SMALL
};
