// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })



Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (firstname, lastName, email, telefone, textArea) => {
    // cy.intercept('POST', './src/index.html').as("enviar")
    cy.get("#firstName").type(firstname)
    cy.get("#lastName").type(lastName)
    cy.get("#email").type(email)
    cy.get('#phone').type(telefone)
    cy.get("#open-text-area").type(textArea)
    cy.get("button[type='submit']").click()
    // cy.wait('@enviar')
})

Cypress.Commands.add('clearFields', (firstname, lastName, email, telefone, textArea) => {

    cy.get("#firstName").type(firstname).should("have.value", firstname).clear().should("have.value", "")
    cy.get("#lastName").type(lastName).should("have.value", lastName).clear().should("have.value", "")
    cy.get("#email").type(email).should("have.value", email).clear().should("have.value", "")
    cy.get('#phone').type(telefone).should("have.value", telefone).clear().should("have.value", "")
    cy.get("#open-text-area").type(textArea).should("have.value", textArea).clear().should("have.value", "")

})

Cypress.Commands.add('selecOptions', (text, valor, indice) => {

    // também pode ser pelo tag ->  cy.get('select')
    cy.get('#product').select(text)
    cy.wait(800)
    cy.get('#product').select(valor)
    cy.wait(800)
    cy.get('#product').select(indice)
    cy.wait(800)

})

Cypress.Commands.add("checkRadios", (InputTypeRadio) => {

    cy.get(InputTypeRadio)
        .should('have.length', 3)
        .each(($radio) => {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
})

Cypress.Commands.add("uploadFile", (inputFile, path, file) => {
    cy.get(inputFile)
        .should("not.have.value")
        .selectFile(path, { action: "drag-drop" }) // dra-drop arrasta o arquivo e joga o arquivo para anexa-lo
        .should(($input) => {
            expect($input[0].files[0].name).to.equal(file)
        })

})

Cypress.Commands.add("showAndHideMsg", (elem, msg) => {
    cy.get(elem)
        .should("not.be.visible")
        .invoke("show")
        .should("be.visible")
        .and("contain", msg)
        .invoke("hide")
        .should("not.be.visible")

})