const mongoose = require('mongoose');

const feeInvoiceSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Students',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Pending', 'Paid', 'Overdue'], // Example of how you might structure the status field
    },
    paymentDate: {
        type: Date, // Optional, depends on your application logic
    },
}, { timestamps: true });

const FeeInvoice = mongoose.model('FeeInvoice', feeInvoiceSchema);

module.exports = FeeInvoice;
