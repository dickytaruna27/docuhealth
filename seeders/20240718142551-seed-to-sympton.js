'use strict';
const fs = require('fs').promises

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const dataStr = await fs.readFile('./data/symptom.json', "utf-8")
    const dataJson = JSON.parse(dataStr)
    const data = dataJson.map((el) =>{
     el.createdAt = new Date ()
     el.updatedAt = new Date ()
     
     return el
    })
    await queryInterface.bulkInsert("Symptoms", data, {})

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Symptoms",null,{})
  }
};
