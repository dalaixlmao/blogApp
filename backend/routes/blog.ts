import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { blogInit, blogUpdate } from "@dalaixlmao/common";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JwtPassword: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const t = c.req.header("Authorization");
  if (t) {
    const token = t.split(" ")[1];
    const payLoad = await verify(token, c.env.JwtPassword);
    if (payLoad) {
      c.set("jwtPayload", payLoad.id);
      await next();
    } else {
      c.status(403);
      return c.json({ messaage: "authorization error" });
    }
  } else {
    c.status(403);
    return c.json({ message: "authorzation error" });
  }
});

blogRouter.get("/post/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param("id");
  const post = await prisma.post.findUnique({
    where: { id: id },
    select: {
      title: true,
      content: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  if (post) {
    c.status(200);
    return c.json({ post: post });
  } else {
    c.status(400);
    return c.json({ message: "not valid post" });
  }
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const allPosts = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  if (allPosts) {
    c.status(200);
    return c.json({ posts: allPosts });
  } else {
    c.status(400);
    return c.json({ message: "cant fetch data" });
  }
});

blogRouter.get("/getposts", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const userId = c.get("jwtPayload");
  const posts = await prisma.post.findMany({
    where: { authorId: userId },
  });
  if (posts) {
    c.status(200);
    return c.json({ posts: posts });
  } else {
    c.status(400);
    return c.json({ message: "error getting posts from user" });
  }
});

blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const success = blogInit.safeParse(body).success;

  if (!success) {
    c.status(400);
    return c.json({ message: "bad request" });
  }
  const userId = c.get("jwtPayload");
  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: userId,
    },
  });
  if (post) {
    c.status(200);
    return c.json({ message: "post created successfully", post: post });
  } else {
    c.status(400);
    return c.json({ message: "error while creating post" });
  }
});

blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const success = blogUpdate.safeParse(body).success;
  if (!success) {
    c.status(400);
    return c.json({ messaage: "invalid inputs" });
  }
  const id = body.id;
  try {
    const chk = await prisma.post.update({
      where: { id: id },
      data: { title: body.title, content: body.content },
    });
    c.status(200);
    return c.json({ message: "post updated" });
  } catch (e) {
    c.status(400);
    return c.json({ messaage: "error while creating post" });
  }
});
