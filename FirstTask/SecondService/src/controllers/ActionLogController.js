class ActionLogController {
    constructor(service) {
      this.service = service;
    }
  
    async createLog(req, res) {
      try {
        const log = await this.service.addActionLog(req.body);
        res.status(201).json(log);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  
    async getLogs(req, res) {
      try {
        const filters = {
          shopId: req.query.shopId,
          plu: req.query.plu,
          action: req.query.action,
          dateFrom: req.query.dateFrom,
          dateTo: req.query.dateTo,
        };
        const pagination = {
          offset: parseInt(req.query.offset, 10) || 0,
          limit: parseInt(req.query.limit, 10) || 10,
        };
  
        const [logs, total] = await this.service.getActionLogs(filters, pagination);
        res.json({ total, logs });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  }
  
  export default ActionLogController;
  