
define(
	'JHM.DynamicSearchCategory.DynamicSearchCategory'
,   [
        'Facets.Browse.View'
	,	'Facets.Helper'
	,	'Facets.Model'
	,	'Categories'
	,	'Categories.Model'
	,	'AjaxRequestsKiller'
	,	'Profile.Model'
	,	'underscore'
	,	'Backbone'
	,	'jQuery'
	,	'SC.Configuration'
    ,   'JHM.DynamicSearchCategory.DynamicSearchCategory.Model'
    ,   'Categories.Utils'

	]
,   function
	(
        BrowseView
	,	Helper
	,	Model
	,	Categories
	,	CategoriesModel
	,	AjaxRequestsKiller
	,	ProfileModel
	,	_
	,	Backbone
	,	jQuery
	,	Configuration
    ,   DynamicSearchCategoryModel
    ,   CategoriesUtils

	)
{
	'use strict';

    /**
     * This customization restricts when category description is displayed. Client has this value set on all
     * categories, but doesn't want it to display anywhere but on our dynamic search categories (?). Here, we will
     * check for a property that we set on dynamic search categories, and the description will only display when
     * our new flag is present and true.
     */
	try {
	    var FacetsBrowseCategoryHeadingView = require('Facets.Browse.CategoryHeading.View');

	    if (FacetsBrowseCategoryHeadingView) {

	        _.extend(FacetsBrowseCategoryHeadingView.prototype, {

                getContext: function ()
                {
                    var additionalFields = CategoriesUtils.getAdditionalFields(this.model.attributes, 'categories.category.fields')
                    ,   showDescription = false
                    ,   modelShowDescription = this.model.get('showDescription');

                    if (modelShowDescription && modelShowDescription == true) {
                        showDescription = true;
                    }


                    return {
                        // @property {String} name
                        name: this.model.get('name')
                        // @property {String} banner
                    ,	banner: this.model.get('pagebannerurl')
                        // @property {String} description
                    ,	description: this.model.get('description')
                        // @property {String} pageheading
                    ,	pageheading: this.model.get('pageheading') || this.model.get('name')
                        // @property {Boolean} hasBanner
                    ,	hasBanner: !!this.model.get('pagebannerurl')
                        // @property {Object} additionalFields
                    ,	additionalFields: additionalFields
                        // @property {Boolean} showDescription
                    ,	showDescription: showDescription
                    };
                }
            });
        }

    } catch(e) {
        console.log('Couldn\'t load Facets.Browse.CategoryHeading.View. ' + e);
    }

	try {

		var FacetsRouter = require('Facets.Router');

		_.extend(FacetsRouter.prototype, {

            showPage: function (isCategoryPage) {
                var self = this
                ,   facetModel = new Model()
                ,   fullurl = Backbone.history.fragment
                ,   translator = Helper.parseUrl(fullurl, this.translatorConfig, isCategoryPage)
                ,   categoryModel
                ,   categorySavedSearch
                ,   categoryPromise
                ,   facetPromise
                ,   dynamicCatModel
                ,   dynamicCatModelPromise
                ,   overrideCategoryResults = false
                ,   categoryUrl
                ,   origTransOptions
                ,   dynamicCatModelIds
                ,   dynamicCatTranslator
                ,   dynamicCatFacetModel
                ,   dynamicCatFacetPromise
                ,   swapItemsFlag = false
                ,   currApiParams
                ,   browseViewData;

                // Set up and fetch category first
                if (isCategoryPage) {

                    categoryModel = new CategoriesModel();

                    categoryUrl = translator.getCategoryUrl();
                    categoryUrl = this.cleanFullUrl(categoryUrl);

                    categoryModel.options = {
                        data: {'fullurl': categoryUrl}
                    ,   killerId: AjaxRequestsKiller.getKillerId()
                    };

                    // Promises are returned wrapped in an array here, hence the syntax
                    categoryPromise = jQuery.apply(null, _.invoke([categoryModel], 'fetch', {}))[0];
                }

                // Once we have category (or this is not a category), it's safe to proceed
                jQuery.when(categoryPromise).done(function () {

                    if (ProfileModel.getInstance().hidePrices()) {
                        translator = translator.cloneWithoutFacetId('onlinecustomerprice');
                        Backbone.history.navigate(translator.getUrl());
                    }

                    // If this is a category, see if it has an associated saved search, and fetch results if it does
                    if (isCategoryPage) {

                        facetModel.set('category', categoryModel);

                        categorySavedSearch = categoryModel.get('custrecord_jhm_category_saved_search_id');
                        if (categorySavedSearch) {

                            dynamicCatModel = new DynamicSearchCategoryModel();
                            dynamicCatModelPromise = dynamicCatModel.fetch({data: {search: categorySavedSearch}});
                        }
                    }

                    // When saved search results return (or are not applicable), it's safe to proceed
                    jQuery.when(dynamicCatModelPromise).then(function() {

                        // If this cat has an associated search, get items from search and set on translator
                        if (categorySavedSearch) {

                            overrideCategoryResults = dynamicCatModel.get('overrideCategoryResults');

                            if (overrideCategoryResults) {

                                // Clone translator with 3rd param set to false and clone again with our new facet
                                /**
                                 * We need to force the item API to return the items that are returned from the search
                                 * associated with this category (rather than relying on search parameters). Some
                                 * categories will have more items than can be displayed on one page, so we will
                                 * need to handle pagination. If we just swap out the facets model with a new one that
                                 * only has one page worth of items, then we will lose pagination controls and the item
                                 * count will be incorrect. To get around this, we are triggering two searches here,
                                 * one with the full set and one with the set for just this page. Right before we
                                 * call showContent on the view, we will swap the item collection from our full
                                 * set with the item collection from our restricted set.
                                 */
                                translator = Helper.parseUrl(self.cleanFullUrl(fullurl), self.translatorConfig, false);
                                dynamicCatTranslator = Helper.parseUrl(self.cleanFullUrl(fullurl), self.translatorConfig, false);
                                currApiParams = translator.getApiParams();

                                dynamicCatModelIds = self.refineDynamicCatIds(dynamicCatModel.get('itemIds'), currApiParams);

                                // Translator page option gets lost in clone operation; save and reset
                                origTransOptions = translator.options;

                                // Setting up two translators to avoid weird issues that appear if they share
                                translator = translator.cloneForFacetId('id', dynamicCatModel.get('itemIds'));
                                dynamicCatTranslator = dynamicCatTranslator.cloneForFacetId('id', dynamicCatModelIds);

                                translator.options = origTransOptions;
                                dynamicCatTranslator.options = origTransOptions;

                                // We don't show the category description on any categories except our dynamic ones
                                categoryModel.set('showDescription', true);

                                dynamicCatFacetModel = new Model();
                                dynamicCatFacetModel.options = {
                                    data: dynamicCatTranslator.getApiParams()
                                ,   killerId: AjaxRequestsKiller.getKillerId()
                                ,   pageGeneratorPreload: true
                                };

                                dynamicCatFacetPromise = jQuery.apply(null, _.invoke([dynamicCatFacetModel], 'fetch', {}))[0];
                                swapItemsFlag = true;
                            }
                        }

                        facetModel.options = {
                            data: translator.getApiParams()
                        ,   killerId: AjaxRequestsKiller.getKillerId()
                        ,   pageGeneratorPreload: true
                        };

                        facetPromise = jQuery.apply(null, _.invoke([facetModel], 'fetch', {}))[0];

                        // If we don't have both promises here, the facet fetch fails @ Layout.showLayout()
                        jQuery.when(facetPromise, categoryPromise, dynamicCatFacetPromise)
                            .then(function (facetResponse) {

                                facetResponse = isCategoryPage ? facetResponse[0] : facetResponse;

                                if (facetResponse.corrections && facetResponse.corrections.length > 0) {
                                    var unaliased_url = self.unaliasUrl(fullurl, facetResponse.corrections);

                                    if (SC.ENVIRONMENT.jsEnvironment === 'server') {
                                        nsglobal.statusCode = 301;
                                        nsglobal.location = '/' + unaliased_url;
                                    }
                                    else {
                                        Backbone.history.navigate('#' + unaliased_url, {trigger: true});
                                    }
                                }
                                else {

                                    browseViewData = {
                                        translator: translator
                                    ,   translatorConfig: self.translatorConfig
                                    ,   application: self.application
                                    ,   model: facetModel
                                    ,   isDynamicCategory: swapItemsFlag
                                    };

                                    if (swapItemsFlag) {
                                        browseViewData.title = 'Brand > ' + categoryModel.get('name')
                                    }

                                    var view = new BrowseView(browseViewData);

                                    // Swap out full set of items with restricted set, while retaining other values on model
                                    if (swapItemsFlag) {
                                        facetModel.attributes.items.models = dynamicCatFacetModel.attributes.items.models;
                                        facetModel.attributes.items.length = dynamicCatFacetModel.attributes.items.models.length;
                                    }

                                    translator.setLabelsFromFacets(facetModel.get('facets') || []);
                                    view.showContent();
                                }
                            })
                            .fail(function (jqXhr) {
                                if (jqXhr.status === 404) {
                                    self.application.getLayout().notFound();
                                }
                            });

                    });

                });
            }

            /**
             * When we clone the translator with our new ID facet, it adds them to the URL; however, if they're in
             * the URL on subsequent calls, it causes the item API service call to choke. Here, we strip them.
             * @param url
             * @returns {*}
             */
        ,   cleanFullUrl: function(url)
            {
                /**
                 * Regex: Captures '/id/' followed immediately by zero or more digits and/or commas and removes it.
                 * For example:
                 * /brands/pangea-audio/id/120,121,122?offset=24
                 * becomes
                 * /brands/pangea-audio?offset=24
                 */
                return url.replace(/\b\/id\/(?:\d+,*)+/g, '');
            }

            /**
             * Accepts string with list of ALL item IDs for a given dynamic category and pares it down to one page
             * worth of items for the given page.
             * @param items
             * @param params
             * @returns {string}
             */
        ,   refineDynamicCatIds: function(items, params)
            {
                var origItemArr = items.split(',')
                ,   newItemArr;

                newItemArr = origItemArr.slice(parseInt(params.offset, 10), (parseInt(params.limit, 10) + parseInt(params.offset, 10)));

                return newItemArr.toString();
            }

		});

	} catch(e) {
        console.log('Couldn\'t load Facets.Router. ' + e);
	}

	try {

	    var FacetsBrowseView = require('Facets.Browse.View')
        ,   FacetsFacetsDisplayView = require('Facets.FacetsDisplay.View');

	    _.extend(FacetsBrowseView.prototype, {

	        childViews: _.extend(FacetsBrowseView.prototype.childViews, {

                'Facets.FacetsDisplay': function()
                {
                    var facets = this.translator.cloneWithoutFacetId('category').getAllFacets().sort(function (a, b) {
                        return b.config.priority - a.config.priority;
                    });

                    return new FacetsFacetsDisplayView({
                        facets: facets
                    ,	translator: this.translator
                    ,   categoryModel: this.model.get('category')
                    });
                }
            })

        ,   initialize: _.wrap(FacetsBrowseView.prototype.initialize, function(fn, options)
            {
                fn.apply(this, _.toArray(arguments).slice(1));

                if (options.hasOwnProperty('title') && options.title) {
                    this.title = options.title;
                }

            })

        ,   getContext: _.wrap(FacetsBrowseView.prototype.getContext, function(fn)
            {
                var resultsObj = fn.apply(this, _.toArray(arguments).slice(1))
                ,   displayFacetNavigation = true;

                if (this.options.hasOwnProperty('isDynamicCategory')) {
                    displayFacetNavigation = !this.options.isDynamicCategory
                }

                _.extend(resultsObj, {
                    displayFacetNavigation: displayFacetNavigation
                });

                return resultsObj;
            })
        });

        _.extend(FacetsFacetsDisplayView.prototype, {

            getContext: function ()
            {
                var facets = this.options.facets
                ,	translator = this.options.translator
                ,   categoryModel = this.options.categoryModel
                ,   displayFacets = true;

                _.each(facets, function(facet) {
                    facet.value = _.isArray(facet.value) ? facet.value : [facet.value];
                });

                var facet_values = [];

                _.each(facets, function(facet) {
                    _.each(facet.value, function(value) {
                        var value_data = {
                            facetValueIsObject: _.isObject(value)
                        ,	from: _.isObject(value) ? _.formatCurrency(value.from) : ''
                        ,	to: _.isObject(value) ? _.formatCurrency(value.to) : ''
                        ,	valueLabel: translator.getLabelForValue(facet.id, value)
                        ,	facetValueUrl: translator.cloneForFacetId(facet.id, value).getUrl()
                        ,	facetValue: facet.value
                        };

                        facet_values.push(value_data);
                    });
                });

                // If this property is present and true, this is a dynamic search category; hide facets display
                if (categoryModel && categoryModel.get('showDescription')) {
                    displayFacets = false;
                }

                // @class Facets.FacetsDisplay.View.Context
                return {

                    // @property {Boolean} hasFacets
                    hasFacets: facets.length > 0

                    // @property {String} clearAllFacetsLink
                ,	clearAllFacetsLink: translator.cloneWithoutFacets().getUrl()

                    // @property {Array} values
                ,	values: facet_values
                ,   displayFacets: displayFacets
                };
                // @class Facets.FacetsDisplay.View
            }
        })


    } catch(e) {
        console.log('Couldn\'t load Facets.Browse.View. ' + e);
    }



	return  {
		mountToApp: function mountToApp (container)
		{

		}
	};
});
