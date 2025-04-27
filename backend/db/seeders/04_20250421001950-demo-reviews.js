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
    
    // Create sample reviews
    options.tableName = 'Reviews';
    const reviews = await queryInterface.bulkInsert(options, [
      {
        spotId: spots[0].id,
        userId: user1Id,
        review: "This place was absolutely amazing! The location was perfect and the amenities were top-notch.",
        stars: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: spots[0].id,
        userId: user2Id,
        review: "Great spot overall. Just a few minor issues with cleanliness but would stay again.",
        stars: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: spots[1].id,
        userId: demoUserId,
        review: "Wonderful experience! The host was very accommodating and the place exceeded my expectations.",
        stars: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: spots[1].id,
        userId: user2Id,
        review: "Decent spot but overpriced for what you get. The neighborhood was a bit noisy at night.",
        stars: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: spots[2].id,
        userId: user1Id,
        review: "Perfect getaway! Beautiful views and excellent amenities. Would definitely recommend!",
        stars: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { returning: true });

    // Get the inserted review IDs
    const insertedReviews = await queryInterface.sequelize.query(
      `SELECT id FROM Reviews ORDER BY id DESC LIMIT 5;`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Create sample review images
    options.tableName = 'ReviewImages';
    await queryInterface.bulkInsert(options, [
      {
        reviewId: insertedReviews[0].id,
        url: "https://example.com/review-image1.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        reviewId: insertedReviews[0].id,
        url: "https://example.com/review-image2.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        reviewId: insertedReviews[2].id,
        url: "https://example.com/review-image3.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    await queryInterface.bulkDelete(options, null, {});
    
    options.tableName = 'Reviews';
    await queryInterface.bulkDelete(options, null, {});
  }
};
