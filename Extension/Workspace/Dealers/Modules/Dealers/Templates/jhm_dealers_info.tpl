<h1>{{model.name}}</h1>
<table id="dealer-info">
    <!--<tr>-->
        <!--<td>Company:</td>-->
        <!--<td>{{model.name}}</td>-->
    <!--</tr>-->
    <tr>
        <td>Address:</td>
        <td>{{model.address1}}</td>
    </tr>
    {{#if model.address2}}
        <tr>
            <td>Address 2:</td>
            <td>{{model.address2}}</td>
        </tr>
    {{/if}}
    <tr>
        <td>City:</td>
        <td>{{model.city}}</td>
    </tr>
    <tr>
        <td>Zip:</td>
        <td>{{model.zipcode}}</td>
    </tr>
    <tr>
        <td>
            {{#if isInternational}}
                State/Province:
            {{else}}
                State:
            {{/if}}
        </td>
        <td>{{model.state}}</td>
    </tr>
    {{#if isInternational}}
        <tr>
            <td>Country:</td>
            <td>{{model.country}}</td>
        </tr>
    {{/if}}
    <tr>
        <td>Telephone:</td>
        <td>{{model.phone}}</td>
    </tr>
    <tr>
        <td>Email:</td>
        <td>{{model.email}}</td>
    </tr>
    <tr>
        <td>Web Address:</td>
        <td>{{model.url}}</td>
    </tr>
    <tr>
        <td>Brands:</td>
        <td>{{model.brandText}}</td>
    </tr>
</table>