export type PaginationResult<T> = {
    data: T[],
    pagination: {
        page: number
        limit: number
        total: number
        pages:number
    }
}

export async function pagination<T>(
    model: any,
    options: {
        page?: number
        limit?: number
        where?: any
        include?: any
        orderBy?: any
        select?: any
    } = {}
): Promise<PaginationResult<T>> {
    const page = Math.max(1, options.page ?? 1);    
    const limit = Math.min(10, Math.max(1, options.limit ?? 4));

    /* เก็บค่าที่จะ skip ไปเช่นหน้า 2 => (2-1) x 4 = 4 ก็จะข้าม 4 row แรกไป */
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
        /* ข้อมูลที่ไป query และเงื่อนไขหากมี */
        model.findMany.findMany({
            where: options.where,
            orderBy: options.orderBy,
            include: options.include,
            select: options.select,
            skip: skip,
            take: limit,
        }),
        /* จำนวน row ที่ถูกดึงมา */
        model.count({
            where: options.where,
        })
    ])
    return {
        data,
        pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit)
        },
    }
}