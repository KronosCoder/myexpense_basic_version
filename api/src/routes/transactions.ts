import { Hono, Context } from "hono";
import { prisma } from "../libs/prisma";
import { pagination } from "../libs/paginate";
const router = new Hono();

router.get('/', async (c: Context) => {
    const currPage =  Number(c.req.param('page'));
    if (isNaN(currPage) || currPage < 1) return c.json({ message: 'Invalid page number' }, 400);

    const transactions = await pagination(prisma.transaction, {
        page: currPage,
        limit: 4,
    });

    return c.json({
        transactions,
        status_code: 200,
    }, 200);
})

export default router;