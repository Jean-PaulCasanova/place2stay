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
        url: 'https://images.unsplash.com/photo-1560448070-cf7b7aeb3c91',
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
        url: 'https://images.unsplash.com/photo-1600585154154-2300ebdaf74e',
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
        url: 'https://images.unsplash.com/photo-1600585154080-8787ee70a27b',
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
        url: 'https://images.unsplash.com/photo-1613977257363-e7dc9c4b3d10',
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
