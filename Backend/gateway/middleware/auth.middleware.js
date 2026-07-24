import redis from "../../shared/redis.js"

const protect = async (req, res, next) => {
  try {
    const sessionId = req.cookies?.session
    if (!sessionId) {
      return res.status(401).json({ message: "unauthorized" }) // Changed status to 401 for unauthorized
    }

    const session = await redis.get(`session-${sessionId}`)
    console.log(session)

    if (!session) {
      return res.status(401).json({ message: "session expired" }) // Changed status to 401 for expired session
    }

    console.log("session", session)
    req.user = JSON.parse(session)
    next()
  } catch (error) {
    return res.status(500).json({ message: `protect error ${error.message}` })
  }
}

export default protect
