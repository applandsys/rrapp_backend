import { Model } from "../orm/Model.js";

export class Order extends Model {
  static table = "orders";
  static fillable = ["customer_id","user_id","order_type","total_amount","due_amount","paid_amount","status","type"];
}
