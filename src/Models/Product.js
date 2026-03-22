import { Model } from "../orm/Model.js";

export class Product extends Model {
  static table = "products";
  static fillable = [];
}