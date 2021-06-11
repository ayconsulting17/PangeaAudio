<div class="product-details-full">
	<div data-cms-area="item_details_banner" data-cms-area-filters="page_type"></div>

	<header class="product-details-full-header">
		<div id="banner-content-top" class="product-details-full-banner-top"></div>
	</header>

	<article class="product-details-full-content" itemscope itemtype="https://schema.org/Product">
		<meta itemprop="url" content="{{itemUrl}}">
		<meta itemprop="brand" content="{{model.item.custitem_brand}}" />
		<meta itemprop="description" content="{{model.item.featureddescription}}" />
		<meta itemprop="mpn" content="{{model.item.itemid}}" />
		<meta itemprop="name" content="{{model.item.displayname}}" />
		{{#each seoImgArr}}
			<meta itemprop="image" content="{{this}}" />
		{{/each}}
		<div id="banner-details-top" class="product-details-full-banner-top-details"></div>

		<section class="product-details-full-main-content">
			<div class="product-details-full-content-header">

				<div data-cms-area="product_details_full_cms_area_1" data-cms-area-filters="page_type"></div>

				<div id="product-details-header-container">
					<h2>{{category}}</h2>
					<h1 class="product-details-full-content-header-title">{{pageHeader}}</h1>
				</div>

				<!--<div class="product-details-full-rating" data-view="Global.StarRating"></div>-->
				<h3>{{model.item.custitem_jhm_product_type}}</h3>
				<div data-cms-area="item_info" data-cms-area-filters="path"></div>
			</div>
			<div class="product-details-full-main-content-left">
				<div class="product-details-full-image-gallery-container">
					<div id="banner-image-top" class="content-banner banner-image-top"></div>
					<div data-view="Product.ImageGallery"></div>
					<div id="banner-image-bottom" class="content-banner banner-image-bottom"></div>

					<div data-cms-area="product_details_full_cms_area_2" data-cms-area-filters="path"></div>
					<div data-cms-area="product_details_full_cms_area_3" data-cms-area-filters="page_type"></div>
				</div>
			</div>

			<div class="product-details-full-main-content-right">
			<div class="product-details-full-divider"></div>

			<div class="product-details-full-main">
				{{#if isItemProperlyConfigured}}
					<form id="product-details-full-form" data-action="submit-form" method="POST">

						<section class="product-details-full-info">
							<div id="banner-summary-bottom" class="product-details-full-banner-summary-bottom"></div>
						</section>

						<section data-view="Product.Options"></section>

						<div data-cms-area="product_details_full_cms_area_4" data-cms-area-filters="path"></div>

						<div data-view="Product.Sku"></div>

						<div data-view="Product.Price"></div>
						<div data-view="Quantity.Pricing"></div>

						<div data-view="Product.Stock.Info"></div>

						{{#if isPriceEnabled}}
							<div data-view="Quantity"></div>

							<section class="product-details-full-actions">
								<div class="product-details-full-actions-container">
									<div data-view="MainActionView"></div>
									<div data-view="ProductDetails.AddToQuote" class="product-details-full-actions-addtoquote"></div>

								</div>
							</section>
						{{/if}}

						<div data-view="StateComplianceWarning"></div>

						{{#ifEquals model.item.itemtype "Kit" }}	
						<div class="kit-component-container">
						<span class="kit-components-name">
						{{model.item.custitem_kit_components_1}} -
						</span>
						<span class="kit-components-qty">
						{{model.item.custitem_kit_components_qty_1}}
						</span>
						</div>
						{{/ifEquals}}

						<div data-view="StockDescription"></div>

						<div data-view="SocialSharing.Flyout" class="product-details-full-social-sharing"></div>

						<div class="product-details-full-main-bottom-banner">
							<div id="banner-summary-bottom" class="product-details-full-banner-summary-bottom"></div>
						</div>
					</form>
				{{else}}
					<div data-view="GlobalViewsMessageView.WronglyConfigureItem"></div>
				{{/if}}

				<div id="banner-details-bottom" class="product-details-full-banner-details-bottom" data-cms-area="item_info_bottom" data-cms-area-filters="page_type"></div>
			</div>
			</div>

		</section>

		<div data-cms-area="product_details_full_cms_area_5" data-cms-area-filters="page_type"></div>
		<div data-cms-area="product_details_full_cms_area_6" data-cms-area-filters="path"></div>

		<!--<section data-view="Product.Information"></section>-->
		<div id="product-details-custom-data">
			<div id="full-desc">
				{{{model.item.storedetaileddescription}}}
			</div>
			{{#if showDescToggle}}
				<div class="button-container">
					<a href="#" class="toggle-desc" data-action="toggle-expand" data-toggle-el="full-desc">See More</a>
				</div>
			{{/if}}
			<div class="details technical-specs">
				<h3>Technical Specifications</h3>
				{{{model.item.featureddescription}}}
			</div>
			<div class="details">
				<h3>Information</h3>
				<div data-view="Manuals"></div>
			</div>
		</div>

		<!--<div class="product-details-full-divider-desktop"></div>-->

		<div data-cms-area="product_details_full_cms_area_7" data-cms-area-filters="path"></div>

		<!--<div data-view="ProductReviews.Center"></div>-->

		<div data-cms-area="product_details_full_cms_area_8" data-cms-area-filters="path"></div>

		<div class="product-details-full-content-related-items">
			<div data-view="Related.Items"></div>
		</div>

		<div class="product-details-full-content-correlated-items">
			<div data-view="Correlated.Items"></div>
		</div>
		<div id="banner-details-bottom" class="content-banner banner-details-bottom" data-cms-area="item_details_banner_bottom" data-cms-area-filters="page_type"></div>
	</article>
</div>



{{!----
Use the following context variables when customizing this template:

	model (Object)
	model.item (Object)
	model.item.internalid (Number)
	model.item.type (String)
	model.quantity (Number)
	model.options (Array)
	model.options.0 (Object)
	model.options.0.cartOptionId (String)
	model.options.0.itemOptionId (String)
	model.options.0.label (String)
	model.options.0.type (String)
	model.location (String)
	model.fulfillmentChoice (String)
	pageHeader (String)
	itemUrl (String)
	isItemProperlyConfigured (Boolean)
	isPriceEnabled (Boolean)

----}}
