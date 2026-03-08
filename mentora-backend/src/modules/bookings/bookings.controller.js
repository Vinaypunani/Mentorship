const bookingService = require("./bookings.service")

const createBooking = async (req, res) => {
    try {
        const parentId = req.user.id;

        const booking = await bookingService.createBooking(parentId, req.body);

        res.status(201).json({ booking });
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}

module.exports = { createBooking }