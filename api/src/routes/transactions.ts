import { Hono, Context } from "hono";
import { prisma } from "../libs/prisma";
import { pagination } from "../libs/paginate";

const router = new Hono();

/*---------- get all transactions ----------*/

router.get("/", async (c: Context) => {
  try {
    const pageParam = c.req.query("page");
    const currPage = pageParam ? parseInt(pageParam, 10) : 1;

    if (isNaN(currPage) || currPage < 1) {
        return c.json({ 
            message: "Invalid page number. Must be a positive integer." 
        }, 400);
    }
    
    if (!prisma.transactions) {
      return c.json({ 
        message: "Transaction model not found" 
        }, 500);
    }

    const result = await pagination(prisma.transactions, {
      page: currPage,
      limit: 4,
      orderBy: { createdAt: "desc" },
    });

    return c.json({
        data: result.data,
        pagination: result.pagination,
      },200);
  } catch (error: any) {
    console.error("Transaction pagination error:", error);
    return c.json({ 
        message: "Internal server error",
        error: process.env.NODE_ENV === "development" ? error.message : undefined
      },500);
  }
});



export default router;