const dateBookings = [];

export const saveDate = (req, res) => {
    const {recipient, dateType, date, time} = req.body;

    if(!dateType || !date || !time){
        return res.status(400).json({
            error: 'Please provide all required fields'
        })
    }
    const newBooking = {
        id: dateBookings.length + 1,
        recipient,
        dateType,
        date,
        time,
        createdAt: new Date().toISOString()
    }
    dateBookings.push(newBooking);
    res.status(201).json({
        message: 'Date booked successfully',
        data: newBooking
    });
};

export const getDates = (req, res) => {
    res.status(200).json({
        data: dateBookings,
        message: 'Dates retrieved successfully',
        count: dateBookings.length
    })
}