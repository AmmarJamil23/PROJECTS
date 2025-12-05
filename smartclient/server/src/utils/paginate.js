module.exports = async function paginate(model, query,  page = 1, limit = 10, populate = null, sort = {createdAt: -1 }) {
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
        populate
        ? model.find(query).populate(populate).sort(sort).skip(skip).limit(limit) : model.find(query).sort(sort).skip(skip).limit(limit),

        model.countDocuments(query),
    ]);

    return {
        items,
        total,
        page, 
        limit,
        totalPages: Math.ceil(total / limit),

    };
};