'use strict';

let options = {};
let schema = '';
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
  schema = `"${process.env.SCHEMA}".`; // note the dot
}

module.exports = {
  async up(queryInterface, Sequelize) {
    // Find demo user id from Users table
    const demoUser = await queryInterface.sequelize.query(
      `SELECT id FROM ${schema}"Users" WHERE username = 'Demo-lition' LIMIT 1;`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    
    const demoUserId = demoUser[0].id;

    // rest of your seeding logic
    
    // Create sample spots using bulkInsert
    options.tableName = 'Spots';
    await queryInterface.bulkInsert(options, [
      {
        ownerId: demoUserId,
        address: '123 Market St',
        city: 'San Francisco',
        state: 'CA',
        country: 'USA',
        lat: 37.7749,
        lng: -122.4194,
        name: 'App Academy SF',
        description: 'Learn to code in the heart of SF!',
        price: 250,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ownerId: demoUserId,
        address: '456 Sunset Blvd',
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA',
        lat: 34.0522,
        lng: -118.2437,
        name: 'Sunny Retreat LA',
        description: 'Enjoy the sunny vibes of LA!',
        price: 180,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ownerId: demoUserId,
        address: '789 Mountain View Rd',
        city: 'Denver',
        state: 'CO',
        country: 'USA',
        lat: 39.7392,
        lng: -104.9903,
        name: 'Mountain View',
        description: 'Breathtaking views and fresh air.',
        price: 200,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
    
    // Get the inserted spot ids
    const spots = await queryInterface.sequelize.query(
      `SELECT id FROM Spots WHERE ownerId = ${demoUserId} ORDER BY id;`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    
    // Create sample spot images
    options.tableName = 'SpotImages';
    await queryInterface.bulkInsert(options, [
      {
        spotId: spots[0].id,
        url: 'https://example.com/spot1-preview.jpg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: spots[0].id,
        url: 'https://example.com/spot1-secondary.jpg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: spots[1].id,
        url: 'https://example.com/spot2-preview.jpg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: spots[2].id,
        url: 'https://example.com/spot3-preview.jpg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    await queryInterface.bulkDelete(options, null, {});
    
    options.tableName = 'Spots';
    await queryInterface.bulkDelete(options, null, {});
  }
};
