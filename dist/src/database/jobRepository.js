"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJob = exports.getAllJobs = void 0;
const database_1 = require("../models/database");
const paginator_1 = require("../utils/paginator");
/**
 * The function getAllJobs retrieves all jobs from the database using pagination.
 * @param {Request} req - The `req` parameter is the request object, which contains information about
 * the incoming HTTP request such as headers, query parameters, and body.
 * @param {Response} res - The `res` parameter is the response object that will be sent back to the
 * client. It is used to send the response data, set headers, and handle any errors that may occur
 * during the request.
 * @param {number} [pageSize=0] - The `pageSize` parameter is used to specify the number of jobs to be
 * returned per page. It determines the size of each page when paginating the results. If not provided,
 * the default value is set to 0.
 * @returns a promise that resolves to an array of job objects.
 */
const getAllJobs = (req, res, pageSize = 0) => __awaiter(void 0, void 0, void 0, function* () {
    const options = (0, paginator_1.paginator)(pageSize);
    return database_1.prisma.job.findMany(Object.assign(Object.assign({}, options), { include: {
            jobType: true
        } }));
});
exports.getAllJobs = getAllJobs;
//Creates
/**
 * The function creates a job using the data from the request body and returns the created job.
 * @param {Request} req - The `req` parameter is an object representing the HTTP request made to the
 * server. It contains information such as the request method, headers, query parameters, and request
 * body.
 * @param {Response} res - The `res` parameter is the response object that will be sent back to the
 * client. It is used to send the response data, such as status codes, headers, and the response body.
 * @returns a Promise that resolves to the result of creating a new job in the database using the
 * Prisma client.
 */
const createJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    return database_1.prisma.job.create({
        data: Object.assign({}, body)
    });
});
exports.createJob = createJob;
