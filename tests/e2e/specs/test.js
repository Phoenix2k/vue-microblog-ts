describe( 'Basic routing', () => {

	it( 'Visits the app root url', () => {
		cy.visit( '/' );
		cy.contains( 'h1', 'News Feed' );
	} );

	it( 'Visits the admin view', () => {
		cy.visit( '/admin' );
		cy.contains( 'h1', 'Admin' );
	} );

	it( 'Goes back to the home screen', () => {
		cy.visit( '/' );
		cy.contains( 'h1', 'News Feed' );
	} );

} );
