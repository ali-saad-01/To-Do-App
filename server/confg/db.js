const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://saadalii01q:KV17x5vFEPPfbaT9@cluster0.czzsrwb.mongodb.net/Task', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

.then(()=>console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err))

module.exports = mongoose.connection;
