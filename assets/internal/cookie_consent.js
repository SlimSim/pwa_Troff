$( document ).ready(function() {

	var COOKIE_CONSENT_ACCEPTED = "TROFF_COOKIE_CONSENT_ACCEPTED";

	const cookie_consent_DB = {
		set : function( key, value ) {
			window.localStorage.setItem( key, JSON.stringify( value ) );
		},
		get : function( key ) {
			return JSON.parse( window.localStorage.getItem( key ) );
		},
		delete : function( key ) {
			window.localStorage.removeItem( key );
			// todo, add print if "key" do not exist
		},
		getAllKeys : function() {
			return Object.keys(localStorage)
		},
		getAllKeyValuePairs : function() {
			return localStorage;
		},
		set_object : function( object ) {
			Object.entries( object ).forEach((v) => {
				const key =  v[0], val = JSON.parse( v[1] );
				nDB.set( key, val );
			});
		},
		clearAllStorage : function() {
			localStorage.clear();
		},
	};

	function showCookieConsent() {
		$.notify(
			{
				title: $("<span class=\"d-flex flex-column\">")
					.append( $("<h2>").text( "Cookie consent" ))
					.append( $("<p>").attr( "class", "small text-left" ).text( "Cookies help us deliver our Services. By using our website or clicking \"I consent\", you consent to our privacy policy and our use of cookies" ))
					.append(
						$("<span class=\"d-flex flex-row justify-content-between align-items-center\">")
						.append( $( "<button>" ).text( "I consent" ).on( "click", function() {
							$( this ).trigger( 'notify-hide' );
							cookie_consent_DB.set( COOKIE_CONSENT_ACCEPTED, true );
						} ) )
						.append($( "<a>" ).attr( "class", "small" ).text( "Learn More" ).attr("href", "privacy_policy.html").attr( "target", "_blank" ))
					)
			},
			{
				style: 'html-info',
				autoHide: false,
				clickToHide: false
			}
		);

	} // end showCookieConsent();

	function checkToShowCookieConsent() {
		try {
			var cookieConsentAccepted = cookie_consent_DB.get( COOKIE_CONSENT_ACCEPTED );//, cookieConsentAccepted => {
			if( cookieConsentAccepted === true ){
				return;
			}
			showCookieConsent();
//			});
		} catch ( e ) {
			console.info("cc / checkToShowCookieConsent: in catch, e:", e);
			setTimeout( function() {
				checkToShowCookieConsent();
			}, 10);
		}
	}

		checkToShowCookieConsent();

});
