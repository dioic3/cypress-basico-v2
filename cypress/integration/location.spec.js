describe('Tweets', () => {
    beforeEach(() => cy.visit('src/index.html'))
  
    it('tweet using a custom command', () => {
      cy.get('[id="white-background"]').contains('Nome')
    });
  });