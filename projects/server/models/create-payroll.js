"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class create_payroll extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  create_payroll.init(
    {
      user_id: DataTypes.SMALLINT,
      date: DataTypes.DATE,
      total_deduction: DataTypes.INTEGER,
      total_payroll: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "create-payroll",
    }
  );
  return create_payroll;
};
