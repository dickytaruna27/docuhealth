'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SymptomToDisease extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SymptomToDisease.belongsTo(models.Symptom)
      SymptomToDisease.belongsTo(models.Disease)
    }
  }
  SymptomToDisease.init({
    SymptomId: DataTypes.INTEGER,
    DiseaseId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SymptomToDisease',
  });
  return SymptomToDisease;
};