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
const DB_NAME = process.env.DB_NAME || '';
const mongoURI = process.env.MONGODB_URI || '';
let db;
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const client = yield mongodb_1.MongoClient.connect(mongoURI, {
                serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
            });
            console.log('MongoDB connected');
            db = client.db(DB_NAME);
        }
        catch (err) {
            console.error('MongoDB connection error:', err);
            process.exit(1); // Exit the process with an error code
        }
    });
}
app.get('/', (req, res) => {
    res.send('Muscle Hustle server running');
});
app.get('/test', (req, res) => {
    res.send('Muscle Hustle test running');
});
app.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield db.collection('users').find({}).toArray();
        res.send(users);
    }
    catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json(error);
    }
}));
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        yield connectToDatabase();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    });
}
startServer();
//# sourceMappingURL=index.js.map