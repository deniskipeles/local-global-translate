"use strict";
(() => {
var exports = {};
exports.id = 748;
exports.ids = [748];
exports.modules = {

/***/ 3227:
/***/ ((module) => {

module.exports = require("next-auth");

/***/ }),

/***/ 7449:
/***/ ((module) => {

module.exports = require("next-auth/providers/credentials");

/***/ }),

/***/ 6544:
/***/ ((module) => {

module.exports = import("node-fetch");;

/***/ }),

/***/ 8451:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "H": () => (/* binding */ url)
/* harmony export */ });
const url = "https://local-global-translate.herokuapp.com";



/***/ }),

/***/ 870:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3227);
/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7449);
/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _global_to_local_dict_lib_rootUrl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8451);
/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6544);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([node_fetch__WEBPACK_IMPORTED_MODULE_2__]);
node_fetch__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




const authHandler = (req, res)=>next_auth__WEBPACK_IMPORTED_MODULE_0___default()(req, res, options)
;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (authHandler);
const options = {
    providers: [
        // GitHubProvider({
        //   clientId: process.env.GITHUB_ID,
        //   clientSecret: process.env.GITHUB_SECRET,
        // }),
        next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1___default()({
            // The name to display on the sign in form (e.g. "Sign in with...")
            id: "credentials",
            name: "credentials",
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: {
                    label: "username",
                    type: "text",
                    placeholder: "enter username"
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },
            authorize: async (credentials, req)=>{
                // Add logic here to look up the user from the credentials supplied
                // const user = { id: 1, name: "J Smith", email: "jsmith@example.com" }
                const user = await (0,node_fetch__WEBPACK_IMPORTED_MODULE_2__["default"])(`${_global_to_local_dict_lib_rootUrl__WEBPACK_IMPORTED_MODULE_3__/* .url */ .H}/api-token-auth/`, {
                    method: "POST",
                    body: JSON.stringify(credentials),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then((res)=>res.json()
                ).then(async (json)=>{
                    //console.log(json)
                    if (json.token) {
                        const res = await (0,node_fetch__WEBPACK_IMPORTED_MODULE_2__["default"])(`${_global_to_local_dict_lib_rootUrl__WEBPACK_IMPORTED_MODULE_3__/* .url */ .H}/account/?search=${credentials.username}`).then((data)=>data.json()
                        );
                        //console.log(res.results[0]);
                        return res.results[0];
                    } else {
                        return null;
                    }
                }).catch((err)=>null
                );
                //console.log("data",user)
                if (user != null) {
                    return user;
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null;
                // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        }), 
    ],
    callbacks: {
        async jwt ({ token , account , user  }) {
            // Persist the OAuth access_token to the token right after signin
            //console.log(user);
            if (account) {
                token.accessToken = account.access_token;
            }
            if (user) {
                //token.url = user.url
                token.user = user;
            }
            return token;
        },
        async session ({ session , token , user  }) {
            // Send properties to the client, like an access_token from a provider.
            //session.url = token.url
            session.user = token.user;
            session.accessToken = token.accessToken;
            return session;
        }
    },
    secret: "process.env.NEXTAUTH_SECRET"
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(870));
module.exports = __webpack_exports__;

})();