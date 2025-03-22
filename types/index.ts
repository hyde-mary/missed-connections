export type ActionResult<T = null> = {
  success: boolean;
  data?: T;
  message: string;
  error?: string;
};
