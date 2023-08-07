export interface BaseResponsive<T> {
  statusCode: number;
  message: string;
  data: T;
}