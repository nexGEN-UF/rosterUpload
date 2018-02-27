
var mongoose = require('mongoose');

var studentsSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
	major: String,
	personal_statement: String,
	head_shot: String,
	pillar: [{
		semester_joined: String,
		semester_left: String,
		title: String
	}],
  positions: [String],
  email: [String],
	phone: String,
	profile_links: {
		linkedin_url: String,
		twitter: String,
		resume_link: String,
		github_link: String,
		personal_website: String,
		facebook: String
	},
  isAlumni: Boolean,
  isGraduating: Boolean,
	isHired: Boolean,
  current_employment: {
		employer: String,
		job_title: String
	},
  isPlaced: Boolean,
	PlacedAt: String,
	skills: [String],
	project_assignments: [String]
});

var Student = mongoose.model('Student', studentsSchema);
module.exports = Student;