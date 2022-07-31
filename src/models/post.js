const constructor = (sequelize, DataTypes) => {
    const Post = sequelize.define('Posts', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        imageUrl: {
            type: DataTypes.STRING
        },
        uploadedImage: {
            type: DataTypes.STRING
        },
        uploadedVideo: {
            type: DataTypes.STRING
        },
        message: {
            type: DataTypes.TEXT
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
        }
    });

    //Class Method - associations
    Post.associate = function (models) {
        models.User.hasMany(Post, {
            foreignKey: 'userId'
        });
    };

    return Post;
};

module.exports = constructor;