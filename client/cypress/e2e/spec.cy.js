describe('game functionality tests', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.getDataTest('restart-button').click();
  });
  it('passes x successfully wins 3x3 game', () => {
    cy.getDataTest('game-status').should('contain.text', "It is X's turn");
    cy.getDataTest('mb20-box02').click();
    cy.getDataTest('mb02-box10').click();
    cy.getDataTest('mb10-box11').click();
    cy.getDataTest('mb11-box12').click();
    cy.getDataTest('mb12-box21').click();
    cy.getDataTest('mb21-box22').click();
    cy.getDataTest('mb22-box00').click();
    cy.getDataTest('mb00-box22').click();
    cy.getDataTest('mb22-box10').click();
    cy.getDataTest('mb10-box21').click();
    cy.getDataTest('mb21-box11').click();
    cy.getDataTest('mb11-box10').click();
    cy.getDataTest('mb10-box00').click();
    cy.getDataTest('mb00-box11').click();
    cy.getDataTest('mb11-box22').click();
    cy.getDataTest('mb22-box21').click();
    cy.getDataTest('mb21-box20').click();
    cy.getDataTest('mb20-box11').click();
    cy.getDataTest('mb11-box11').click();
    cy.getDataTest('mb11-box20').click();
    cy.getDataTest('mb20-box12').click();
    cy.getDataTest('mb12-box10').click();
    cy.getDataTest('mb10-box22').click();
    cy.getDataTest('mb22-box11').click();
    cy.getDataTest('mb11-box00').click();
    cy.getDataTest('mb00-box00').click();
    cy.getDataTest('mb21-box02').click();
    cy.getDataTest('mb02-box01').click();
    cy.getDataTest('mb01-box12').click();
    cy.getDataTest('mb12-box20').click();
    cy.getDataTest('mb20-box22').click();
    cy.getDataTest('mb22-box01').click();
    cy.getDataTest('mb01-box22').click();
    cy.getDataTest('mb12-box00').click();
    cy.getDataTest('mb01-box02').click();
    cy.getDataTest('game-status').should('contain.text', 'X WINS');
  });
  it('passes o successfully wins 3x3 game', () => {
    cy.getDataTest('game-status').should('contain.text', "It is X's turn");
    cy.getDataTest('mb11-box22').click();
    cy.getDataTest('mb22-box00').click();
    cy.getDataTest('mb00-box11').click();
    cy.getDataTest('mb11-box02').click();
    cy.getDataTest('mb02-box20').click();
    cy.getDataTest('mb20-box20').click();
    cy.getDataTest('mb20-box02').click();
    cy.getDataTest('mb02-box11').click();
    cy.getDataTest('mb11-box11').click();
    cy.getDataTest('mb11-box01').click();
    cy.getDataTest('mb01-box20').click();
    cy.getDataTest('mb20-box10').click();
    cy.getDataTest('mb10-box11').click();
    cy.getDataTest('mb11-box00').click();
    cy.getDataTest('mb00-box21').click();
    cy.getDataTest('mb21-box11').click();
    cy.getDataTest('mb00-box01').click();
    cy.getDataTest('mb01-box11').click();
    cy.getDataTest('mb01-box21').click();
    cy.getDataTest('mb21-box10').click();
    cy.getDataTest('mb10-box12').click();
    cy.getDataTest('mb12-box11').click();
    cy.getDataTest('mb01-box22').click();
    cy.getDataTest('mb22-box10').click();
    cy.getDataTest('mb10-box10').click();
    cy.getDataTest('mb20-box00').click();
    cy.getDataTest('mb21-box12').click();
    cy.getDataTest('mb12-box21').click();
    cy.getDataTest('mb21-box22').click();
    cy.getDataTest('mb22-box20').click();
    cy.getDataTest('mb21-box02').click();
    cy.getDataTest('mb02-box12').click();
    cy.getDataTest('mb12-box12').click();
    cy.getDataTest('mb12-box01').click();
    cy.getDataTest('mb02-box10').click();
    cy.getDataTest('mb02-box00').click();
    cy.getDataTest('mb02-box22').click();
    cy.getDataTest('mb02-box21').click();
    cy.getDataTest('mb02-box02').click();
    cy.getDataTest('mb02-box01').click();
    cy.getDataTest('game-status').should('contain.text', 'O WINS');
  });
  it('passes game ends in draw', () => {
    cy.getDataTest('mb11-box11').click();
    cy.getDataTest('mb11-box20').click();
    cy.getDataTest('mb20-box10').click();
    cy.getDataTest('mb10-box00').click();
    cy.getDataTest('mb00-box22').click();
    cy.getDataTest('mb22-box01').click();
    cy.getDataTest('mb01-box11').click();
    cy.getDataTest('mb11-box02').click();
    cy.getDataTest('mb02-box21').click();
    cy.getDataTest('mb21-box00').click();
    cy.getDataTest('mb00-box21').click();
    cy.getDataTest('mb21-box11').click();
    cy.getDataTest('mb11-box00').click();
    cy.getDataTest('mb00-box20').click();
    cy.getDataTest('mb20-box11').click();
    cy.getDataTest('mb11-box22').click();
    cy.getDataTest('mb22-box10').click();
    cy.getDataTest('mb10-box11').click();
    cy.getDataTest('mb11-box21').click();
    cy.getDataTest('mb21-box22').click();
    cy.getDataTest('mb22-box12').click();
    cy.getDataTest('mb12-box12').click();
    cy.getDataTest('mb12-box01').click();
    cy.getDataTest('mb01-box10').click();
    cy.getDataTest('mb10-box22').click();
    cy.getDataTest('mb22-box11').click();
    cy.getDataTest('mb11-box01').click();
    cy.getDataTest('mb01-box20').click();
    cy.getDataTest('mb20-box12').click();
    cy.getDataTest('mb12-box10').click();
    cy.getDataTest('mb10-box12').click();
    cy.getDataTest('mb12-box11').click();
    cy.getDataTest('mb10-box02').click();
    cy.getDataTest('mb02-box00').click();
    cy.getDataTest('mb00-box00').click();
    cy.getDataTest('mb00-box11').click();
    cy.getDataTest('mb22-box21').click();
    cy.getDataTest('mb00-box02').click();
    cy.getDataTest('mb02-box22').click();
    cy.getDataTest('mb22-box20').click();
    cy.getDataTest('mb22-box00').click();
    cy.getDataTest('mb22-box22').click();
    cy.getDataTest('mb22-box02').click();
    cy.getDataTest('mb02-box20').click();
    cy.getDataTest('mb01-box00').click();
    cy.getDataTest('mb02-box10').click();
    cy.getDataTest('mb01-box22').click();
    cy.getDataTest('game-status').should('contain.text', 'DRAW');
  });
  it('properly resizes and maintains gameplay', () => {
    cy.get('.box').should('have.length', 3 * 3 * 3 * 3);
    cy.getDataTest('dimension-input').type('{backspace}2{enter}');
    cy.get('.box').should('have.length', 2 * 2 * 2 * 2);
    cy.getDataTest('dimension-input').type('{backspace}5{enter}');
    cy.get('.box').should('have.length', 5 * 5 * 5 * 5);
    cy.getDataTest('dimension-input').type('{backspace}4{enter}');
    cy.get('.box').should('have.length', 4 * 4 * 4 * 4);
    cy.getDataTest('restart-button').click();
    cy.get('.box').should('have.length', 4 * 4 * 4 * 4);
    cy.getDataTest('mb21-box02').click();
    cy.getDataTest('mb02-box21').click();
    cy.getDataTest('mb21-box12').click();
    cy.getDataTest('mb12-box12').click();
    cy.getDataTest('mb12-box11').click();
    cy.getDataTest('mb11-box21').click();
    cy.getDataTest('mb21-box22').click();
    cy.getDataTest('mb22-box21').click();
    cy.getDataTest('mb21-box32').click();
    cy.getDataTest('mb32-box02').click();
    cy.getDataTest('mb02-box22').click();
    cy.getDataTest('mb22-box12').click();
    cy.getDataTest('mb12-box01').click();
    cy.getDataTest('mb01-box22').click();
    cy.getDataTest('mb22-box22').click();
    cy.getDataTest('mb22-box03').click();
    cy.getDataTest('mb03-box21').click();
    cy.getDataTest('mb22-box30').click();
    cy.getDataTest('mb30-box12').click();
    cy.getDataTest('mb12-box22').click();
    cy.getDataTest('mb30-box21').click();
    cy.getDataTest('mb12-box02').click();
    cy.getDataTest('mb02-box12').click();
    cy.getDataTest('mb12-box32').click();
    cy.getDataTest('mb32-box11').click();
    cy.getDataTest('mb11-box22').click();
    cy.getDataTest('mb30-box03').click();
    cy.getDataTest('mb03-box11').click();
    cy.getDataTest('mb11-box11').click();
    cy.getDataTest('mb11-box20').click();
    cy.getDataTest('mb20-box12').click();
    cy.getDataTest('mb11-box23').click();
    cy.getDataTest('mb23-box21').click();
    cy.getDataTest('mb02-box31').click();
    cy.getDataTest('mb31-box21').click();
    cy.getDataTest('mb02-box11').click();
    cy.getDataTest('mb02-box02').click();
    cy.getDataTest('mb02-box01').click();
    cy.getDataTest('mb01-box31').click();
    cy.getDataTest('mb31-box22').click();
    cy.getDataTest('mb30-box30').click();
    cy.getDataTest('mb32-box12').click();
    cy.getDataTest('mb31-box11').click();
    cy.getDataTest('mb32-box22').click();
    cy.getDataTest('mb31-box31').click();
    cy.getDataTest('mb31-box01').click();
    cy.getDataTest('mb01-box32').click();
    cy.getDataTest('mb32-box32').click();
    cy.getDataTest('game-status').should('contain.text', 'O WINS');
    cy.getDataTest('restart-button').click();
    cy.getDataTest('mb00-box00').click();
    cy.getDataTest('mb00-box10').click();
    cy.getDataTest('mb10-box10').click();
    cy.getDataTest('mb10-box00').click();
    cy.getDataTest('mb00-box11').click();
    cy.getDataTest('mb11-box00').click();
    cy.getDataTest('mb00-box22').click();
    cy.getDataTest('mb22-box00').click();
    cy.getDataTest('mb00-box33').click();
    cy.getDataTest('mb33-box00').click();
    cy.getDataTest('mb01-box10').click();
    cy.getDataTest('mb10-box11').click();
    cy.getDataTest('mb11-box10').click();
    cy.getDataTest('mb10-box22').click();
    cy.getDataTest('mb22-box10').click();
    cy.getDataTest('mb10-box33').click();
    cy.getDataTest('mb33-box11').click();
    cy.getDataTest('mb11-box22').click();
    cy.getDataTest('mb22-box11').click();
    cy.getDataTest('mb11-box31').click();
    cy.getDataTest('mb31-box30').click();
    cy.getDataTest('mb30-box10').click();
    cy.getDataTest('mb20-box10').click();
    cy.getDataTest('mb30-box11').click();
    cy.getDataTest('mb11-box11').click();
    cy.getDataTest('mb11-box20').click();
    cy.getDataTest('mb20-box00').click();
    cy.getDataTest('mb31-box20').click();
    cy.getDataTest('mb20-box30').click();
    cy.getDataTest('mb30-box12').click();
    cy.getDataTest('mb12-box32').click();
    cy.getDataTest('mb32-box20').click();
    cy.getDataTest('mb20-box20').click();
    cy.getDataTest('mb30-box13').click();
    cy.getDataTest('mb13-box32').click();
    cy.getDataTest('mb32-box30').click();
    cy.getDataTest('mb31-box21').click();
    cy.getDataTest('mb21-box31').click();
    cy.getDataTest('mb31-box12').click();
    cy.getDataTest('mb12-box31').click();
    cy.getDataTest('mb31-box03').click();
    cy.getDataTest('mb03-box33').click();
    cy.getDataTest('mb33-box32').click();
    cy.getDataTest('mb32-box10').click();
    cy.getDataTest('mb33-box23').click();
    cy.getDataTest('mb23-box33').click();
    cy.getDataTest('mb33-box31').click();
    cy.getDataTest('mb32-box00').click();
    cy.getDataTest('mb33-box30').click();
    cy.getDataTest('mb23-box23').click();
    cy.getDataTest('mb23-box21').click();
    cy.getDataTest('mb21-box32').click();
    cy.getDataTest('mb33-box33').click();
    cy.getDataTest('mb23-box13').click();
    cy.getDataTest('mb13-box31').click();
    cy.getDataTest('mb23-box03').click();
    cy.getDataTest('mb03-box21').click();
    cy.getDataTest('mb21-box13').click();
    cy.getDataTest('mb13-box30').click();
    cy.getDataTest('mb21-box30').click();
    cy.getDataTest('mb13-box33').click();
    cy.getDataTest('mb21-box33').click();
    cy.getDataTest('mb22-box12').click();
    cy.getDataTest('mb12-box21').click();
    cy.getDataTest('mb11-box03').click();
    cy.getDataTest('mb03-box23').click();
    cy.getDataTest('mb22-box13').click();
    cy.getDataTest('mb03-box13').click();
    cy.getDataTest('mb11-box12').click();
    cy.getDataTest('mb12-box11').click();
    cy.getDataTest('mb11-box01').click();
    cy.getDataTest('mb01-box02').click();
    cy.getDataTest('mb02-box03').click();
    cy.getDataTest('mb03-box03').click();
    cy.getDataTest('mb02-box12').click();
    cy.getDataTest('mb12-box02').click();
    cy.getDataTest('mb02-box21').click();
    cy.getDataTest('mb01-box01').click();
    cy.getDataTest('mb01-box12').click();
    cy.getDataTest('mb12-box20').click();
    cy.getDataTest('mb11-box13').click();
    cy.getDataTest('game-status').should('contain.text', 'X WINS');
  });
});