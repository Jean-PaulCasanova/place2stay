'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
options.tableName = 'SpotImages';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const spots = await queryInterface.sequelize.query(
      `SELECT id FROM "${options.schema ? options.schema + '"."' : ''}Spots" ORDER BY id ASC;`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (!spots.length) throw new Error('No spots found. Cannot seed SpotImages.');

    const images = [
      // Spot 1 – App Academy SF
      {
        spotId: spots[0].id,
        url: 'https://images.pexels.com/photos/1170686/pexels-photo-1170686.jpeg?auto=compress&cs=tinysrgb&w=1200',
        preview: true
      },
      {
        spotId: spots[0].id,
        url: 'https://images.unsplash.com/photo-1554995207-c18c203602cb',
        preview: false
      },

      // Spot 2 – Sunny Retreat LA
      {
        spotId: spots[1].id,
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
        preview: true
      },

      // Spot 3 – Mountain View
      {
        spotId: spots[2].id,
        url: 'https://images.pexels.com/photos/4450429/pexels-photo-4450429.jpeg?auto=compress&cs=tinysrgb&w=1200',
        preview: true
      },
      {
        spotId: spots[2].id,
        url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85',
        preview: false
      },

      // Spot 4 – Coastal Cottage
      {
        spotId: spots[3].id,
        url: 'https://images.unsplash.com/photo-1599423300746-b62533397364',
        preview: true
      },

      // Spot 5 – Desert Escape
      {
        spotId: spots[4].id,
        url: 'https://images.unsplash.com/photo-1599423300746-b62533397364',
        preview: true
      },

      // Spot 6 – Malibu Dream
      {
        spotId: spots[5].id,
        url: 'https://images.pexels.com/photos/2587054/pexels-photo-2587054.jpeg?auto=compress&cs=tinysrgb&w=1200',
        preview: true
      },

      // Spot 7 – Forest Haven
      {
        spotId: spots[6].id,
        url: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae',
        preview: true
      },

      // Spot 8 – Urban Zen Loft
      {
        spotId: spots[7].id,
        url: 'https://images.pexels.com/photos/1127119/pexels-photo-1127119.jpeg?auto=compress&cs=tinysrgb&w=1200',
        preview: true
      },
    ];

    // Attach timestamps
    const now = new Date();
    const imageRecords = images.map(img => ({
      ...img,
      createdAt: now,
      updatedAt: now
    }));

    await queryInterface.bulkInsert(options, imageRecords, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, null, {});
  }
};
