import {OrderItem} from "./orderItem.model";

export interface Order{
  orderId:number,
  status:string,
  orderItems:OrderItem[];

}
