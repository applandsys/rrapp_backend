import { Model } from "../orm/Model.js";
import { belongsToMany } from "../orm/Relations.js";
import { Permission } from "./Permission.js";

export class Role extends Model {
  static table = "roles";
  static fillable = ["name", "slug"];

  permissions = belongsToMany(
      Permission,
      "permission_role",
      "role_id",
      "permission_id"
  );
}