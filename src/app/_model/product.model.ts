import {FileHandle} from "./file-handle.model";

export interface Product{
  productName:string,
  productDescription:string,
  productCategory:string,
  productSubCategory:string,
  productPrice:number,
  productImages:FileHandle[]

}
