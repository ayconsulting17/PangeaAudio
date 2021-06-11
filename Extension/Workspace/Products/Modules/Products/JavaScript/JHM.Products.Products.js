// Entry point for javascript creates a router to handle new routes and adds a view inside the Product Details Page

define(
	'JHM.Products.Products'
,   [
		'underscore'
	,	'jQuery'
	,	'JHM.Products.Item.KeyMapping'

	,	'Utils'
	]
,   function
	(
		_
	,	jQuery
	,	JHMProductsItemKeyMapping
	)
{
	'use strict';

	function getCategoryName(catArr)
	{
		var returnString = ''
		,	catObj;

		if(catArr && catArr.length) {

			catObj = catArr[0];

			if(catObj.hasOwnProperty('name') && catObj.name) {
				returnString = catObj.name;
			}
		}

		return returnString;
	}

	return  {

        JHMProductsItemKeyMapping: JHMProductsItemKeyMapping

	,	mountToApp: function mountToApp (container)
		{

            var PDP = container.getComponent('PDP')
			,	ProductDetailsFullView
			,	ManualsProductView
			,	StateComplianceWarningView;

            if(PDP) {

            	try {

            		ProductDetailsFullView = require('ProductDetails.Full.View');
                    ManualsProductView = require('Manuals.Product.View');
                    StateComplianceWarningView = require('StateComplianceWarning.View');

            		_.extend(ProductDetailsFullView.prototype, {

            			childViews: _.extend(ProductDetailsFullView.prototype.childViews, {

            				'Manuals': function() {

            					return new ManualsProductView({
									application: this.application
								,	id: this.model.get('item').get('internalid')
								});
							}

						,	'StateComplianceWarning': function() {

            					return new StateComplianceWarningView({
                                    application: this.application
								,	model: this.model.get('item')
								});
							}
						})

					,	toggleExpand: function(e)
                        {
                            e.preventDefault();

                            var $currTarget = jQuery(e.currentTarget)
                            ,	targetEl = $currTarget.attr('data-toggle-el')
							,	$target = this.$el.find('#' + targetEl)
							,	currText = $currTarget.text();

                            if($target.length) {
                                $currTarget.text(currText == 'See More' ? 'See Less' : 'See More');
                                $target.toggleClass('show');
							}
                        }

					,	events: _.extend({}, ProductDetailsFullView.prototype.events, {
                        	'click [data-action="toggle-expand"]': 'toggleExpand'
                    	})
					});


				} catch(e) {
            		console.warn('Error loading PDP: ', e);
				}

				try {

    				PDP.addToViewContextDefinition(PDP.PDP_FULL_VIEW, 'category', 'string', function(context) {

    					var item = context.model.item
						,	catObj = item.commercecategory
						,	primaryPath
						,	categories
						,	catString = '';

                        /**
						 * If primary path exists, get item's category from primary path. Otherwise, use first
						 * category that this item is assigned to.
                         */
    					if(catObj && !_.isEmpty(catObj)) {

    						primaryPath = catObj.primarypath;

							catString = getCategoryName(primaryPath);
							if(!catString) {

                                categories = catObj.categories;
								catString = getCategoryName(categories);
							}

						}

    					return catString;
					})

				} catch(e) {
                    console.warn('Error loading PDP: ', e);
				}


				try {

            		PDP.addToViewContextDefinition(PDP.PDP_FULL_VIEW, 'showDescToggle', 'boolean', function(context) {

                        var showDescToggle = false
						,	item = context.model.item
						,	description = item.storedetaileddescription;

                        if (description && description.length) {
                        	showDescToggle = true;
						}

                        return showDescToggle;
					})

				} catch(e) {
                    console.warn('Error loading PDP: ', e);
				}

			}


		}

	};
});
