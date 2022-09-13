"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
const express_1 = require("express");
const auth_route_1 = require("./auth-route");
exports.route = (0, express_1.Router)();
exports.route.use('', auth_route_1.authRoute);
