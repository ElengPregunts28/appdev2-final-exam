const Event = require("../models/Event");

const getallEvents = async (req, res) => {
    try {
        const events = await Event.find({});
        res.json({ events: events, success: true});
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });

    }
}; 

const getEvents = async (req, res) => {
    try {
        const event = await Event.find({ userId: req.userId }).sort({ date: -1 });
        res.json({ event: event, success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const postEvents = async (req, res) => {
     try {
        const product = await Event.create(req.body);
        res.json({ success: true, message: "New Event Added!" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getallEvents,
    getEvents,
    postEvents
};

