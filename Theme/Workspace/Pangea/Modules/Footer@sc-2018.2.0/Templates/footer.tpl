<div data-view="Global.BackToTop"></div>
<div class="footer-content">

	<!--<div id="banner-footer" class="content-banner banner-footer" data-cms-area="global_banner_footer" data-cms-area-filters="global"></div>-->

	<div class="footer-block address-block">
		<h3>Address <span class="sprite-icon pin"></span></h3>
		<p>{{address1}}<br />{{address2}}</p>
		<div class="footer-divider"></div>
	</div>

	<div class="footer-block contact-block">
		<h3>Contact</h3>
		<ul>
			<li><span class="sprite-icon phone"></span>{{phone}}</li>
			<li><span class="sprite-icon fax"></span>{{fax}}</li>
			<li><span class="sprite-icon mail"></span><a href="mailto:{{email}}">{{email}}</a></li>
		</ul>
		<div class="footer-divider"></div>
	</div>

	<div class="footer-block">
		<h3>Information</h3>
		<ul>
			{{#each footerNavigationLinks}}
			<li>
				<a {{objectToAtrributes item}}>
					{{text}}
				</a>
			</li>
			{{/each}}
		</ul>

		{{#if showLogin}}
			<a id="footer-login" href="#" data-touchpoint="login" data-hashtag="login-register">{{translate 'Login'}}
				<span class="sprite-icon login"></span>
			</a>
		{{else}}
			<a id="footer-login" href="#" data-touchpoint="customercenter" data-hashtag="overview">{{translate 'Profile'}}
				<span class="sprite-icon login"></span>
			</a>
		{{/if}}
	</div>

	<div class="footer-block">
		<img class="" src="../../site/site_images/merchant-e-solutions.png" alt="Merchant e-Solutions" />
	</div>

</div>


{{!----
Use the following context variables when customizing this template:

	showFooterNavigationLinks (Boolean)
	footerNavigationLinks (Array)
	
----}}

