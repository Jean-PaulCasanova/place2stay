'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define schema in production
}

module.exports = {
  async up(queryInterface, Sequelize) {
    const { User, Spot, Review, ReviewImage } = queryInterface.sequelize.models;

    // Find users by username
    const demoUser = await User.findOne({ where: { username: 'Demo-lition' } });
    const fakeUser1 = await User.findOne({ where: { username: 'FakeUser1' } });
    const fakeUser2 = await User.findOne({ where: { username: 'FakeUser2' } });

    if (!demoUser || !fakeUser1 || !fakeUser2) {
      console.error('Error: One or more required users not found.');
      return;
    }

    // Get the first 3 spots
    const spots = await Spot.findAll({
      order: [['id', 'ASC']],
      limit: 3
    });

    if (spots.length < 3) {
      console.error('Error: Not enough spots found.');
      return;
    }

    // Insert sample reviews
    options.tableName = 'Reviews';
    const insertedReviews = await queryInterface.bulkInsert(options, [
      {
        spotId: spots[0].id,
        userId: fakeUser1.id,
        review: "This place was absolutely amazing! The location was perfect and the amenities were top-notch.",
        stars: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: spots[0].id,
        userId: fakeUser2.id,
        review: "Great spot overall. Just a few minor issues with cleanliness but would stay again.",
        stars: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: spots[1].id,
        userId: demoUser.id,
        review: "Wonderful experience! The host was very accommodating and the place exceeded my expectations.",
        stars: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: spots[1].id,
        userId: fakeUser2.id,
        review: "Decent spot but overpriced for what you get. The neighborhood was a bit noisy at night.",
        stars: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: spots[2].id,
        userId: fakeUser1.id,
        review: "Perfect getaway! Beautiful views and excellent amenities. Would definitely recommend!",
        stars: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { returning: true });

    // Find the newly inserted reviews
    const newReviews = await Review.findAll({
      where: {
        userId: [demoUser.id, fakeUser1.id, fakeUser2.id]
      },
      order: [['id', 'ASC']]
    });

    // Insert sample review images
    options.tableName = 'ReviewImages';
    await queryInterface.bulkInsert(options, [
      {
        reviewId: newReviews[0].id,
        url: 'https://example.com/review-image1.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        reviewId: newReviews[0].id,
        url: 'https://example.com/review-image2.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        reviewId: newReviews[2].id,
        url: 'https://example.com/review-image3.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    const { User, Review, ReviewImage } = queryInterface.sequelize.models;

    const demoUser = await User.findOne({ where: { username: 'Demo-lition' } });
    const fakeUser1 = await User.findOne({ where: { username: 'FakeUser1' } });
    const fakeUser2 = await User.findOne({ where: { username: 'FakeUser2' } });

    if (!demoUser || !fakeUser1 || !fakeUser2) {
      console.error('Error: One or more required users not found for rollback.');
      return;
    }

    // Find reviews created by seeded users
    const reviewsToDelete = await Review.findAll({
      where: {
        userId: [demoUser.id, fakeUser1.id, fakeUser2.id]
      }
    });

    const reviewIds = reviewsToDelete.map(review => review.id);

    if (reviewIds.length > 0) {
      // Delete associated review images first
      options.tableName = 'ReviewImages';
      await queryInterface.bulkDelete(options, {
        reviewId: { [Sequelize.Op.in]: reviewIds }
      });

      // Then delete reviews
      options.tableName = 'Reviews';
      await queryInterface.bulkDelete(options, {
        id: { [Sequelize.Op.in]: reviewIds }
      });
    }
  }
};