// stock-selection.model.ts
export interface Stock{
    stockCode?: string;
    reasonForStockSelection?: string;
    startingPrice?: number;
    endingPrice?: number;
    startDate?: Date;
    endDate?: Date;
    imgIds?: string[];
    userId: number;
  }
  