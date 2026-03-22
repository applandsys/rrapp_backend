import { Model } from "../orm/Model.js";

export class Installment extends Model {
  static table = "installments";
  static fillable = ["id","order_item_id","installment_amount","due_date","secret_code","status"];
}

