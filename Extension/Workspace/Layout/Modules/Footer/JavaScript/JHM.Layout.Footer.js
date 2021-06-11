// Entry point for javascript creates a router to handle new routes and adds a view inside the Product Details Page

define(
	'JHM.Layout.Footer'
,   [
		'SC.Configuration'
	,	'jQuery'
	,	'Utils'
	,	'underscore'
	,	'Profile.Model'
	]
,   function (
		Configuration
	,	jQuery
	,   Utils
	,   _
	,	ProfileModel
	)
{
	'use strict';

	try {
		var SimplifiedFooterView = require('Footer.Simplified.View');

        if(SimplifiedFooterView) {

            _.extend(SimplifiedFooterView.prototype, {

                getContext: _.wrap(SimplifiedFooterView.prototype.getContext, function(fn) {

                    var returnVariable = fn.apply(this, _.toArray(arguments).slice(1));

                    _.extend(returnVariable, {
                        company: Configuration.get('footer.company', '')
					,	year: new Date().getFullYear()
                    });	// End extend

					return returnVariable;
                }) // End getContext

            }) // End extend view

        }

	} catch(e) {
        console.log('Couldn\'t load FooterSimplifiedView. ' +  e);
	}

	try {

		var FooterView = require('Footer.View');

		if(FooterView) {

            _.extend(FooterView.prototype, {

                getContext: _.wrap(FooterView.prototype.getContext, function(fn) {

                    var profile = ProfileModel.getInstance()
					,	isLoading = !_.getPathFromObject(Configuration, 'performance.waitForUserProfile', true) && ProfileModel.getPromise().state() !== 'resolved'
					,	isLoggedIn = (profile.get('isLoggedIn') === 'T' || profile.get('isRecognized') === 'T') && profile.get('isGuest') === 'F'
					,	returnVariable = fn.apply(this, _.toArray(arguments).slice(1))
					,	showLogin = true;

                    if(!isLoading && isLoggedIn) {
                        showLogin = false;
                    }

                    _.extend(returnVariable, {
                        phone: Configuration.get('footer.phone', '')
					,	fax: Configuration.get('footer.fax', '')
					,	email: Configuration.get('footer.email', '')
					,	address1: Configuration.get('footer.address1', '')
					,	address2: Configuration.get('footer.address2', '')
					,	showLogin: showLogin
					,	company: Configuration.get('footer.company', '')
                    });

                    return returnVariable;
                })

			,	initialize: _.wrap(FooterView.prototype.initialize, function(fn, options) {

                    var self = this;

                    fn.apply(this, _.toArray(arguments).slice(1));

                    ProfileModel.getPromise().done(function()
                    {
                        self.render();
                    });
                })
            })
		}

	} catch(e) {
        console.log('Couldn\'t load FooterView. ' + e);
	}

	return  {
		mountToApp: function mountToApp (container)
		{


		}
	};
});
