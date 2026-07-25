import proxy from "express-http-proxy"
// this file is to provde the header that is the id of the current user as we cannot access req.cookies in our microserives like auth chat and the req.cookies can only be accesed by the gateway so give the user id as a header so that it can be used in out chat services to deterimine which user is doing the conversation with the AI
export const proxyWithHeader = (serviceUrl) => {
    return proxy(serviceUrl, {
        proxyReqOptDecorator: (proxyReqOpts, srcReq) => {   // here srcReq is nothing just the same req in (res,req) we are jsut calling it diffrently here but it is same as req.user as we are writing here srcReq.user
            if (srcReq.user) {
                proxyReqOpts.headers["x-user-id"] = srcReq.user.userId   // "x-user-id"   is the name of the header 
            }
            return proxyReqOpts
        }
    })
}  