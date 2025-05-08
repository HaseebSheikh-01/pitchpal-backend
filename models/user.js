module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
  type: DataTypes.ENUM("startup", "investor", "admin"),
  defaultValue: null,  // Allow role to be null initially
  allowNull: true,     // Allow null value
},

  });


  User.associate = (models) => {
    User.hasMany(models.Investor, {
      foreignKey: 'userId',
      as: 'investors',  // This alias should match the relation in Investor
    });
  };


  return User;
};
