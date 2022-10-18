"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var stargate_1 = require("@cosmjs/stargate");
var query_1 = require("cosmjs-types/cosmos/base/tendermint/v1beta1/query");
var tendermint_rpc_1 = require("@cosmjs/tendermint-rpc");
var numPools_1 = require("./numPools");
var minimal = __importStar(require("protobufjs/minimal"));
// Class responsible for connecting to the rpc endpoint and provide osmosis data.
var OsmosisServiceClient = /** @class */ (function () {
    function OsmosisServiceClient(tc) {
        var _this = this;
        this.getBlockHeight = function () { return __awaiter(_this, void 0, void 0, function () {
            var block;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.baseQueryServiceClient.GetLatestBlock({})];
                    case 1:
                        block = (_c.sent()).block;
                        return [2 /*return*/, (_b = block === null || block === void 0 ? void 0 : block.header) === null || _b === void 0 ? void 0 : _b.height.low];
                }
            });
        }); };
        this.getBlockHash = function () { return __awaiter(_this, void 0, void 0, function () {
            var blockId, hash;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.baseQueryServiceClient.GetLatestBlock({})];
                    case 1:
                        blockId = (_b.sent()).blockId;
                        if (blockId === undefined) {
                            return [2 /*return*/];
                        }
                        hash = "";
                        blockId === null || blockId === void 0 ? void 0 : blockId.hash.forEach(function (h) {
                            hash = hash + h.toString(16).toUpperCase();
                        });
                        return [2 /*return*/, hash];
                }
            });
        }); };
        this.getNumPools = function () { return __awaiter(_this, void 0, void 0, function () {
            var request, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        request = numPools_1.QueryNumPoolsRequest.encode({}).finish();
                        return [4 /*yield*/, this.rpcClient.request("osmosis.gamm.v1beta1.Query", "NumPools", request)];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, numPools_1.QueryNumPoolsResponse.decode(new minimal.Reader(response)).numPools
                                .low];
                }
            });
        }); };
        var queryClient = new stargate_1.QueryClient(tc);
        this.rpcClient = (0, stargate_1.createProtobufRpcClient)(queryClient);
        // Used to query block information.
        this.baseQueryServiceClient = new query_1.ServiceClientImpl(this.rpcClient);
    }
    var _a;
    _a = OsmosisServiceClient;
    OsmosisServiceClient.rpcEndpoint = "https://osmosis-mainnet-rpc.allthatnode.com:26657";
    // Create an instance of this class.
    // Connects to the osmosis mainnet rpc endpoint.
    OsmosisServiceClient.create = function () { return __awaiter(void 0, void 0, void 0, function () {
        var tmClient;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, tendermint_rpc_1.Tendermint34Client.connect(this.rpcEndpoint)];
                case 1:
                    tmClient = _b.sent();
                    return [2 /*return*/, new OsmosisServiceClient(tmClient)];
            }
        });
    }); };
    return OsmosisServiceClient;
}());
exports["default"] = OsmosisServiceClient;
