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
const routes_1 = require("./src/routes");
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
app.use((0, cors_1.default)(options));
app.use(express_1.default.json());
app.use(swagger_1.default);
app.use("/api/jobType", routes_1.jobTypeRouter);
app.use("/api/job", routes_1.jobRouter);
app.use("/api/road", routes_1.roadRouter);
app.use("/api/branch", routes_1.branchRouter);
app.use("/api/path", routes_1.pathRouter);
app.use("/api/package", routes_1.packageRouter);
app.use("/api/order", routes_1.orderRouter);
app.use("/api/vehicle", routes_1.vehicleRouter);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
