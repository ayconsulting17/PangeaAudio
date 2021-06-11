<div id="contact-page">
    <h1>Contact Us</h1>
    <p class="contact-text">{{descriptionText}}</p>

    <form>
        <div data-confirm-message></div>

        <div class="form-section-wrapper">
            <h2>About You</h2>
            <div class="form-control form-field-wrapper">
                <div class="row">
                    <div data-validation="control-group">
                        <label for="firstname">First Name:<span class="input-required">*</span></label>
                        <input type="text" name="firstname" id="firstname" maxlength="25">
                        <div data-validation="control" class="error-wrapper"></div>
                    </div>
                </div>
                <div class="row">
                    <div data-validation="control-group">
                        <label for="lastname">Last Name:<span class="input-required">*</span></label>
                        <input type="text" name="lastname" id="lastname" maxlength="35">
                        <div data-validation="control" class="error-wrapper"></div>
                    </div>
                </div>
                <div class="row">
                    <div data-validation="control-group">
                        <label for="email">Email:<span class="input-required">*</span></label>
                        <input type="text" name="email" id="email" maxlength="45">
                        <div data-validation="control" class="error-wrapper"></div>
                    </div>
                </div>
            </div>
        </div>


        <div class="form-section-wrapper">
            <h2>Message</h2>
            <div class="form-control form-field-wrapper">
                <div class="row">
                    <div data-validation="control-group">
                        <label for="custevent_jhm_case_departments">Department:<span class="input-required">*</span></label>
                        <select name="custevent_jhm_case_departments" id="custevent_jhm_case_departments"></select>
                        <div data-validation="control" class="error-wrapper"></div>
                    </div>
                </div>
                <div class="row">
                    <div data-validation="control-group">
                        <label for="title">Subject:<span class="input-required">*</span></label>
                        <input type="text" name="title" id="title" maxlength="35">
                        <div data-validation="control" class="error-wrapper"></div>
                    </div>
                </div>
                <div class="row">
                    <div data-validation="control-group">
                        <label for="incomingmessage">Message:<span class="input-required">*</span></label>
                        <textarea name="incomingmessage" id="incomingmessage" maxlength="300"></textarea>
                        <div data-validation="control" class="error-wrapper"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row form-section-wrapper">
            <div class="form-field-wrapper">
                <label></label>
                <div class="button-container">
                    <button type="submit" class="submit-button">Submit</button>
                    <button class="reset-button" data-action="reset-form">Reset Form</button>
                </div>
            </div>
        </div>
    </form>

</div>