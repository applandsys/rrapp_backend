import { Model } from "../orm/Model.js";

export class Permission extends Model {
  static table = "permissions";
  static fillable = ["name", "slug"];
}
