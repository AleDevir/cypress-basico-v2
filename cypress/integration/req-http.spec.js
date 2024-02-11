
it("testar a api do curso fazendo uma requisição HTTP", () => {
    //https://cac-tat.s3.eu-central-1.amazonaws.com/index.html
    cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
        .should((response) => {
            const { status, statusText, body } = response
            expect(status).to.equal(200)
            expect(statusText).to.equal("OK")
            expect(body).include("CAC TAT")
        })
})