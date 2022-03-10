"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatingConfigSocketPubTypes = exports.ChatingConfigSocketSubTypes = void 0;
var ChatingConfigSocketSubTypes;
(function (ChatingConfigSocketSubTypes) {
    ChatingConfigSocketSubTypes["JOIN_ROOM"] = "joinRoom";
    ChatingConfigSocketSubTypes["LEAVE_ROOM"] = "leaveRoom";
    ChatingConfigSocketSubTypes["SEND_MESSAGE"] = "sendMessage";
})(ChatingConfigSocketSubTypes = exports.ChatingConfigSocketSubTypes || (exports.ChatingConfigSocketSubTypes = {}));
var ChatingConfigSocketPubTypes;
(function (ChatingConfigSocketPubTypes) {
    ChatingConfigSocketPubTypes["GET_PROFILE"] = "getProfile";
    ChatingConfigSocketPubTypes["JOINED_NEW_MEMBER"] = "joinedNewMember";
    ChatingConfigSocketPubTypes["LEAVED_EXISTING_MEMBER"] = "leavedExistingMember";
    ChatingConfigSocketPubTypes["NEW_MESSAGE"] = "newMessage";
})(ChatingConfigSocketPubTypes = exports.ChatingConfigSocketPubTypes || (exports.ChatingConfigSocketPubTypes = {}));
//# sourceMappingURL=chating_config_socket.js.map