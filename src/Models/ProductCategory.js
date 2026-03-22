import { Model } from "../orm/Model.js";

export class ProductCategory extends Model {
  static table = "product_categories";
  static fillable = [];
}