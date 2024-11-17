import { EntitySchema } from "typeorm";

const ActionLog = new EntitySchema({
  name: "ActionLog",
  tableName: "action_logs",
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },
    shopId: {
      type: "varchar",
      nullable: true
    },
    plu: {
      type: "varchar",
      nullable: true
    },
    action: {
      type: "varchar",
    },
    createdAt: {
      type: "timestamp",
      createDate: true,
    },
  },
});


export default ActionLog;