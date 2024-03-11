const connection = require('./connection');

//Models
const restaurant = require('../Models/restaurant');
const product = require('../Models/product');
const department = require('../Models/department');
const city = require('../Models/city');

// JSON
const departmentjson = require('./JsonFiles/departmentjson');
const cityjson = require('./JsonFiles/cityjson'); 

async function sync() {
    //Foreign Key restaurant - product
    restaurant.hasMany(product, {
        foreignKey: 'restaurantId',
        onDelete: 'restrict',
        onUpdate: 'cascade'
    });

    product.belongsTo(restaurant, {
        foreignKey: 'restaurantId'
    });

    //Foreign Key departament - city
    department.hasMany(city, {
        foreignKey: 'departamentId',
        onDelete: 'restrict',
        onUpdate: 'cascade'
    });
    city.belongsTo(department, {
        foreignKey: 'departmentId'
    });

    //Foreign Ley city - restaurant 
    city.hasMany(restaurant, {
        foreignKey: 'cityId',
        onDelete: 'restrict',
        onUpdate: 'cascade'
    });
    restaurant.belongsTo(city, {
        foreignKey: 'cityId'
    });

    await connection.sync({force : false}) 
    .then(() => { 
    console.log('Base de datos sincronizada'); 
    })
    .catch((error) => { 
    console.error('Error al sincronizar la base de datos:' + error); 
    }); 

    // Create Json 
    departmentjson.createDepartments();
    cityjson.createCities();

}

sync();