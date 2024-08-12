import { Component, Input } from '@angular/core';
import { StockSelection } from '../model/stock-selection';

@Component({
  selector: 'app-stock-detail-modal',
  templateUrl: './stock-detail-modal.component.html',
  styleUrl: './stock-detail-modal.component.css'
})
export class StockDetailModalComponent {
  @Input() stockDetail!: StockSelection| null;
}
