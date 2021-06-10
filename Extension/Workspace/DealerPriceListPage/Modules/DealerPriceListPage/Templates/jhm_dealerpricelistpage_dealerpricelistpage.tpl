<div class="dealer-price-list">

    <h2>{{dealerType}} Price Lists</h2>
    <p>{{pageText}}</p>

    <ul>

        {{#each fileDisplayArr}}
            <li>

                {{#if displayLink}}
                    <a href="{{url}}" class="manual-link" data-navigation="ignore-click"  target="_blank">
                        <i class="file-icon"></i>
                        <span class="filename">{{name}}</span>
                        <span class="filesize">{{size}}</span>
                    </a>
                {{else}}

                <div class="disabled-link-wrapper">
                    <div class="manual-link-disabled" data-action="trigger-custom-tooltip">
                        <i class="file-icon"></i>
                        <span class="filename">{{name}}</span>
                        <span class="filesize">{{size}}</span>
                    </div>

                    <div class="custom-tooltip">
                        <p class="custom-tooltip-header">Sorry, you don't have access to this price list.</p>
                        <p class="custom-tooltip-message">
                            If you'd like to sell products for this brand, please contact us at
                            <a href="tel:{{../phone}}">{{../phone}}</a> or use the <a href="#" data-touchpoint="home"
                            data-hashtag="#/contact">support page.</a>
                        </p>
                        <span class="close-tooltip" data-action="dismiss-tooltip">X</span>
                    </div>
                </div>

                {{/if}}
            </li>
        {{/each}}
    </ul>
</div>

<!--
  Available helpers:
  {{ getExtensionAssetsPath "img/image.jpg"}} - reference assets in your extension
  
  {{ getExtensionAssetsPathWithDefault context_var "img/image.jpg"}} - use context_var value i.e. configuration variable. If it does not exist, fallback to an asset from the extension assets folder
  
  {{ getThemeAssetsPath context_var "img/image.jpg"}} - reference assets in the active theme
  
  {{ getThemeAssetsPathWithDefault context_var "img/theme-image.jpg"}} - use context_var value i.e. configuration variable. If it does not exist, fallback to an asset from the theme assets folder
-->