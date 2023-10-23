"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_1 = __importDefault(require("./swagger"));
const cors_1 = __importDefault(require("cors"));
//ROUTERS
const jobTypeRouter_1 = __importDefault(require("./src/routes/jobTypeRouter"));
const jobRouter_1 = __importDefault(require("./src/routes/jobRouter"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.get('/api', (req, res) => {
    res.send('Express + TypeScript Server');
});
const allowedOrigins = ['http://localhost:3000'];
const options = {
    origin: allowedOrigins
};
// Then pass these options to cors:
app.use((0, cors_1.default)(options));
app.use(express_1.default.json());
app.use(swagger_1.default);
app.use("/api/jobType", jobTypeRouter_1.default);
app.use("/api/job", jobRouter_1.default);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
