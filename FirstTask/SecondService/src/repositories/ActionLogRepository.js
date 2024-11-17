class ActionLogRepository {
  constructor(dataSource) {
    this.repository = dataSource.getRepository("ActionLog");
  }

  async create(logData) {
    console.log(logData)
    const log = this.repository.create({plu: logData.payload.plu, action: logData.action, shopId: logData.payload.shopId});
    return this.repository.save(log);
  }

  async find(filters, pagination) {
    const result = this.repository.find({
      where: {
        shopId: filters.shopId,
        plu: filters.plu,
        action: filters.action,
        createdAt: filters.dateFrom,
      },
      skip: pagination.offset,
      take: pagination.limit,
    });

    return result;
  }
}

export default ActionLogRepository;
