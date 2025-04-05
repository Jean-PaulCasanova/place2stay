'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');

module.exports = (sequelize) => {
  class Booking extends Model {
    static associate(models) {
      // Booking belongs to User (The user who booked the spot)
      Booking.belongsTo(models.User, { foreignKey: 'userId' });

      // Booking belongs to Spot (The spot being booked)
      Booking.belongsTo(models.Spot, { foreignKey: 'spotId' });
    }
  }

  Booking.init({
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
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          msg: 'Start date must be a valid date'
        },
      }
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          msg: 'End date must be a valid date'
        },
        isAfter(value) {
          if (new Date(value) <= new Date(this.startDate)) {
            throw new Error('End date must be after start date');
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });

  return Booking;
};