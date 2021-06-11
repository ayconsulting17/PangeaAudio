define('JHM.Products.Item.KeyMapping'
,   [
        'Item.KeyMapping'
    ,   'underscore'
    ]
,   function
    (
        ItemKeyMapping
    ,   _
    )
{
    'use strict';

    try {

        _.extend(ItemKeyMapping, {

            getKeyMapping: _.wrap(ItemKeyMapping.getKeyMapping, function(fn, configuration) {

                var mapping = fn.apply(this, _.toArray(arguments).slice(1));

                _.extend(mapping, {

                    // @property {String}  _pageHeader h1 of the PDP and also the title of the modal
                    _pageHeader: ['displayname', 'storedisplayname2']

                ,   _pageTitle: ['displayname', 'pagetitle', 'storedisplayname2']

                ,   _name: function (item)
                    {
                        // If its a matrix child it will use the name of the parent
                        var item_id = item.get('itemid') || ''
                        ,   parent = item.get('_matrixParent')
                        ,   matches
                        ,   child_name;

                        if (parent.get('internalid'))
                        {
                            //we need the displayname included in the itemdid, see #B-11868
                            matches = item_id.match(/:(.*)/);
                            child_name = matches && matches[1];
                            return child_name || parent.get('displayname') || parent.get('storedisplayname2') || item_id;
                        }

                        // Otherwise return its own name
                        return item.get('displayname') || item.get('storedisplayname2') ||  item_id;
                    }
                });

                return mapping;
            })
        });

    } catch(e) {
        console.warn('Couldn\'t load key mapping ', e)
    }
});