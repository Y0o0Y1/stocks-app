export interface StockDTO {
  ticker: string;
  name: string;
  market: string;
  locale: string;
  primary_exchange: string;
  type: string;
  active: boolean;
  currency_name: string;
  cik?: string;
  composite_figi?: string;
  share_class_figi?: string;
  last_updated_utc: string;
}

export interface StocksResponse {
  results: StockDTO[];
  status: string;
  request_id: string;
  count: number;
  next_url?: string;
}

export interface StockQueryParams {
  search?: string;
  limit?: number;
  cursor?: string;
} 