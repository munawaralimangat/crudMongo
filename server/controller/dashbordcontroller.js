const User = require('../model/model')
const axios = require('axios')


const dashbordView = async (req,res)=>{
    res.render("dashbord",{
        user:req.user
    })
}

//update info
const editView = async (req,res)=>{
    res.render('editForm',{
        user:req.user
    })
}

const updateInfo = async (req, res) => {
    const userId = req.params._id;
    console.log(req.body);
    const {newName, newEmail} = req.body;
    console.log(newName,"new");
    try {
        let updatedUser = await User.findByIdAndUpdate(
            userId,
            { name:newName, email:newEmail },
            { new: true }
        );
        console.log("Updated user:", updatedUser);
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.render('dashbord', {
            user: updatedUser
        });

        console.log("Updated user rendered:", updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

//delete info/profile
const removeInfo = async (req, res) => {
    const userId = req.params._id;

    try {
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).send('User deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
};





const logOut= async (req,res)=>{
    req.session.destroy((err) => {
    res.redirect('login') // will always fire after session is destroyed
 })
}

module.exports = {
    dashbordView,
    logOut,
    editView,
    updateInfo,
    removeInfo,
}