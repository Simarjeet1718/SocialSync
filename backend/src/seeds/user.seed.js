import { config } from "dotenv";
import connectDB from "../lib/db.js";
import User from "../models/userModel.js";


config();

const seedUsers = [
  {
    email: "arjun.singh@example.com",
    fullName: "Arjun Singh",
    password: "password123",
    profilePic: "https://randomuser.me/api/portraits/men/11.jpg",
  },
  {
    email: "anjali.sharma@example.com",
    fullName: "Anjali Sharma",
    password: "password123",
    profilePic: "https://randomuser.me/api/portraits/women/11.jpg",
  },
  {
    email: "rahul.sharma@example.com",
    fullName: "Rahul Sharma",
    password: "password123",
    profilePic: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    email: "priya.verma@example.com",
    fullName: "Priya Verma",
    password: "password123",
    profilePic: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    email: "vikram.patel@example.com",
    fullName: "Vikram Patel",
    password: "password123",
    profilePic: "https://randomuser.me/api/portraits/men/13.jpg",
  },
  {
    email: "isha.patel@example.com",
    fullName: "Isha Patel",
    password: "password123",
    profilePic: "https://randomuser.me/api/portraits/women/13.jpg",
  },
  {
    email: "aditya.kumar@example.com",
    fullName: "Aditya Kumar",
    password: "password123",
    profilePic: "https://randomuser.me/api/portraits/men/14.jpg",
  },
  {
    email: "neha.kapoor@example.com",
    fullName: "Neha Kapoor",
    password: "password123",
    profilePic: "https://randomuser.me/api/portraits/women/14.jpg",
  },
  {
    email: "manish.verma@example.com",
    fullName: "Manish Verma",
    password: "password123",
    profilePic: "https://randomuser.me/api/portraits/men/15.jpg",
  },
  {
    email: "swati.jain@example.com",
    fullName: "Swati Jain",
    password: "password123",
    profilePic: "https://randomuser.me/api/portraits/women/15.jpg",
  },
  {
    email: "naveen.gupta@example.com",
    fullName: "Naveen Gupta",
    password: "password123",
    profilePic: "https://randomuser.me/api/portraits/men/16.jpg",
  },
  {
    email: "pooja.agarwal@example.com",
    fullName: "Pooja Agarwal",
    password: "password123",
    profilePic: "https://randomuser.me/api/portraits/women/16.jpg",
  },
  {
    email: "simran.khan@example.com",
    fullName: "Simran Khan",
    password: "password123",
    profilePic: "https://randomuser.me/api/portraits/women/17.jpg",
  },
  {
    email: "ravi.mehra@example.com",
    fullName: "Ravi Mehra",
    password: "password123",
    profilePic: "https://randomuser.me/api/portraits/men/17.jpg",
  },
  {
    email: "rani.gupta@example.com",
    fullName: "Rani Gupta",
    password: "password123",
    profilePic: "https://randomuser.me/api/portraits/women/18.jpg",
  },
  {
    email: "sahil.khan@example.com",
    fullName: "Sahil Khan",
    password: "password123",
    profilePic: "https://randomuser.me/api/portraits/men/18.jpg",
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    await User.insertMany(seedUsers);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Call the function
seedDatabase();
