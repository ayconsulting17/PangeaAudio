/**
 *@NApiVersion 2.0
 *@NScriptType Suitelet
 */

/**
 * Company            JHM Services LLC
 * Type               Suitelet
 * ID				  customscript_jhm_sl_get_dealers
 * Deployments		  customdeploy_jhm_sl_get_dealers
 * Description        Retrieves dealers/distributors
 * Governance
 * Changelog          JHM Services      3-22-19    Created script
 *                    JHM Services      4-26-19    Revised to accommodate adding group summaries to search, retrieve
 *                                                 bill address fields instead of address fields
 *                    JHM Services      5-20-19    Added Dealer Brands field to search results

 **/

 define(['N/search', 'N/log'],

 function(search, log) {

     var rolesMap = {
         1010: 'dealers'
     ,   1011: 'distributors'
     }

     ,   statesMap = {
         'AL': 'Alabama',
         'AK': 'Alaska',
         'AA': 'Armed Forces Americas',
         'AE': 'Armed Forces Europe',
         'AP': 'Armed Forces Pacific',
         'AS': 'American Samoa',
         'AZ': 'Arizona',
         'AR': 'Arkansas',
         'CA': 'California',
         'CO': 'Colorado',
         'CT': 'Connecticut',
         'DE': 'Delaware',
         'DC': 'District Of Columbia',
         'FM': 'Federated States Of Micronesia',
         'FL': 'Florida',
         'GA': 'Georgia',
         'GU': 'Guam',
         'HI': 'Hawaii',
         'ID': 'Idaho',
         'IL': 'Illinois',
         'IN': 'Indiana',
         'IA': 'Iowa',
         'KS': 'Kansas',
         'KY': 'Kentucky',
         'LA': 'Louisiana',
         'ME': 'Maine',
         'MH': 'Marshall Islands',
         'MD': 'Maryland',
         'MA': 'Massachusetts',
         'MI': 'Michigan',
         'MN': 'Minnesota',
         'MS': 'Mississippi',
         'MO': 'Missouri',
         'MT': 'Montana',
         'NE': 'Nebraska',
         'NV': 'Nevada',
         'NH': 'New Hampshire',
         'NJ': 'New Jersey',
         'NM': 'New Mexico',
         'NY': 'New York',
         'NC': 'North Carolina',
         'ND': 'North Dakota',
         'MP': 'Northern Mariana Islands',
         'OH': 'Ohio',
         'OK': 'Oklahoma',
         'OR': 'Oregon',
         'PW': 'Palau',
         'PA': 'Pennsylvania',
         'PR': 'Puerto Rico',
         'RI': 'Rhode Island',
         'SC': 'South Carolina',
         'SD': 'South Dakota',
         'TN': 'Tennessee',
         'TX': 'Texas',
         'UT': 'Utah',
         'VT': 'Vermont',
         'VI': 'Virgin Islands',
         'VA': 'Virginia',
         'WA': 'Washington',
         'WV': 'West Virginia',
         'WI': 'Wisconsin',
         'WY': 'Wyoming'
     };

     function onRequest(context) {

         var ret = {}
         ,   dealerSearch
         ,   currDealer;

         ret.status = 200;
         ret.results = {};
         ret.results.dealers = [];
         ret.results.distributors = [];

         try {

             dealerSearch = search.load({id: 'customsearch_jhm_dealer_dist_cust_search'});
             dealerSearch.run().each(function(result) {

                 currDealer = {};
                 currDealer.email = result.getValue({name: 'email', summary: 'GROUP'});
                 currDealer.name = result.getValue({name: 'altname', summary: 'GROUP'});
                 currDealer.phone = result.getValue({name: 'formulatext', summary: 'GROUP'});
                 currDealer.country = result.getValue({name: 'billcountry', summary: 'GROUP'});
                 currDealer.state = statesMap[result.getValue({name: 'billstate', summary: 'GROUP'})] ||
                         result.getValue({name: 'billstate', summary: 'GROUP'});
                 currDealer.url = result.getValue({name: 'url', summary: 'GROUP'});
                 currDealer.city = result.getValue({name: 'billcity', summary: 'GROUP'});
                 currDealer.address1 = result.getValue({name: 'billaddress1', summary: 'GROUP'});
                 currDealer.address2 = result.getValue({name: 'billaddress2', summary: 'GROUP'});
                 currDealer.zipcode = result.getValue({name: 'billzipcode', summary: 'GROUP'});
                 currDealer.id = result.getValue({name: 'entityid', summary: 'GROUP'});
                 currDealer.custentity_dealer_brands = result.getText({name: 'custentity_dealer_brands', summary: 'GROUP'});

                 ret.results[rolesMap[result.getValue({name: 'role', summary: 'GROUP'})]].push(currDealer);

                 return true;
             });


         } catch(e) {

             log.error({title: 'Dealers service: Error retrieving dealers', details: e});
             ret.status = 400;
         }

         context.response.setHeader('Content-Type', 'application/json');
         context.response.write(JSON.stringify(ret));
     }


     return {
         onRequest: onRequest
     }
 }
);