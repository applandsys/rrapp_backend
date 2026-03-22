import { AuthService } from "../service/AuthService.js";

export class AuthController {
    constructor() {
        this.service = new AuthService();
    }

    register = async (req, res) => {
        const user = await this.service.register(req.body);
        res.status(201).json(user);
    };

    login = async (req, res) => {
        const { email, password } = req.body;
        const result = await this.service.login(email, password);
        res.json(result);
    };

    test = async (req, res) => {
        res.status(201).json({status: "test"});
    };

}