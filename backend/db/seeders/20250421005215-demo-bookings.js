'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    // Get user IDs
    const demoUser = await queryInterface.sequelize.query(
      `SELECT id FROM Users WHERE username = 'Demo-lition' LIMIT 1;`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    
    const fakeUser1 = await queryInterface.sequelize.query(
      `SELECT id FROM Users WHERE username = 'FakeUser1' LIMIT 1;`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    
    const fakeUser2 = await queryInterface.sequelize.query(
      `SELECT id FROM Users WHERE username = 'FakeUser2' LIMIT 1;`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    
    // Get spot IDs
    const spots = await queryInterface.sequelize.query(
      `SELECT id FROM Spots ORDER BY id LIMIT 3;`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    
    // Check if we have enough spots and users
    if (spots.length < 3 || !demoUser.length || !fakeUser1.length || !fakeUser2.length) {
      console.error("Error: Missing required spots or users in database");
      return;
    }

    const demoUserId = demoUser[0].id;
    const user1Id = fakeUser1[0].id;
    const user2Id = fakeUser2[0].id;
    
    // Helper function to calculate future dates
    const getFutureDate = (daysFromNow) => {
      const date = new Date();
      date.setDate(date.getDate() + daysFromNow);
      return date;
    };
    
    // Create sample bookings
    options.tableName = 'Bookings';
    await queryInterface.bulkInsert(options, [
      {
        spotId: spots[0].id,
        userId: user1Id,
        startDate: getFutureDate(10),
        endDate: getFutureDate(15),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: spots[0].id,
        userId: user2Id,
        startDate: getFutureDate(20),
        endDate: getFutureDate(25),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: spots[1].id,
        userId: demoUserId,
        startDate: getFutureDate(5),
        endDate: getFutureDate(8),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: spots[1].id,
        userId: user2Id,
        startDate: getFutureDate(12),
        endDate: getFutureDate(16),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: spots[2].id,
        userId: user1Id,
        startDate: getFutureDate(30),
        endDate: getFutureDate(35),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    await queryInterface.bulkDelete(options, null, {});
  }
};