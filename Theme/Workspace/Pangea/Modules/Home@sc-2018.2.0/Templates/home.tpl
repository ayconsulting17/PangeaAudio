<div class="home">
	<div data-cms-area="home_cms_area_1" data-cms-area-filters="path"></div>

	<div data-cms-area="home_cms_area_2" data-cms-area-filters="path"></div>

	<div class="home-slider-container">
		<div class="home-image-slider">
			<ul data-slider class="home-image-slider-list">
				{{#each customSliders}}
					<li>
						<div class="home-slide-main-container" style="background: url({{this.backgroundImage}})">
							<div class="home-slide-image-container">
								<img src="{{resizeImage this.image ../imageHomeSize}}" alt="" />
							</div>

							<div class="home-slide-caption {{this.slideTextColor}}">
								<h2 class="home-slide-caption-title">{{this.title}}</h2>
								<p>{{this.text}}</p>
								<div class="home-slide-caption-button-container">
									<a href="{{this.link}}" class="home-slide-caption-button">{{this.buttonText}}</a>
								</div>
							</div>
						</div>
					</li>
				{{/each}}
			</ul>
		</div>
	</div>

	<div data-cms-area="home_cms_area_3" data-cms-area-filters="path"></div>

	<div class="home-banner-main">
		{{#each customBuckets}}
			<div class="custom-bucket">
				<a href="{{this.link}}" data-touchpoint="{{this.touchpoint}}" data-hashtag="{{this.hashtag}}"
				   target="{{this.target}}"
				   class="home-banner-main-cell-bg">
					<div class="title">{{this.title}}</div>
					<div class="text">{{this.text}}</div>
					<img src="{{resizeImage this.image ../imageHomeSizeBottom}}" alt="" >
				</a>
			</div>
		{{/each}}
	</div>

	<!--<div data-view="TestimonialsView"></div>-->

	<div data-cms-area="home_cms_area_4" data-cms-area-filters="path"></div>

	<div class="home-merchandizing-zone">
		<div data-id="your-merchandising-zone" data-type="merchandising-zone"></div>
	</div>
</div>
<div class="testimonials-wrapper">
	<div class="container">
		<div data-view="TestimonialsView"></div>
	</div>
</div>
<div class="container">
	<div data-view="NewsView"></div>
</div>


<span itemscope itemtype="http://schema.org/Organization">
	<meta itemprop="legalName" content="Pangea Audio Distributing, LLC." />
	<meta itemprop="faxNumber" content="+1-616-885-9818" />
	<meta itemprop="url" content="https://www.pangeaaudio.com" />
	<meta itemprop="sameAs" content="https://www.facebook.com/pangeaaudio" />
	<meta itemprop="logo" content="https://www.pangeaaudio.com/site/site_images/pangea-logo.png" />
	<span itemscope itemtype="http://schema.org/PostalAddress" itemprop="address">
		<meta itemprop="streetAddress" content="3427 Kraft Avenue SE" />
		<meta itemprop="addressLocality" content="Grand Rapids" />
		<meta itemprop="addressRegion" content="MI" />
		<meta itemprop="addressCountry" content="USA" />
		<meta itemprop="postalCode" content="49512" />
	</span>
	<span itemscope itemtype="http://schema.org/ContactPoint" itemprop="contactPoint">
		<meta itemprop="telephone" content="+1-866-984-0677">
		<meta itemprop="contactType" content="Sales/Customer Support">
		<meta itemprop="contactOption" content="TollFree">
		<meta itemprop="areaServed" content="US">
		<meta itemprop="availableLanguage" content="English">
	</span>
</span>


{{!----
Use the following context variables when customizing this template:

	imageHomeSize (String)
	imageHomeSizeBottom (String)
	carouselImages (Array)
	bottomBannerImages (Array)

----}}
