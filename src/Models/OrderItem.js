import { Model } from "../orm/Model.js";

export class OrderItem extends Model {
  static table = "order_items";
  static fillable = ["order_id", "product_id","unit_price","quantity","total_price"];
}
