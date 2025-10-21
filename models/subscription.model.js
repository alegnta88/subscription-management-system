import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Subscription Name is required'],
        trim: true,
        minlength: [2, 'Subscription Name must be at least 2 characters long'],
        maxlength: [100, 'Subscription Name must be at most 100 characters long']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be at least 0'],
        max: [10000, 'Price must be at most 10000']
    },
    currency: {
        type: String,
        enum: ['USD', 'EUR', 'GBP', 'JPY'],
        default: 'USD'
    },
    frequency: {
        type: String,
        required: [true, 'Frequency is required'],
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
    },
    category: {
        type: String,
        enum: ['entertainment', 'education', 'productivity', 'health', 'other'],
        required: [true, 'Category is required']
    },
    paymentMethod: {
        type: String,
        enum: ['credit_card', 'debit_card', 'paypal', 'bank_transfer', 'other'],
        required: [true, 'Payment Method is required'],
        trim: true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'canceled'],
        default: 'active'
    },
    startDate: {
        type: Date,
        required: [true, 'Start Date is required'],
        validate: {
            validator: function(value) {
                return value <= new Date();
    },
            message: 'Start Date cannot be in the future'
    },
    
},
    renewalDate: {
        type: Date,
        validate: {
            validator: function(value) {
                return value >= this.startDate;
    },
            message: 'Renewal Date must be after Start Date'
    },
    
},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User reference is required'],
        index: true
    }
, }, {timestamps: true});



subscriptionSchema.pre('save', function(next) {

    if (!this.renewalDate){
        const renewalPeriods = {
            'daily': 1,
            'weekly': 7,
            'monthly': 30,
            'yearly': 365
        };
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }

    if (this.renewalDate < new Date()) {
        this.status = 'inactive';
    }
    next();
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);
export default Subscription;