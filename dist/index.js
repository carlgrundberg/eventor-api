var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { parseStringPromise } from "xml2js";
import queryString from "query-string";
export function getEvents(query, options) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(queryString.stringifyUrl({
            url: `${(options === null || options === void 0 ? void 0 : options.apiHost) || "https://eventor.orientering.se"}/api/events`,
            query,
        }), { headers: { ApiKey: (options === null || options === void 0 ? void 0 : options.apiKey) || process.env.EVENTOR_API_KEY } });
        const xml = yield res.text();
        const data = yield parseStringPromise(xml, {
            normalize: true,
            normalizeTags: true,
            explicitArray: false,
            mergeAttrs: true,
        });
        return (_a = data === null || data === void 0 ? void 0 : data.eventlist) === null || _a === void 0 ? void 0 : _a.event;
    });
}
