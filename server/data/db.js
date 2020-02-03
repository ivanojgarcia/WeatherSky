import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
const baseUrl = "<url_mongoDB>";

const connectDB = async () => {
    await mongoose.connect(baseUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('DB connected...!')
}

const countriesSchema = new mongoose.Schema({
    code: String,
    name: String,
    latitud: String,
    longitude: String,
    img: String,
    created_at: Date
})
const errorsSchema = new mongoose.Schema({
    code: String,
    description: String,
    created_at: Date
})

const Countries = mongoose.model('countries', countriesSchema);
const ErrorLogs = mongoose.model('errorlogs', errorsSchema);

export { connectDB, Countries, ErrorLogs }