import mongoose from "mongoose";


const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_DB)
        console.log("✅ MongoDB connected");
        
    }
    catch{
        console.log("❌ MongoDB failed");
        process.exit(1)
    }
}

export default connectDB