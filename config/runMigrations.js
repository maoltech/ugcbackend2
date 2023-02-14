const { sequelize } = require('./db')

const runMigrations = () => {
    sequelize.getQueryInterface().showAllTables().then(tableNames => {
        if (!tableNames.includes('users')) {
            sequelize.sync({ force: true }).then(() => {
                console.log('Tables created successfully');
            }).catch((error) => {
                console.error('Error creating tables: ', error);
            });
        } else {
            console.log('Tables already created, skipping');
        }
    });
}

module.exports = { runMigrations };