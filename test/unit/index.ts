// Require all of the files ending with '.test' in this directory and all subdirectories
const testsContext = require.context('.', true, /.test$/);
testsContext.keys().forEach(testsContext);
