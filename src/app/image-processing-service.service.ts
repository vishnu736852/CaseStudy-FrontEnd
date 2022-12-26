import { Injectable } from '@angular/core';
import {Product} from "./_model/product.model";
import {FileHandle} from "./_model/file-handle.model";
import {DomSanitizer} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingServiceService {

  constructor(private sanitizer : DomSanitizer) { }
  public createImages(product: Product){
    const productImages: any [] =product.productImages;
    const productImagesToFileHandle:FileHandle[] = [];
    for (let i=0 ; i<productImages.length;i++){
      const imageFileData = productImages[i];
      const imageBlob = this.dataURItoBlob(imageFileData.imageByte ,imageFileData.imageType);
      const imageFile = new File([imageBlob],imageFileData.imageName,{type:imageFileData.imageType});
      const finalFileHandle : FileHandle ={
        file:imageFile,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
      };
      productImagesToFileHandle.push(finalFileHandle);
    }
    product.productImages = productImagesToFileHandle;
    return product;
  }
  public dataURItoBlob(imageByte :any ,imageType :any){
    const byteString = window.atob(imageByte);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i=0;i<byteString.length;i++){
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array],{type:imageType});
    return blob;
  }
}
