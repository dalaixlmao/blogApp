import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signinReq, signupReq } from "@dalaixlmao/common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JwtPassword: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const success = signupReq.safeParse(body).success;

  if (!success) {
    c.status(403);
    return c.json({ message: "failed to sign up, invalid input" });
  }
  const userchk = await prisma.user.findUnique({
    where: { email: body.email },
  });
  if (userchk) {
    c.status(403);
    return c.json({ message: "failed to sign up, user already exists" });
  }
  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password,
      name: body.name,
    },
  });

  if (!user) {
    c.status(403);
    return c.json({ message: "failed to sign up, server error" });
  }
  const token = await sign({ id: user.id }, c.env.JwtPassword);
  c.status(200);
  return c.json({ message: "Signed up successfully", token: token });
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const success = signinReq.safeParse(body).success;

  if (!success) {
    c.status(403);
    return c.json({ message: "failed to sign in, wrong inputs" });
  }

  const chk = await prisma.user.findUnique({where:{email:body.email}});
  if(chk)
	{
		const token = await sign({id:chk.id}, c.env.JwtPassword);
		c.status(200);
		return c.json({message:"signed in successfully", token:token});
	}
	c.status(403);
	return c.json({message:"unable to sign in"});
});
