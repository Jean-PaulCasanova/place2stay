'use strict';

const { Spot, User, SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Find demo user
    const demoUser = await User.findOne({ where: { username: 'Demo-lition' } });

    // 2. Create sample spots
    const spot1 = await Spot.create({
      ownerId: demoUser.id,
      address: '123 Market St',
      city: 'San Francisco',
      state: 'CA',
      country: 'USA',
      lat: 37.7749,
      lng: -122.4194,
      name: 'App Academy SF',
      description: 'Learn to code in the heart of SF!',
      price: 250
    });

    const spot2 = await Spot.create({
      ownerId: demoUser.id,
      address: '456 Sunset Blvd',
      city: 'Los Angeles',
      state: 'CA',
      country: 'USA',
      lat: 34.0522,
      lng: -118.2437,
      name: 'Sunny Retreat LA',
      description: 'Enjoy the sunny vibes of LA!',
      price: 180
    });

    const spot3 = await Spot.create({
      ownerId: demoUser.id,
      address: '789 Mountain View Rd',
      city: 'Denver',
      state: 'CO',
      country: 'USA',
      lat: 39.7392,
      lng: -104.9903,
      name: 'Mountain View',
      description: 'Breathtaking views and fresh air.',
      price: 200
    });

    // 3. Create sample spot images
    await SpotImage.bulkCreate([
      {
        spotId: spot1.id,
        url: 'https://example.com/spot1-preview.jpg',
        preview: true
      },
      {
        spotId: spot1.id,
        url: 'https://example.com/spot1-secondary.jpg',
        preview: false
      },
      {
        spotId: spot2.id,
        url: 'https://example.com/spot2-preview.jpg',
        preview: true
      },
      {
        spotId: spot3.id,
        url: 'https://example.com/spot3-preview.jpg',
        preview: true
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    await queryInterface.bulkDelete(options, null, {});
    options.tableName = 'SpotImages';
    await queryInterface.bulkDelete(options, null, {});
  }
};
