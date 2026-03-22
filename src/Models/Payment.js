import { Model } from "../orm/Model.js";

export class Payment extends Model {
  static table = "payments";
  static fillable = [];
}