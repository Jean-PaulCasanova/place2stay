'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');

module.exports = (sequelize) => {
  class Review extends Model {
    static associate(models) {
      // Review belongs to User (Author of the review)
      Review.belongsTo(models.User, { foreignKey: 'userId' });

      // Review belongs to Spot (The spot being reviewed)
      Review.belongsTo(models.Spot, { foreignKey: 'spotId' });
    }
  }

  Review.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: 'User ID must be an integer'
        },
      }
    },
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: 'Spot ID must be an integer'
        },
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Review content cannot be empty'
        }
      }
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: 'Rating must be an integer'
        },
        min: 1,
        max: 5,
        msg: 'Rating must be between 1 and 5'
      }
    }
  }, {
    sequelize,
    modelName: 'Review',
  });

  return Review;
};