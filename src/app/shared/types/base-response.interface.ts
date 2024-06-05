export interface BaseResponseInterface<T> {
  status: string;
  data: T;
  errors: string[];
}