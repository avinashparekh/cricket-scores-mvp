"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || '0.0.0.0';
const app = (0, app_1.createApp)();
app.listen(PORT, HOST, () => {
    console.log(`Cricket Scores API listening on http://${HOST}:${PORT}`);
});
