'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class employee_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  employee_detail.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    birthdate: DataTypes.DATE,
    joindate: DataTypes.DATE,
    userId: DataTypes.SMALLINT,
    salaryId: DataTypes.SMALLINT
  }, {
    sequelize,
    modelName: 'employee_detail',
  });
  return employee_detail;
};