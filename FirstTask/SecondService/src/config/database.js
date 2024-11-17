import { DataSource } from "typeorm";

import config from "../../ormconfig.js";


const AppDataSource = new DataSource(config)


export default AppDataSource;