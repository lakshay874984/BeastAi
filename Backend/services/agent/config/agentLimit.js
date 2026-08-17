import redis from "../../../shared/redis/redis.js"

const Limits = {
    chat: 20,
    coding: 5,
    pdf: 5,
    ppt: 5,
    image: 5,
    search: 5
}

export const checkAgentLimit = async (userId, agent) => {
    const max = Limits[agent] || Limits["chat"]
    const key = `rate:${userId}:${agent}`
    const count = await redis.incr(key) // if there is no key then redis will simply start counting from 1 and return 1, otherwise it will increment the value by 1 and return the new value
    if (count == 1) {
        await redis.expire(key, 60) // it means that if the key is new, then we will set the expiration time to 60 seconds (1 minute) and after 60 seconds the key will be automatically deleted from redis and the next time the user makes a request, the count will start from 1 again
    }

    const ttl = await redis.ttl(key) // get the time to live (ttl) of the key in seconds, it will return -1 if the key does not have an expiration time, and -2 if the key does not exist and if the key has an expiration time, it will return the number of seconds until the key expires for example if the key has 30 seconds left before it expires, it will return 30

    if (count > max) {
        const minutes = Math.floor(ttl / 60) // suppose if the ttl in out case is 30 seconds then the minutes will be 0 and the seconds will be 30, if the ttl is 90 seconds then the minutes will be 1 and the seconds will be 30
        const seconds = (ttl % 60)
        const time = minutes > 0 ? ` ${minutes}m : ${seconds}s` : `${seconds}s`  // if the minutes is greater than 0 then we will return the time in the format of "Xm : Ys" otherwise we will return the time in the format of "Ys" but i  our case we will always return the time in the format of "Ys" because the ttl will always be less than 60 seconds because we are setting the expiration time to 60 seconds and if the user exceeds the limit then the ttl will be less than 60 seconds so we will always return the time in the format of "Ys"

        const error = new Error(`Rate limit exceeded for ${agent}.`);
        error.status = 429
        error.data = {
            success: false,
            agent,
            limit: max,
            remainingTime: ttl,
            retryAfter: time,
            message: `You have reached the ${agent} limit (${max} requests/minute). Try again in ${time}.`
        }

        throw error
  
}

return {
    remaining: max - count,
    limit: max
 
}
  

   
}