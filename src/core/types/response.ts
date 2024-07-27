export type ActionResponse<T> = {
  message: string;
  success: boolean;
  data: T;
};
