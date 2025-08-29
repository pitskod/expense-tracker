"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const Logger_1 = require("./helpers/Logger");
Logger_1.Logger.info('App starting...');
(0, app_1.start)();
