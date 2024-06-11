import { Sequelize } from 'sequelize-typescript';
import { Content } from 'src/content/entities/content.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: '.db/data.sqlite3',
      });
      sequelize.addModels([Content]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
