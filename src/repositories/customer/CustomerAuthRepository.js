import { BaseRepository } from "../BaseRepository.js";
import { Customer } from "../../Models/Customer.js";

export class CustomerAuthRepository extends BaseRepository {

    constructor() {
        super(Customer);
    }

    async findCustomerByEmail(email) {

    }

}
