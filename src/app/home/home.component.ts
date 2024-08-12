import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { UserService } from '../_services/user.service';
import { StockSelection } from '../model/stock-selection';
import { StockService } from '../_services/stock.service';
import { Stock } from '../model/stock';
import { AuthService } from '../_services/auth.service';
import { ImgObject } from '../model/img-object';
// import { ImageService } from '../_services/image.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content?: string;

  stockCode?: string ='';
  reasonForStockSelection?: string ='';
  selectedFiles: File[] = [];
  imgObject: ImgObject[] = []; // Khởi tạo với mảng rỗng
  imageUrlItem: string | ArrayBuffer | null = "";
  imageUrl: string | ArrayBuffer | null = ''; 
  startingPrice?: number;
  endingPrice?: number;
  startDate?: Date;
  endDate?: Date;
  isSaveButtonEnabled?: boolean;
  imgIds: string[] = [];
  stocks!: StockSelection[];
  selectedStock: StockSelection | null = null;

  isModalImgVisible: boolean = false;

  isCreateFailed = true;
  errorMessage = 'Please enter all information completely and accurately!';

  // Phân trang 
  currentPage: number = 1;
  pageSize: number = 8; // Số lượng item mỗi trang
  totalItems: number = 0;
  stocksPaginate!: StockSelection[];


  constructor(private userService: UserService,
    private renderer: Renderer2, private el: ElementRef,
    private stockService: StockService,
    private authService: AuthService) { }
  ngOnInit(): void {
      this.stockService.getStocksByUserId(this.authService.getUserId()).subscribe({
        next: response => {
          if(response.success==true){
            this.stocksPaginate = response.data;
            this.totalItems = this.stocksPaginate.length;
            this.paginateStocks();
          }else{
            console.log("get list data fail");
          }
        },
        error: err => {
          console.log(err);
          
        }
      });
  }
  
  paginateStocks() {
    // Tính chỉ số bắt đầu và kết thúc cho phân trang
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.totalItems);
    // Cắt dữ liệu để chỉ chứa các item của trang hiện tại
    this.stocks = this.stocksPaginate.slice(startIndex, endIndex);
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginateStocks();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  get isFirstPage(): boolean {
    return this.currentPage === 1;
  }

  get isLastPage(): boolean {
    return this.currentPage === this.totalPages;
  }

  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // Upload file xuống BE
      this.stockService.uploadImage(file).subscribe(
        (response) => {
          if(response.success==true) {
            this.imgIds.push(response.data.id);
            this.selectedFiles.push(file); // Lưu trữ tệp đã chọn
            const reader = new FileReader();
            reader.onload = (e: any) => {
              this.imgObject.push({ imageUrl: e.target.result, img_id: response.data.id  });
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
  

  save(): void {
    const stock: Stock = {
      stockCode: this.stockCode,
      reasonForStockSelection: this.reasonForStockSelection,
      startingPrice: this.startingPrice,
      endingPrice: this.endingPrice,
      startDate: this.startDate,
      endDate: this.endDate,
      imgIds: this.imgIds,
      userId: this.authService.getUserId()
    };

      this.stockService.createStock(stock).subscribe(response => {
        if(response.success==true) {
          const newSelection: StockSelection = response.data;
          this.stocks.push(newSelection);
          this.stockCode = undefined;
          this.reasonForStockSelection = undefined;
          this.startingPrice = undefined;
          this.endingPrice = undefined;
          this.startDate = undefined;
          this.endDate = undefined;
          this.selectedFiles = [];
          this.isSaveButtonEnabled = false;
          this.imgObject = [];
          this.imgIds = [];
        }
      });
    
  }

  enableSaveButton(): void {
    console.log(this.reasonForStockSelection);
    
    if (this.stockCode != undefined &&
      this.reasonForStockSelection != undefined &&
      this.reasonForStockSelection.length != 0 &&
      this.stockCode.length != 0 &&
      this.startingPrice != undefined &&
      this.endingPrice != undefined &&
      this.startDate != undefined &&
      this.endDate != undefined &&
      this.selectedFiles != null) {
      this.isSaveButtonEnabled = true;
      this.isCreateFailed = false;
      this.errorMessage = ''
    } else {
      this.isSaveButtonEnabled = false;
    }
  }

  onInputChange() {
    if (this.startingPrice != undefined &&
      this.endingPrice != undefined && this.endingPrice < this.startingPrice) {
      this.errorMessage = 'Starting price must always be less than or equal to the ending price.'
      this.isCreateFailed = true;
      this.isSaveButtonEnabled = false;
      return;
    } else if (this.startDate != undefined && this.endDate != undefined && this.endDate < this.startDate) {
      this.errorMessage = 'The start date must always be less than or equal to the end date.'
      this.isCreateFailed = true;
      this.isSaveButtonEnabled = false;
      return;
    } else if (this.stockCode != undefined &&
      this.reasonForStockSelection != undefined &&
      this.startingPrice != undefined &&
      this.endingPrice != undefined &&
      this.startDate != undefined &&
      this.endDate != undefined &&
      this.imgIds.length ==0) {
      this.errorMessage = 'Please select at least one image.'
      this.isCreateFailed = true;
      this.isSaveButtonEnabled = false;
      return;
    }else if ((this.stockCode != undefined && this.stockCode === '') &&
    (this.reasonForStockSelection != undefined && this.reasonForStockSelection === '') &&
      this.startingPrice == undefined &&
      this.endingPrice == undefined &&
      this.startDate == undefined &&
      this.endDate == undefined &&
      this.imgIds.length ==0) {
      this.isCreateFailed = true;
      this.errorMessage = 'Please enter all information completely and accurately!'
      return;
    }
    else {
      this.isCreateFailed = false;
    }
    this.enableSaveButton();
  }
  deleteItem(stock : StockSelection): void{
    if(stock.id){
      this.stockService.deleteItem(stock.id).subscribe(response => {
        if(response.success==true) {
          this.stocksPaginate = this.stocksPaginate.filter(item => item.id !== stock.id);
          this.totalItems = this.stocksPaginate.length;
          this.paginateStocks();
        }
      }, error => {
  
      });
    }
  }
  openModal(stock: StockSelection): void {
    if (stock.start_date) {
      stock.start_date = new Date(stock.start_date);
    }
    if (stock.end_date) {
      stock.end_date = new Date(stock.end_date);
    }
    this.selectedStock = stock;
  }
  
  openModalImg(imgObj:ImgObject) {
    this.imageUrlItem = imgObj.imageUrl; // Sử dụng mảng rỗng nếu imageUrls là undefined
    this.isModalImgVisible = true;
  }

  closeModalImg() {
    this.isModalImgVisible = false;
    // Xóa lớp modal-open từ body
    const body = document.body;
    if (body.classList.contains('modal-open')) {
      // Xóa thuộc tính padding-right từ body
      this.renderer.setStyle(body, 'padding-right', '0');
      this.renderer.removeClass(body, 'modal-open');
    }

    // Xóa phần tử backdrop nếu tồn tại
    const backdropElement = document.querySelector('.modal-backdrop');
    if (backdropElement) {
      backdropElement.remove();
    }
  }
  getImage(fileName: string): void {
    this.stockService.getImage(fileName).subscribe(blob => {
      // Tạo URL từ Blob
      this.imageUrl = URL.createObjectURL(blob);
    }, error => {
      console.error('Error fetching image:', error);
    });
  }
  removeImage(imgObj:ImgObject): void {
    const imgId = imgObj.img_id;
    this.imgObject = this.imgObject.filter(item => item.img_id !== imgId);
    this.imgIds = this.imgIds.filter(item => item !== imgId);

    console.log(this.imgIds);
    
  }

}
