import { Model } from "../orm/Model.js";

export class Customer extends Model {
  static table = "customers";
  static fillable = ["name","email","phone","type","address","area","city","state","post_code","police_station","password","status","email_verified_at"];
}