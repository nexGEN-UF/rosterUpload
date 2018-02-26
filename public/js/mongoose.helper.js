var Student = require('./student.model');


var interpretSchema = function(schema) {
    var student = {};

    Object.keys(schema.base.models.Student.schema.paths).forEach((prop, ind) => {
        student[prop] = {
            type: schema.base.models.Student.schema.paths[prop].instance,
            isRequired: schema.base.models.Student.schema.paths[prop].isRequired === true
        };
    });

    return student;
}

var sendStudent = function(student) {
    // Save each database request promise into array so we can keep track of when they all finish
    var promise = Student.findOneAndUpdate(
        { _id: student._id },
        student,
        { upsert: true, setDefaultsOnInsert: true }
    );

    // Execute the db request
    promise.exec(function(err, document) {
        if(err) {
            console.log(err);
        }

        // The returned document is empty if the student did not exist in the collection
        if(isEmpty(document)) {
        }
    });

    promise.then((res) => {
        console.log("Done uploading");
        console.log(res);
    });
}

// Returns true if passed object is empty
function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

module.exports = {
    sendStudent: sendStudent,
    interpretSchema: interpretSchema
}