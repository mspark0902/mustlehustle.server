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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT || '3000');
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const DB_USER = process.env.DB_USER || '';
const DB_PASS = process.env.DB_PASS || '';
const DB_HOST = process.env.DB_HOST || '';
const DB_NAME = process.env.DB_NAME || '';
const mongoURI = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;
let db;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield mongodb_1.MongoClient.connect(mongoURI);
        console.log('MongoDB connected');
        db = client.db(DB_NAME);
        app.get('/', (req, res) => {
            res.send('Muscle Hustle server running');
        });
        app.get('/test', (req, res) => {
            res.send('Muscle Hustle test running');
        });
        app.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (!db) {
                    throw new Error('Database not initialized');
                }
                const users = yield db.collection('users').find({}).toArray();
                res.send(users);
            }
            catch (error) {
                console.error('Error fetching users:', error);
                res.status(500).send('Internal Server Error');
            }
        }));
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
    catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit the process if DB connection fails
    }
});
// Start the server only if this module is not being required by another module
if (require.main === module) {
    startServer();
}
// Export the app for Vercel to handle
exports.default = app;
//# sourceMappingURL=index.js.map