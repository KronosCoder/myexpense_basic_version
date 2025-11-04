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

    // Skip = (page - 1) * limit
    // ตัวอย่าง: page=2, limit=4 -> (2-1)*4 = 4 -> ข้าม 4 แถว, เริ่มที่ index 4
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
        model.findMany({
            where: options.where,
            orderBy: options.orderBy,
            include: options.include,
            select: options.select,
            skip: skip,
            take: limit,
        }),
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