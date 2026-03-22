import { Model } from "../orm/Model.js";
import { belongsToMany } from "../orm/Relations.js";
import { Role } from "./Role.js";

export class User extends Model {
  static table = "users";
  static fillable = ["name", "email", "password"];
 // static hidden = ["password"];
  static softDeletes = true;

  roles = belongsToMany(Role, "role_user", "user_id", "role_id");

  async hasRole(role) {
    const roles = await this.roles.get();
    return roles.some(r => r.slug === role);
  }

  async hasPermission(permission) {
    const roles = await this.roles.with("permissions").get();
    return roles.some(r =>
        r.permissions.some(p => p.slug === permission)
    );
  }
}