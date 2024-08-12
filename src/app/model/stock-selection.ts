// stock-selection.model.ts
export interface StockSelection {
  id?: number;
  stock_code?: string;
  reason_for_stock?: string;
  imageUrls?: (string | ArrayBuffer)[]; // Sửa đổi để chứa nhiều URL hình ảnh
  starting_price?: number;
  ending_price?: number;
  start_date?: Date;
  end_date?: Date;
  user_id?: Date;
  img_ids?: string[];
}
