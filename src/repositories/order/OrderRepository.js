import { BaseRepository } from "../BaseRepository.js";
import { Order } from "../../Models/Order.js";

export class OrderRepository extends BaseRepository {

    constructor() {
        super(Order);
    }

}
