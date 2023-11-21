const Friendship = require('../models/friends');
const Users = require('../models/user');
module.exports.addRemoveFriend = async (req, res) => {
    
    try {
        const friendship = await Friendship.findOne({ $or: [{ from_user: req.params.id }, { to_user: req.params.id }] });
        if (friendship) {
            //remove user from the friend

            let from_user=await Users.findById(req.user.id);
            let to_user=await Users.findById(req.params.id);
            from_user.friendship.pull(to_user.id);
            from_user.save();

            to_user.friendship.pull(from_user.id);
            to_user.save();



            await Friendship.findByIdAndDelete(friendship._id);

            return res.status(200).json({
                message:"friendship removed",
                data:{
                    friend:false
                }
            });

        }
        else {
            let from_user=await Users.findById(req.user.id);
            let to_user=await Users.findById(req.params.id);
            from_user.friendship.push(to_user._id);
            from_user.save();

            to_user.friendship.push(from_user._id);
            to_user.save();
            await Friendship.create({
                from_user:from_user._id,
                to_user:to_user.id
            });

            return res.status(200).json({
                message:"friendship created",
                data:{
                    friend:true
                }
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message:"Internal Server Error"
        });
    }
}