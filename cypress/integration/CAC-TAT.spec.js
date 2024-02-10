// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test


//Para ter intellisense:
/// <Reference types="Cypress"/>
describe("Central de Atendimento ao Cliente TAT", () => {
    beforeEach(() => {
        cy.visit('./src/index.html')
    });
    //EXERC-1:
    it("verifica o título da aplicação", () => {

        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
    });
    //EXERC-1:
    it("preencha os campos obrigatórios e envie o formulário", () => {

        cy.fillMandatoryFieldsAndSubmit('Rinaldo', 'Benevides', 'rinaldo.benevides@gmail.com', ' ', 'Testando o comando personalizado!!!!!!!!!!!!!')
        cy.get(".success").should("be.visible")
    });
    //EXERC-EXTRA-1:
    //Textos longos são digitados quase simultaneamente quando sobreescre o delay default de 10 milesegundos para 0.
    it("inserindo delay", () => {

        cy.get("#open-text-area").type(`A expressão Lorem ipsum em design gráfico e editoração é um texto padrão em latim 
        utilizado na produção gráfica para preencher os espaços de texto em publicações (jornais, revistas, e sites) para 
        testar e ajustar aspectos visuais (layout, tipografia, formatação, etc.) antes de utilizar conteúdo real. Também 
        é utilizado em catálogos tipográficos, para demonstrar textos e títulos escritos com as fontes.`, { delay: 0 });

    });
    //EXERC-EXTRA-2:
    it("exibe mensagem de erro ao submeter o formulário com email inválido", () => {

        cy.fillMandatoryFieldsAndSubmit('Rinaldo', 'Benevides', 'rinaldo.benevidesgmail.com', " ", 'Testando o comando personalizado!!!!!!!!!!!!!')

        cy.get(".error").should("be.visible")

    });
    //EXERC-EXTRA-3:
    it("campo telefone continua vazio se o valor digitado não for numérico", () => {

        cy.get('#phone')
            .type("abcdefghi")
            .should('have.value', '')
    });
    //EXERC-EXTRA-4:
    it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio", () => {

        //para tornar o campo obrigatório deve marcar o checkbox da opção telefone
        cy.get('#phone-checkbox').check()
        cy.fillMandatoryFieldsAndSubmit('Rinaldo', 'Benevides', 'rinaldo.benevides@gmail.com', ' ', 'Testando o comando personalizado!!!!!!!!!!!!!')
        cy.get(".error").should("be.visible")

    });
    it("preencher os campos, nome, sobrenome, email e mensagem e depois apagar o conteudo", () => {

        cy.clearFields("Alessandra", "Guimarães", "a@gmail.com", "991582196", "Testando limpar campos")
    });
    it("exibe mensagem de erro ", () => {
        cy.get("button[type='submit']").click()
        cy.get(".error").should("be.visible")

    });
    it("teste identificando elemento", () => {
        // cy.get("form").contains("Enviar").click() // pode ser assim ou
        cy.contains("button", "Enviar").click()
    });
    it("selecionar um produto  por seu texto, valor e indice", () => {
        //Isso foi um treino para saber diferentes formas pegar o select [https://docs.cypress.io/api/commands/select]
        cy.selecOptions('YouTube', "cursos", 1)
    });
    it("marcar o tipo de atendiomento (Feedback)", () => {


        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')

    });
    it("marca cada tipo de atendimento", () => {
        cy.checkRadios('input[type="radio"]')

    });
    it("marca ambos checkbox, depois desmarca o último", () => {
        cy.get('[type="checkbox"]')
            .check()
            .should("be.checked")
            .last().uncheck()
            .should("not.be.checked")

    });
    it("upload de arquivo", () => {
        cy.uploadFile('input[type=file]#file-upload', './cypress/fixtures/users.json', "users.json")

    });
    it("selecione um arquivo utilizando uma fixture para a qual foi dada um alias", () => {
        //outra forma de carregar arquivos
        cy.fixture("example.json").as("exampleFile")
        cy.get("input[type=file]")
            .selectFile("@exampleFile")
            .should(($input) => {
                expect($input[0].files[0].name).to.equal("example.json")
            })
    });
    it("ir para outra página utilizando a tag _blank", () => {

        //formas:
        //cy.request("/privacy.html")
        //cy.get("#privacy a").should("have.attr", "target", "_blank")
        cy.get("#privacy a").should("have.attr", "target", "_blank").click()

    });
    it("ir para outra página utilizando SEM utilizar a tag _blank", () => {

        //cy.get("#privacy a").invoke("removeAttr", "target")
        //Assim você continua os testes na mesma pagina do cypress
        cy.get("#privacy a").invoke("removeAttr", "target").click()
        cy.contains("Talking About Testing").should("be.visible")

    });


});