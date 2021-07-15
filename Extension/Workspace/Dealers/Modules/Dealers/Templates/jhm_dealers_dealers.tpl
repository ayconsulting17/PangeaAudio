<div id="dealers-page">
    <div class="header-container">
    <h1 class="header-title">Where to Buy</h1>
    <p class="header-text"><b>Please click on company information for full details.</b></p>
    </div>

    <div class="dealers-expander-head">
	<div class="dealers-expander-head-toggle {{#unless showOpenedAccordion}}collapsed{{/unless}}" data-toggle="collapse" data-target="#dealers" aria-expanded="true" aria-controls="dealers">
	<h2>Dealers</h2><i class="dealers-expander-toggle-icon"></i>
	</div>
	</div>

    <div class="collapse {{#if showOpenedAccordion}}in{{/if}}" id="dealers" data-target="#dealers">

    <h4 style="margin-top:20px;">Domestic</h4>
    <div class="dealer-container">
        <div class="header">
            <div class="country">
                State
            </div>
            <div class="company">
                Company Information
            </div>
            <div class="url">
                Web Address
            </div>
            <div class="brands">
                Brand
            </div>
        </div>
        {{#each domestic}}
        <div>
            <div class="country">
                {{this.state}}
            </div>
            <div class="dealer-info-link company" data-action="show-dealer-info" data-dealer-type="domestic" data-id="{{this.id}}">
                {{this.name}}
            </div>
            <div class="url">
                {{#ifEquals this.webaddress '- None -'}}
                    {{this.webaddress}}
                {{else}}
                    <a href="{{this.webaddress}}" target="_blank">{{this.webaddress}}</a>
                {{/ifEquals}}
            </div>
            <div class="brands-value">
                {{this.custentity_dealer_brands}}
            </div>
        </div>
        {{/each}}
    </div>

    <h4>International</h4>
    <div class="dealer-container" style="margin-bottom:30px;">
        <div class="header">
            <div class="country">
                Country
            </div>
            <div class="company">
                Company Information
            </div>
            <div class="url">
                Web Address
            </div>
            <div class="brands">
                Brand
            </div>
        </div>
        {{#each international}}
            <div>
                <div class="country">
                    {{this.country}}
                </div>
                <div class="dealer-info-link company" data-action="show-dealer-info" data-dealer-type="international" data-id="{{this.id}}">
                    {{this.name}}
                </div>
                <div class="url">
                    {{#ifEquals this.webaddress '- None -'}}
                        {{this.webaddress}}
                    {{else}}
                        <a href="{{this.webaddress}}" target="_blank">{{this.webaddress}}</a>
                    {{/ifEquals}}
                </div>
                <div class="brands-value">
                    {{this.custentity_dealer_brands}}
                </div>
            </div>
        {{/each}}
    </div>
	</div>

    
    
    <div class="dealers-expander-head">
	<div class="dealers-expander-head-toggle {{#unless showOpenedAccordion}}collapsed{{/unless}}" data-toggle="collapse" data-target="#distributor" aria-expanded="true" aria-controls="distributor">
	<h2>Distributor</h2><i class="dealers-expander-toggle-icon"></i>
	</div>
	</div>

    <div class="collapse {{#if showOpenedAccordion}}in{{/if}}" id="distributor" data-target="#distributor">

    <div class="dealer-container">
        <div class="header">
            <div class="country">
                Country
            </div>
            <div class="company">
                Company Information
            </div>
            <div class="url">
                Web Address
            </div>
            <div class="brands">
                Brand
            </div>
        </div>
        {{#each distributor}}
        <div>
            <div class="country">
                {{this.country}}
            </div>
            <div class="dealer-info-link company" data-action="show-dealer-info" data-dealer-type="distributor" data-id="{{this.id}}">
                {{this.name}}
            </div>
            <div class="url">
                {{#ifEquals this.webaddress '- None -'}}
                    {{this.webaddress}}
                {{else}}
                    <a href="{{this.webaddress}}" target="_blank">{{this.webaddress}}</a>
                {{/ifEquals}}
            </div>
            <div class="brands-value">
                {{this.custentity_dealer_brands}}
            </div>
        </div>
        {{/each}}
    </div>
</div>
</div>


<div data-cms-area="dealers_cms_area_1" data-cms-area-filters="path"></div>


<!--
  Available helpers:
  {{ getExtensionAssetsPath "img/image.jpg"}} - reference assets in your extension
  
  {{ getExtensionAssetsPathWithDefault context_var "img/image.jpg"}} - use context_var value i.e. configuration variable. If it does not exist, fallback to an asset from the extension assets folder
  
  {{ getThemeAssetsPath context_var "img/image.jpg"}} - reference assets in the active theme
  
  {{ getThemeAssetsPathWithDefault context_var "img/theme-image.jpg"}} - use context_var value i.e. configuration variable. If it does not exist, fallback to an asset from the theme assets folder
-->




