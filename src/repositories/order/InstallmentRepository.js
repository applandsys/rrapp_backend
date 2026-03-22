import { BaseRepository } from "../BaseRepository.js";
import { Installment } from "../../Models/Installment.js";

export class InstallmentRepository extends BaseRepository {

    constructor() {
        super(Installment);
    }

}
