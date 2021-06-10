<div id="manuals-page">
    <h1>Manuals</h1>

    {{#each manuals}}
        <h2 class="subheader">{{this.name}}</h2>

        <ul class="manuals-list">
            {{#each this.manualsArr}}
                <li>
                    <a href="{{file}}" data-navigation="ignore-click" class="manual-link" target="_blank">
                        <i class="file-icon"></i>
                        <span class="filename">{{title}}</span>
                        <span class="filesize">{{size}}</span>
                    </a>
                </li>
            {{/each}}
        </ul>
    {{/each}}
</div>