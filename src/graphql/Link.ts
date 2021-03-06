import { objectType, extendType, nonNull, stringArg, intArg, inputObjectType, enumType, arg, list } from "nexus";
import { Prisma } from '@prisma/client';

export const Link = objectType({
  name: "Link",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("description");
    t.nonNull.string("url");
    t.nonNull.dateTime("createdAt");
    t.field("postedBy", {
      type: "User",
      resolve(parent, args, context, info) {
        return context.prisma.link
          .findUnique({ where: { id: parent.id } })//finds the link
          .postedBy();//determines the return type for the query
      },
    });
    t.nonNull.list.nonNull.field("voters", {
        type: "User",
        resolve(parent, args, context, info) {
            return context.prisma.link
                .findUnique({ where: { id: parent.id }}).voters()
        }
    });
  },
});

export const LinkQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("feed", {
      type: "Feed",
      args: {
          filter: stringArg(),
          skip: intArg(),
          take: intArg(),
          orderBy: arg({ type: list(nonNull(LinkOrderByInput))})
      },
      async resolve(parent, args, context, info) {
        const where = args.filter ? {
            OR: [
                { description: { contains: args.filter } },
                { url: { contains: args.filter } },
            ],
        }
        : {};
        const links = context.prisma.link.findMany({ 
            where,
            skip: args?.skip as number | undefined,
            take: args?.take as number | undefined,
            orderBy: args?.orderBy as Prisma.Enumerable<Prisma.LinkOrderByWithRelationInput> | undefined,
         });

         const count = await context.prisma.link.count({ where });

         return {
             links,
             count,
         }
      },
    });
    t.field("link", {
      type: "Link",
      args: {
        id: nonNull(intArg()),
      },
      resolve(parent, args, context, info) {
        return context.prisma.link.findUnique({
          where: { id: args.id },
        });
      },
    });
  },
});

export const LinkMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("post", {
      type: "Link",
      args: {
        description: nonNull(stringArg()),
        url: nonNull(stringArg()),
      },
      resolve(parent, args, context, info) {
        const { userId } = context;
        const { description, url } = args;

        if (!userId) throw new Error("you're not logged in dawg");

        const newLink = context.prisma.link.create({
          data: {
            description: description,
            url: url,
            postedBy: { connect: { id: userId } },
          },
        });
        return newLink;
      },
    }),
      t.nonNull.field("update", {
        type: "Link",
        args: {
          description: nonNull(stringArg()),
          url: nonNull(stringArg()),
          id: nonNull(intArg()),
        },
        resolve(parent, args, context, info) {
          const { userId } = context;

          if (!userId) throw new Error("you're not logged in dawg");

          const updatedLink = context.prisma.link.update({
            where: { id: args.id },
            data: {
              description: args.description,
              url: args.url,
              postedBy: { connect: { id: userId } }
            },
          });
          return updatedLink;
        },
      });
  },
});

export const Sort = enumType({
    name: "Sort",
    members: ["asc", "desc"],
})

export const LinkOrderByInput = inputObjectType({
    name: "LinkOrderByInput",
    definition(t) {
        t.field("description", { type: Sort });
        t.field("url", { type: Sort });
        t.field("createdAt", { type: Sort });
    },
})

export const Feed = objectType({
    name: "Feed",
    definition(t) {
        t.nonNull.list.nonNull.field("links", { type: Link });
        t.nonNull.int("count");
    },
})
