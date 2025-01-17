const { where } = require("sequelize");
const { User } = require("../models/index")


const createUser = async (req, res) => {
    console.log("logged ")
    console.log(req.body)
    const { mobileNumber, profilePicture, userName = "sdsd", countryCode } = req.body;

    try {
        const user = await User.create({
            mobileNumber,
            profilePicture: "https://www.irreverentgent.com/wp-content/uploads/2018/03/Awesome-Profile-Pictures-for-Guys-look-away2.jpg",
            userName: "sudhanshu",
            countryCode: 91
        });
        console.log(user)
        return res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}
const loginUser = async (req, res) => {
    console.log("logged ")
    console.log(req.body)
    const { mobileNumber,} = req.body;

    try {
        const user = await User.findOne({
            where: {
                mobileNumber
            }
        });
        console.log(user)
        return res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

const searchUser = async (req, res) => {
    console.log("logged ")
    console.log(req.body)
    const { mobileNumber } = req.body;
    console.log(mobileNumber)

    try {
        const user = await User.findOne({
            where: {
                mobileNumber
            }
        })
        console.log(user)
        return res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

module.exports = { createUser, searchUser,loginUser }