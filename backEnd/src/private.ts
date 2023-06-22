import { FastifyInstance } from "fastify";
import { clerkClient, clerkPlugin, getAuth } from "@clerk/fastify";

export async function privateRoutes(app: FastifyInstance) {
  app.register(clerkPlugin)

  app.get('/private', async (req, res) => {
    const { userId } = getAuth(req)

    if (!userId) {
      return res.status(403).send()
    }

    const user = await clerkClient.users.getUser(userId);

    return 'Você está logado(a)!'
  })
}