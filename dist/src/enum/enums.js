"use strict";
var OrderStatus;
(function (OrderStatus) {
    OrderStatus[OrderStatus["EMPTY"] = 0] = "EMPTY";
    OrderStatus[OrderStatus["PENDING"] = 1] = "PENDING";
    OrderStatus[OrderStatus["CANCELED"] = 2] = "CANCELED";
    OrderStatus[OrderStatus["INROAD"] = 3] = "INROAD";
    OrderStatus[OrderStatus["DELIVERED"] = 4] = "DELIVERED";
})(OrderStatus || (OrderStatus = {}));
//# sourceMappingURL=enums.js.map