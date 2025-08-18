"use strict";const t=require("../utils/request.js"),s={login:s=>t.http.post("/user/login",s),register:s=>t.http.post("/user/register",s),logout:()=>t.http.post("/user/logout")};exports.userApi=s;
