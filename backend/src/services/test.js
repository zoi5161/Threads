const mongoose = require("mongoose");
const Test = require("../models/Test");

const getTests = async () => {
  console.log("Get tests service running");
  try {
    const tests = await Test.find();
    return tests;
  } catch (err) {
    throw new Error(err);
  }
};

const createTest = async (data) => {
  console.log("Creating test service running");
  const {name, age} = data;
  const newTest = new Test({ name, age });
  try {
    await newTest.save();
    return newTest;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = { getTests, createTest };
