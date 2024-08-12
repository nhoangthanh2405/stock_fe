// img-object.model.ts
export interface ImgObject{
  imageUrl: (string | ArrayBuffer); // Không cho phép undefined, khởi tạo với mảng
  img_id?: string;
  }
  