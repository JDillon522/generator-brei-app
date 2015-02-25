'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var brei = require('brei-junk');

var BreiAppGenerator = yeoman.generators.Base.extend({
	initializing: function () {
		this.pkg = require('../../package.json');
	},

	prompting: function () {
		var done = this.async();

		var prompts = [{
			type: 'input',
			name: 'partialName',
			message: 'Partial name ("_green-button", "header-logo")',
			default: ''
		}];

		this.prompt(prompts, function (props) {
			this.someOption = props.someOption;

			var partialName = props.partialName;

			// Remove the first _ (or __)
			if (/^_/.test(partialName)) {
				partialName = partialName.replace(/^_+/, '');
			}
			// Change all whitespace to -
			if (/\s/g.test(partialName)) {
				partialName = partialName.replace(/\s/, '-');
			}
			// Change all remaining _ to -
			if (/_/g.test(partialName)) {
				partialName = partialName.replace(/_/g, '-');
			}
			// Remove any file extensions
			if (/\..+/.test(partialName)) {
				partialName = partialName.replace(/\..+/, '');
			}

			this.partialName = partialName;

			done();
		}.bind(this));
	},

	writing: {
		hbs: function () {
			this.template('partial.hbs', 'app/assemble/partials/' + this.partialName + '.hbs');
		},

		scss: function () {
			this.template('partial.scss', 'app/sass/partials/_' + this.partialName + '.scss');
		},

		// mainScss: function () {
		//	??
		// }
	}
});

module.exports = BreiAppGenerator;