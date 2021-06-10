<div id="dealers-page">
    <h1>Distributors & Dealers</h1>
    <ul id="dealers-legend">
        <li>P - Pangea Audio</li>
        <li>R - Record Doctor</li>
        <li>V - Vincent Audio</li>
    </ul>

    <h2>Distributors</h2>
    <div class="dealer-container">
        <div class="header">
            <div class="country">
                Country
            </div>
            <div class="company">
                Company
            </div>
            <div class="url">
                Web Address
            </div>
            <div>
                Telephone
            </div>
            <div class="brands">
                Brand
            </div>
        </div>
        {{#each distributors}}
            <div>
                <div class="country">
                    {{this.country}}
                </div>
                <div class="dealer-info-link company" data-action="show-dealer-info" data-dealer-type="distributors" data-id="{{this.id}}">
                    {{this.name}}
                </div>
                <div class="url">
                    {{#ifEquals this.url '- None -'}}
                        {{this.url}}
                    {{else}}
                        <a href="{{this.url}}" target="_blank">{{this.url}}</a>
                    {{/ifEquals}}
                </div>
                <div>
                    {{this.phone}}
                </div>
                <div class="brands">
                    {{this.brandCodes}}
                </div>
            </div>
        {{/each}}
    </div>

    <h2>Dealers</h2>
    <div class="dealer-container">
        <div class="header">
            <div class="country">
                State
            </div>
            <div class="company">
                Company
            </div>
            <div class="url">
                Web Address
            </div>
            <div>
                Telephone
            </div>
            <div class="brands">
                Brand
            </div>
        </div>
        {{#each dealers}}
        <div>
            <div class="country">
                {{this.state}}
            </div>
            <div class="dealer-info-link company" data-action="show-dealer-info" data-dealer-type="dealers" data-id="{{this.id}}">
                {{this.name}}
            </div>
            <div class="url">
                {{#ifEquals this.url '- None -'}}
                    {{this.url}}
                {{else}}
                    <a href="{{this.url}}" target="_blank">{{this.url}}</a>
                {{/ifEquals}}
            </div>
            <div>
                {{this.phone}}
            </div>
            <div class="brands">
                {{this.brandCodes}}
            </div>
        </div>
        {{/each}}
    </div>

</div>


<!--
  Available helpers:
  {{ getExtensionAssetsPath "img/image.jpg"}} - reference assets in your extension
  
  {{ getExtensionAssetsPathWithDefault context_var "img/image.jpg"}} - use context_var value i.e. configuration variable. If it does not exist, fallback to an asset from the extension assets folder
  
  {{ getThemeAssetsPath context_var "img/image.jpg"}} - reference assets in the active theme
  
  {{ getThemeAssetsPathWithDefault context_var "img/theme-image.jpg"}} - use context_var value i.e. configuration variable. If it does not exist, fallback to an asset from the theme assets folder
-->