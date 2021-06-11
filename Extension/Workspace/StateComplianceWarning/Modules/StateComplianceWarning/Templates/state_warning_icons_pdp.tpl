{{#if showWarnings}}
    <div class="warning-icon-msg-container">
        <div class="warning-icon">
            <img src="{{icon}}" />
        </div>
        <p class="warning-text">{{message}}
            {{#if showLink}}
                <a href="{{link}}" target="_blank">{{linkText}}</a>
            {{/if}}
        </p>
    </div>
{{/if}}