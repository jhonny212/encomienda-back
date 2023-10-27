"use strict";
var OrderStatus;
(function (OrderStatus) {
    OrderStatus[OrderStatus["PENDING"] = 0] = "PENDING";
    OrderStatus[OrderStatus["CANCELED"] = 1] = "CANCELED";
    OrderStatus[OrderStatus["INROAD"] = 2] = "INROAD";
    OrderStatus[OrderStatus["DELIVERED"] = 3] = "DELIVERED";
})(OrderStatus || (OrderStatus = {}));
