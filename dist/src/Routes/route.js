"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
const user_router_1 = require("./user-router");
const express_1 = require("express");
const auth_route_1 = require("./auth-route");
exports.route = (0, express_1.Router)();
exports.route.use('', auth_route_1.authRoute);
exports.route.use('/users', user_router_1.userRoute);
