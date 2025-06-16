'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
options.tableName = 'SpotImages';

module.exports = {
  async up(queryInterface, Sequelize) {
    const spots = await queryInterface.sequelize.query(
      `SELECT id FROM "${options.schema ? options.schema + '"."' : ''}Spots" ORDER BY id ASC;`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (!spots.length || spots.length < 8) {
      throw new Error('Expected at least 8 spots for seeding SpotImages.');
    }

    const imageSets = [
      // App Academy SF
      [
        'https://images.unsplash.com/photo-1509395176047-4a66953fd231',
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be',
        'https://images.unsplash.com/photo-1501183638710-841dd1904471',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
        'https://images.unsplash.com/photo-1574172580388-1ef4b17b4ae0'
      ],
      // Sunny Retreat LA
      [
        'https://images.unsplash.com/photo-1507089947368-19c1da9775ae',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
        'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb',
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914',
        'https://images.unsplash.com/photo-1598928506311-2c602453e26c'
      ],
      // Mountain View
      [
        'https://images.unsplash.com/photo-1502673530728-f79b4cab31b1',
        'https://images.unsplash.com/photo-1505691938895-1758d7feb511',
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914',
        'https://images.unsplash.com/photo-1598928506311-2c602453e26c',
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914'
      ],
      // Cozy Cabin Vermont
      [
        'https://images.unsplash.com/photo-1556909218-31b42b6ab5d4',
        'https://images.unsplash.com/photo-1600585154203-83b49bff9342',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
        'https://images.unsplash.com/photo-1574172580388-1ef4b17b4ae0',
        'https://images.unsplash.com/photo-1598928506311-2c602453e26c'
      ],
      // Urban Oasis NYC
      [
        'https://images.unsplash.com/photo-1549921296-3c585f292b5e',
        'https://images.unsplash.com/photo-1600585154203-83b49bff9342',
        'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb',
        'https://images.unsplash.com/photo-1574172580388-1ef4b17b4ae0',
        'https://images.unsplash.com/photo-1502673530728-f79b4cab31b1'
      ],
      // Desert Escape AZ
      [
        'https://images.unsplash.com/photo-1600585154203-83b49bff9342',
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be',
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914',
        'https://images.unsplash.com/photo-1509395176047-4a66953fd231',
        'https://images.unsplash.com/photo-1549921296-3c585f292b5e'
      ],
      // Lakeside Retreat
      [
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914',
        'https://images.unsplash.com/photo-1507089947368-19c1da9775ae',
        'https://images.unsplash.com/photo-1556909218-31b42b6ab5d4',
        'https://images.unsplash.com/photo-1600585154203-83b49bff9342',
        'https://images.unsplash.com/photo-1549921296-3c585f292b5e'
      ],
      // High-Rise Haven
      [
        'https://images.unsplash.com/photo-1501183638710-841dd1904471',
        'https://images.unsplash.com/photo-1502673530728-f79b4cab31b1',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be',
        'https://images.unsplash.com/photo-1507089947368-19c1da9775ae'
      ]
    ];

    const imageEntries = [];

    spots.forEach((spot, index) => {
      const images = imageSets[index];
      images.forEach((url, i) => {
        imageEntries.push({
          spotId: spot.id,
          url,
          preview: i === 0, // First image is preview
          createdAt: new Date(),
          updatedAt: new Date()
        });
      });
    });

    await queryInterface.bulkInsert(options, imageEntries, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, null, {});
  }
};
