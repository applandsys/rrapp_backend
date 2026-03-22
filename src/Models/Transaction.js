import { Model } from "../orm/Model.js";

export class Transaction extends Model {
  static table = "transactions";
  static fillable = [];
}