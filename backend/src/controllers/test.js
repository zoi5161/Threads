const testService = require("../services/test");

const getTests = async (req, res) => {
    console.log('Get tests controller running');
  try {
    const tests = await testService.getTests();
    res.status(200).json(tests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createTest = async (req, res) => {
    console.log('Create test controller running');
  const test = req.body;
  console.log(test);
  try {
    const newTest = await testService.createTest(test);
    res.status(201).json(newTest);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

module.exports = { getTests, createTest };
