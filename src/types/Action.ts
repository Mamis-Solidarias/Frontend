export interface Action {
  complete: boolean;
  success: boolean;
  message: string;
  status: number;
}

export const defaultAction: Action = {
  success: false,
  message: '',
  complete: false,
  status: 0
};
