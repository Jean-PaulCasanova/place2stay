'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
options.tableName = 'Spots';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const demoUser = await queryInterface.sequelize.query(
      `SELECT id FROM "${options.schema ? options.schema + '"."' : ''}Users" WHERE username = 'Demo-lition' LIMIT 1;`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const demoUserId = demoUser[0]?.id;
    if (!demoUserId) {
      throw new Error('Demo user not found, cannot seed Spots.');
    }

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
      },
      {
        ownerId: demoUserId,
        address: '19 Old Wharf Rd',
        city: 'Cape Cod',
        state: 'MA',
        country: 'USA',
        lat: 41.6688,
        lng: -70.2962,
        name: 'Coastal Cottage',
        description: 'Charming beach house near the water',
        price: 275,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ownerId: demoUserId,
        address: '88 Desert Mirage Ln',
        city: 'Phoenix',
        state: 'AZ',
        country: 'USA',
        lat: 33.4484,
        lng: -112.0740,
        name: 'Desert Escape',
        description: 'Modern home with desert tranquility.',
        price: 150,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ownerId: demoUserId,
        address: '21 Ocean View Dr',
        city: 'Malibu',
        state: 'CA',
        country: 'USA',
        lat: 34.0259,
        lng: -118.7798,
        name: 'Malibu Dream',
        description: 'Beachfront luxury retreat.',
        price: 450,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ownerId: demoUserId,
        address: '42 Hilltop Way',
        city: 'Portland',
        state: 'OR',
        country: 'USA',
        lat: 45.5122,
        lng: -122.6587,
        name: 'Forest Haven',
        description: 'Escape into a woodland paradise.',
        price: 195,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ownerId: demoUserId,
        address: '10 Cherry Blossom Ln',
        city: 'Seattle',
        state: 'WA',
        country: 'USA',
        lat: 47.6062,
        lng: -122.3321,
        name: 'Urban Zen Loft',
        description: 'Minimalist apartment in the heart of the city.',
        price: 220,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    await queryInterface.bulkDelete(options, null, {});
  }
};
