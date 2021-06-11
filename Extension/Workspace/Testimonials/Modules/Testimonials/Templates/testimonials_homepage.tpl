<div id="homepage-testimonials" class="home-slider-container">
    <div class="home-image-slider">
        <h2>Testimonials</h2>
        <ul data-slider class="home-image-slider-list">
            {{#each testimonials}}
                <li>
                    <div class="home-slide-main-container">
                        <a href="#" data-touchpoint="home" data-hashtag="/testimonials" title="Testimonials">
                            <p class="title">{{this.values.custrecord_jhm_testimonial_title}}</p>
                            <p class="body">{{this.values.custrecord_jhm_testimonial_body}}</p>
                            <p class="author">- {{this.values.custrecord_jhm_testimonial_name}}</p>
                        </a>
                    </div>
                </li>
            {{/each}}
        </ul>
    </div>
</div>