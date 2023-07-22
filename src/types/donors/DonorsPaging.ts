export interface DonorsPaging {
  pageCursor: string | null;
  previousCursors: string[];
  nextCursor: string | null;
  pageNumber: number;
  limit: number;
}

export const PAGE_LIMITS = { SMALL: 10, MEDIUM: 20, LARGE: 30 };

export const defaultPagingSettings: DonorsPaging = {
  pageCursor: null,
  previousCursors: [],
  nextCursor: null,
  pageNumber: 0,
  limit: PAGE_LIMITS.SMALL
};
