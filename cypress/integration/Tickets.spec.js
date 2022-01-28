describe("Tickets", () => {
beforeEach(() => cy.visit("https://bit.ly/2XSuwCW"));

it("Preenche todos os campos de input", () => {
    const firstname = "Thiago";
    const lastname = "Beltrami";
    cy.get("#first-name")
    .type(firstname)

    cy.get("#last-name")
    .type(lastname)

    cy.get("#email")
    .type("emailteste@teste.com.br")

    cy.get("#requests")
    .type('Teste');

    cy.get("#signature")
    .type(`${firstname} ${lastname}`)
});
    it("Selecione dois tickets", () => {
       cy.get("#ticket-quantity")
       .select(2);
    });

    it("Selecionar 'vip' no tipo de ticket", () => {
       cy.get('#vip')
       .check();
    });

    it("Selecionar 'Social media' checkbox", () => {
       cy.get("#social-media")
       .check();
    })

    it("Selecionar o checkbox 'Friend' e 'Publication' então desmarcar 'Friend'", () => {
       cy.get("#friend")
       .check();
       cy.get("#publication")
       .check();
       cy.get("#friend")
       .uncheck();
    })

    it("has 'TICKETBOX' header's heading", () => {  
       cy.get("header h1")
       .should("contain", "TICKETBOX");
})
    it("Alertar se o email for inválido", () => {
        cy.get("#email")
        .as("email")
        .type("emailinvalido-gmail.com");
        
        cy.get("#email.invalid")
        .should("exist");
        
        cy.get("@email")
        .clear()
        .type("emailinvalido@gmail.com");

        cy.get("#email.invalid")
        .should("not.exist");


    })

    it("Preenchendo todas as informações e resetando depois", () => {
        const firstname = "Thiago";
        const lastname = "Beltrami";
        const fullName= `${firstname} ${lastname}`;

        cy.get("#first-name")
        .type(firstname)
        cy.get("#last-name")
        .type(lastname)
        cy.get("#email")
        .type("emailteste@teste.com.br")
        cy.get("#ticket-quantity")
        .select(2);
        cy.get('#vip')
        .check();
        cy.get("#friend")
        .check();
        cy.get("#requests")
        .type('Cerveja IPA');

        cy.get(".agreement p")
        .should("contain", `I, ${fullName}, wish to buy 3 VIP tickets.`);

        cy.get("#agree")
        .click();
        cy.get("#signature")
        .type(fullName);
        
        cy.get("button[type='submit']")
        .as("submitButton")
        .should("not.be.disabled");

        cy.get("button[type='reset']")
        .click();

        cy.get("@submitButton")
        .should("be.disabled");
        
    });


    it("Preenche campos obrigatórios usandos comandos de suporte", () => {
        const cliente = {
            firstname: "João",
            lastName: "Silva",
            email: "joaosilva@example.com"
        };

        cy.PreencherCamposObrigatorios(cliente);

        cy.get("button[type='submit']")
        .as("submitButton")
        .should("not.be.disabled");

        cy.get("button[type='reset']")
        .click();

        cy.get("@submitButton")
        .should("be.disabled");
    })
    
 
})