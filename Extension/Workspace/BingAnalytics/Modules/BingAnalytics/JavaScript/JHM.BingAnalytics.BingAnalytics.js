/*
	© 2018 JHM Services
*/

//@module BingAnalytics
(function (win, name)
{
    'use strict';

    //@class BingAnalytics @extends ApplicationModule
    // ------------------
    // Loads Bing analytics script and extends application with methods:
    // * trackPageview
    // * trackEvent
    // * trackTransaction
    // Also wraps layout's showInModal
    define('JHM.BingAnalytics.BingAnalytics'
	,	[
        	'Tracker'
		,	'underscore'
		,	'jQuery'
		,	'Backbone'
		,	'Utils'
        ]
        ,	function
		(
            Tracker
		,	_
		,	jQuery
		,	Backbone
		,	Utils
        )

        {
            var BingAnalytics = {

                //@method trackPageview
                //@param {String} url
                //@return {BingAnalytics}
                trackPageview: function (url)
                {
                    if (_.isString(url))
                    {
                        win[name] = win[name] || [];
                        win[name].push({'ea': 'page_view', 'el': url});
                    }

                    return this;
                }

            ,   doCallback: function()
                {
                    return false;
                }

                //@method trackEvent
                //@param {TrackEvent} event
                //@return {BingAnalytics}
                ,	trackEvent: function (event)
                {
                    if (event && event.category && event.action)
                    {
                        win[name] = win[name] || [];
                        win[name].push({'ea': event.action, 'el': event.category});
                    }

                    return this;
                }

                //@method addItem
                //@param {Object<String:id,String:name>} item
                //@return {BingAnalytics}
                ,	addItem: function (item)
                {
                    if (item && item.id)
                    {
                        win[name] = win[name] || [];
                        win[name].push({'ea': 'add_to_cart', 'el': item.id});

                    }

                    return this;
                }

                ,	trackTransaction: function(transaction)
                {
                    var subtotal = transaction.get('total');

                    win[name] = win[name] || [];
                    win[name].push({'gv': subtotal, 'ea': 'purchase', 'el' : 'purchase', 'ev' : subtotal, 'gc': 'USD'});
                }

                //@method setAccount
                //@param {SC.Configuration} config
                //@return {Void}
                ,	setAccount: function (config)
                {
                    if(!config)
                    {
                        return this;
                    }
                    var domainName = Utils.isCheckoutDomain() ? config.domainNameSecure : config.domainName;

                    if (_.isString(config.propertyID) && _.isString(domainName))
                    {
                        this.propertyID = config.propertyID;
                        this.ti = config.propertyID;
                        this.domainName = domainName;

                        var f, n, i;
                        win[name] = win[name] || [], f = function() {
                            var o = {
                                ti: config.propertyID
                            };
                            o.q = win[name], win[name] = new UET(o), win[name].push("pageLoad")
                        }, n = document.createElement('script'), n.src = '//bat.bing.com/bat.js', n.async = 1, n.onload = n.onreadystatechange = function() {
                            var s = this.readyState;
                            s && s !== "loaded" && s !== "complete" || (f(), n.onload = n.onreadystatechange = null)
                        }, i = document.getElementsByTagName('script')[0], i.parentNode.insertBefore(n, i);
                    }

                    return this;
                }

                //@method loadScript
                //@return {jQuery.Promise|Void}
                ,	loadScript: function (config)
                {
                    return !SC.isPageGenerator() && jQuery.getScript('//bat.bing.com/bat.js');
                }

                //@method mountToApp
                //@param {ApplicationSkeleton} application
                //@return {Void}
                ,	mountToApp: function (application)
                {
                    // we get the account and domain name from the configuration file
                    var tracking = application.getConfig('tracking.bingAnalytics');
                    // TODO: Test only
                    // var tracking = {
                    // 	propertyID: '13000038'
                    // ,	domainName: 'http://my-site.jhmservices.net/'
                    // ,	domainNameSecure: 'https://checkout.sandbox.netsuite.com/c.12345/my-site/checkout.ssp'
                    // };

                    // if track page view needs to be tracked
                    if (tracking && tracking.propertyID)
                    {
                        BingAnalytics.setAccount(tracking);

                        Tracker.getInstance().trackers.push(BingAnalytics);
                    }
                }
            };

            return BingAnalytics;
        });
})(window, 'uetq');
