const basicFeedController = {};

basicFeedController.get = (req,res) => {
    res.json({
        message: 'success'
    });
};
export default basicFeedController;