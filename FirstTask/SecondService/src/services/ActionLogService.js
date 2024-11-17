class ActionLogService {
    constructor(repository) {
      this.repository = repository;
    }
  
    async addActionLog(data) {
      return this.repository.create(data);
    }
  
    async getActionLogs(filters, pagination) {
      return this.repository.find(filters, pagination);
    }
  }
  
  export default ActionLogService;
  