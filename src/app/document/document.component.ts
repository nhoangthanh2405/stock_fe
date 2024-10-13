import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { StockService } from '../_services/stock.service';
import { ImgObject } from '../model/img-object';
import { ChartIndicator } from '../model/ChartIndicator';
import { ChartIndicatorService } from '../_services/chartIndicator.service';
import { ChartIndicatorSelection } from '../model/chartIndicator-selection';


@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrl: './document.component.css'
})
export class DocumentComponent implements OnInit {

  actions?: string ='Theory';

  //Object Indicator

  indicatorTheory?: string ='';

  imgIdsIndicator: string[] = [];
  imgObjectIndicator: ImgObject[] = []; // Khởi tạo với mảng rỗng

  imgIdsChart: string[] = [];
  imgObjectChart: ImgObject[] = []; // Khởi tạo với mảng rỗng

  chartIndicatorSelection!: ChartIndicatorSelection[];
  imgsData: string[] = [];
  indicatorSelection?: ChartIndicatorSelection;

  currentImageIndex: number = 0;

  isSaveButtonEnabled?: boolean;

  constructor(private userService: UserService,
    private stockService: StockService,
  private chartIndicator: ChartIndicatorService) { }

  ngOnInit(): void {
    this.isSaveButtonEnabled = false;
    this.chartIndicator.getChartIndicator(0, 10).subscribe({
      next: response => {
        if(response.success==true){
          this.chartIndicatorSelection = response.data;
          this.setItemDefault(this.chartIndicatorSelection[0])
          console.log(this.chartIndicatorSelection);
        }else{
          console.log("get list data fail");
        }
      },
      error: err => {
        console.log(err);
      }
    });
}

  handleAction(action: string): void {
    this.actions = action;
    if (this.indicatorSelection) {
      this.setItemDefault(this.indicatorSelection);
    }
  }


  createIndicator(action: string): void {
    this.actions = action;
  }

  onFilesSelectedIndicator(event: Event) {
    console.log("Hello");
    
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // Upload file xuống BE
      this.stockService.uploadImage(file).subscribe(
        (response) => {
          if(response.success==true) {
            this.imgIdsIndicator.push(response.data.id);
            const reader = new FileReader();
            reader.onload = (e: any) => {
              this.imgObjectIndicator.push({ imageUrl: e.target.result, img_id: response.data.id  });
            };
            reader.readAsDataURL(file); // Chuyển đổi tệp thành chuỗi base64
  
            // Reset input để cho phép chọn lại cùng một tệp
            input.value = '';
            this.onInputChange();
          } else {
            console.error('File upload failed');
          }
        },
        (error) => {
          console.error('File upload failed', error);
          // Xử lý lỗi nếu cần
        }
      );
    }
  }

  onFilesSelectedChart(event: Event) {
    console.log("Hello");
    
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // Upload file xuống BE
      this.stockService.uploadImage(file).subscribe(
        (response) => {
          if(response.success==true) {
            this.imgIdsChart.push(response.data.id);
            const reader = new FileReader();
            reader.onload = (e: any) => {
              this.imgObjectChart.push({ imageUrl: e.target.result, img_id: response.data.id  });
            };
            reader.readAsDataURL(file); // Chuyển đổi tệp thành chuỗi base64
  
            // Reset input để cho phép chọn lại cùng một tệp
            input.value = '';
            this.onInputChange();
          } else {
            console.error('File upload failed');
          }
        },
        (error) => {
          console.error('File upload failed', error);
          // Xử lý lỗi nếu cần
        }
      );
    }
  }

  removeImageIndicator(imgObj:ImgObject): void {
    const imgId = imgObj.img_id;
    this.imgObjectIndicator = this.imgObjectIndicator.filter(item => item.img_id !== imgId);
    this.imgIdsIndicator = this.imgIdsIndicator.filter(item => item !== imgId);   
    this.onInputChange();
  }

  removeImageChar(imgObj:ImgObject): void {
    const imgId = imgObj.img_id;
    this.imgObjectChart = this.imgObjectChart.filter(item => item.img_id !== imgId);
    this.imgIdsChart = this.imgIdsChart.filter(item => item !== imgId);  
  }

  save(): void {
    console.log(this.indicatorTheory);
    console.log(this.imgIdsChart);
    console.log(this.imgIdsIndicator);

    const chartIndicator: ChartIndicator = {
      indicatorTheory: this.indicatorTheory,
      imgIdsChart: this.imgIdsChart,
      imgIdsIndicator: this.imgIdsIndicator
    };

    this.chartIndicator.createChartIndicator(chartIndicator).subscribe(response => {
      if(response.success==true) {
        this.indicatorTheory = undefined;
        this.imgIdsChart = [];
        this.imgIdsIndicator = [];
      }
    });
  }


  onIndicatorChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = +selectElement.value;  // Chuyển đổi giá trị từ chuỗi sang số
    // Tìm đối tượng tương ứng trong danh sách
    const chartIndicator = this.chartIndicatorSelection.find(item => item.id === selectedValue);
    if (chartIndicator) {
      this.setItemDefault(chartIndicator);
    } else {
      // Handle the case where no matching item is found
      this.setItemDefault({});  // Or handle it as needed
    }
  }

  setItemDefault(chartIndicator: ChartIndicatorSelection): void {
    this.indicatorSelection = chartIndicator;  // Use correct property name
    console.log(this.actions);
    if (this.actions === 'Theory') {
      this.imgsData = chartIndicator.img_ids_indicator?chartIndicator.img_ids_indicator:[];  // Use correct property name
      console.log(this.imgsData);
    } else {
      this.imgsData = chartIndicator.img_ids_chart?chartIndicator.img_ids_chart:[];  // Use correct property name
      console.log(this.imgsData);
    }
  }


  previousImage(): void {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }

  nextImage(): void {
    if (this.currentImageIndex < this.imgsData.length - 1) {
      this.currentImageIndex++;
    }
  }
  get currentImageUrl(): string {
    return this.imgsData[this.currentImageIndex] || '';
  }


  onInputChange() {
    console.log(this.indicatorTheory);
    
    const chartIndicator: ChartIndicator = {
      indicatorTheory: this.indicatorTheory,
      imgIdsChart: this.imgIdsChart,
      imgIdsIndicator: this.imgIdsIndicator
    };
    if(this.indicatorTheory!=undefined && this.indicatorTheory  != '' && (this.imgIdsChart.length !=0 || this.imgIdsIndicator.length !=0)){
      this.isSaveButtonEnabled = true;
    }else{
      this.isSaveButtonEnabled = false;
    }
  }
  
}
