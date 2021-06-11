// Entry point for javascript creates a router to handle new routes and adds a view inside the Product Details Page

define(
	'JHM.Layout.Layout'
,   [
		'JHM.Layout.Footer'
	,	'JHM.Layout.Home'
	,	'underscore'

	,	'Utils'
	]
,   function (
		LayoutFooter
	,	LayoutHome
	,	_

    ,   Utils
	)
{
	'use strict';

    /**
     * There is an issue that appeared with 2018.2 where the loading icon that gets added during ajax requests is
     * broken. For some reason, themeAssetsPath in My Acct and Checkout returns as the string 'themeAssetsPath',
     * which generates an invalid URL. Appears to be some sort of race condition that manifests in jQuery.ajaxSetup?
     *
     * This override is the same as the original method, but doesn't set themeAssetsPath as file if it equals
     * 'themeAssetsPath'.
     */
        try {
            _.mixin({
                getThemeAbsoluteUrlOfNonManagedResources: function (default_value, file) {

                    var themeAssetsPath = '';

                    if (!file) {

                        file = '';
                        if (SC.ENVIRONMENT.isExtended) {

                            themeAssetsPath = SC.ENVIRONMENT.themeAssetsPath;

                            if (themeAssetsPath && themeAssetsPath != 'themeAssetsPath') {
                                file = themeAssetsPath;
                            }
                        }
                        else if (SC.ENVIRONMENT.BuildTimeInf && SC.ENVIRONMENT.BuildTimeInf.isSCLite) {

                            if (SC.CONFIGURATION.unmanagedResourcesFolderName) {
                                file = 'site/' + SC.CONFIGURATION.unmanagedResourcesFolderName + '/';
                            }
                            else {
                                file = 'default/';
                            }
                        }

                        file += default_value;
                    }

                    var absoulute_path = Utils.getAbsoluteUrl('');

                    return file.indexOf(absoulute_path) !== 0 ? Utils.getAbsoluteUrl(file) : file;
                }
            });

        } catch(e) {
            console.log('Couldn\'t augment Underscore Utils ' +  e);
        }

    /**
     * Remove Home from sidebar navigation, since we have always-visible home link - don't want two
     */

    try {
    	var HeaderMenuView = require('Header.Menu.View')
		,	returnVariable
		,	sidebarCategories;

        if (HeaderMenuView) {

            _.extend(HeaderMenuView.prototype, {

                getContext: _.wrap(HeaderMenuView.prototype.getContext, function(fn) {

                    returnVariable = fn.apply(this, _.toArray(arguments).slice(1));

                    sidebarCategories = _.filter(returnVariable.categories, function(category) {
                        return category.text.toLowerCase() != 'home';
                    });

                    returnVariable.sidebarCategories = sidebarCategories || [];
                    return returnVariable;
                })
            })
        }
    } catch(e) {
        console.warn('Could not load HeaderMenuView ', e);
    }

    /**
     * Revising main navigation so that categories can be automagically displayed as level 2 links (not level 1)
     */
    try {
    	var Categories = require('Categories')
        ,   Configuration = require('SC.Configuration')
        ,   CategoriesUtils = require('Categories.Utils');

    	if (Categories) {

            Categories.addToNavigationTabs = function(categories)
            {
                if (Configuration.get('categories.addToNavigationTabs'))
                {
                    var self = this
					,	navigationData = Configuration.get('navigationData')
					,	index = -1;

                    // delete previews categories on the menu
                    var lastIndex = navigationData.length;

                    while(lastIndex--)
                    {
                        if (navigationData[lastIndex]['data-type'] === 'commercecategory')
                        {
                            navigationData.splice(lastIndex, 1);
                        }
                    }

                    for (var i = 0; i < navigationData.length; i++)
                    {
                        if (navigationData[i].placeholder === 'Categories')
                        {
                            index = i;
                            navigationData[i].text = 'Product Categories';  // TODO: Test
                            break;
                        }
                    }

                    if (index !== -1)
                    {
                        var tabs = self.makeNavigationTab(categories);

                        _.each(tabs, function(tab, position)
                        {
                            navigationData[index].categories = tabs;
                        });
                    }

                    this.application.trigger('Configuration.navigationData');
                }
            };

            Categories.makeNavigationTab = function(categories)
            {
                var result = []
                ,	self = this;

                _.each(categories, function (category)
                {
                    var href = category.fullurl

                    ,	tab = {
                        'href': href
                        ,	'text': category.name
                        ,	'data':
                            {
                                hashtag: '#' + href
                            ,	touchpoint: 'home'
                            }
                        ,	'class': 'header-menu-level' + (parseInt(category.level, 10) + 1) + '-anchor'
                        ,	'data-type': 'commercecategory'
                    };

                    tab.additionalFields = CategoriesUtils.getAdditionalFields(category, 'categories.menu.fields');

                    if (category.categories)
                    {
                        tab.categories = self.makeNavigationTab(category.categories);
                    }

                    result.push(tab);
                });

                return result;
            }

		} // End if categories


	} catch(e) {
        console.warn('Could not load Categories module ', e);
	}

	return  {

		LayoutFooter: LayoutFooter

	,	LayoutHome: LayoutHome

	,	mountToApp: function mountToApp (container)
		{
            var application = container.getLayout().application
			,	productListModule;

			// Remove wishlist from the My Account menu
			try {

                if(application.name == 'MyAccount') {

                    productListModule = application.ProductListModule;

                    productListModule.MenuItems = function() {
                        return undefined;
                    }
                }

			} catch(e) {
                console.warn('Error updating My Account MenuItems method: ', e);
			}

			// Reset mobile sidebar nav when home permalink is clicked
            try {

                var HeaderMenuView = require('Header.Menu.View');

                if (HeaderMenuView) {

                    _.extend(HeaderMenuView.prototype, {

                        events: _.extend(HeaderMenuView.prototype.events, {
                            'click .sidebar-home-link': 'resetSidebarMenu'
                        })

                        ,   resetSidebarMenu: function() {

                            this.$el.find('li.header-sidebar-menu-path.header-sidebar-menu-opened, li.header-sidebar-menu-path')
                                .removeClass('header-sidebar-menu-path header-sidebar-menu-opened');

                            this.$el.find('ul.header-sidebar-menu').css({'height': 'auto'});
                            this.$('[data-type="header-sidebar-menu"]').sidebarMenu();
                        }
                    })
                }

            } catch(e) {
                console.warn('Could not load Header module ', e);
            }
		}
	};
});
