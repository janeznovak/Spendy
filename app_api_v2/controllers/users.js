const mongoose = require("mongoose");
const User = mongoose.model("User");
const Group = mongoose.model("Group");

/** GET /api/v2/users
 * @swagger
 *  /users:
 *    get:
 *      summary: Get all users
 *      description: Returns a list of all users
 *      tags: [Users]
 *      responses:
 *        "200":
 *          description: An array of users
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/User_getAllUsers'
 *        "500":
 *          description: Error in database
 *          content:
 *            application/json:
 *              schema:
 *                items:
 *                  $ref: '#/components/schemas/Error'
 *        "404":
 *          description: No user was found
 *          content:
 *            application/json:
 *              schema:
 *                items:
 *                  $ref: '#/components/schemas/Error'
 */
const getAllUsers = (req, res) => {
    User.find()
        .select("_id groupIds username name surname balance mail")
        .exec((error, users) => {
            if (error) {
                res.status(500).json({ message: "Error in database", error: error });
            } else if (!users) {
                res.status(404).json({ message: "Users not found" });
            } else {
                res.status(200).json(users);
            }
        });
};

module.exports = { getAllUsers };
