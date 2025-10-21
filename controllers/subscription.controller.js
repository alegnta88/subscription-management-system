import Subscription from '../models/subscription.model.js';

export const createSubscription = async (req, res, next) => {

    try {

        const subscription = await Subscription.create(

            {
                ...req.body,
                user: req.user._Id,
            }
        );

        res.status(201).json({
            success: true,
            data: subscription
        });
        

    } catch (error) {
        next(error);
    }
    
}

export const getUserSubscriptions = async (req, res, next) => {
    try {
        
        // for debugging purpose
        console.log('Authenticated User ID:', req.user._id.toString());
        console.log('Requested User ID:', req.params.userId);
        console.log('Are they equal?', req.user._id.toString() === req.params.userId);
        
        if (req.user._id.toString() !== req.params.userId) {
            const error = new Error("You are not authorized to view these subscriptions");
            error.status = 403; 
            throw error;
        }

        const subscriptions = await Subscription.find({ user: req.params.userId });

        res.status(200).json({
            success: true,
            count: subscriptions.length,
            data: subscriptions
        });
    } catch (error) {
        next(error);
    }
}