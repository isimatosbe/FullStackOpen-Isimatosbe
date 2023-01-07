describe("Blog app", function () {
  beforeEach(function () {
    window.localStorage.removeItem("loggedNoteappUser");
    cy.request("POST", "http://localhost:3003/api/testing/reset");

    cy.register({
      username: "root",
      password: "fullstack",
      name: "cypress",
    });

    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Log in to application");
    cy.contains("Username");
    cy.contains("Password");
  });

  it("Succeeds with correct credentials", function () {
    cy.login({ username: "root", password: "fullstack" });

    cy.get(".message").contains("cypress is loged in");
  });

  it("Fails with wrong credentials", function () {
    cy.get("#username").type("root");
    cy.get("#password").type("wrong");
    cy.get("#login-button").click();

    cy.get(".error")
      .should("contain", "Wrong credentials")
      .and("have.css", "color", "rgb(255, 0, 0)");
  });

  describe("When user is logged in", function () {
    beforeEach(function () {
      cy.login({ username: "root", password: "fullstack" });
    });
    it("A blog can be created", function () {
      const title = "Cypress' blog";
      const author = "Cypress";
      const url = "https://docs.cypress.io";
      cy.createBlog({ title, author, url });

      cy.get(".blogStyle").contains(`${title} by ${author}`);
    });

    describe("When there is at least one blog", function () {
      beforeEach(function () {
        const title = "Cypress' blog";
        const author = "Cypress";
        const url = "https://docs.cypress.io";
        cy.createBlog({ title, author, url });
      });

      it("User can like a blog", function () {
        cy.get("#view-blog").click();
        cy.get("#like-blog").click();
        cy.contains("Likes: 1");
      });

      it("User can delete a blog", function () {
        cy.request({
          url: "http://localhost:3003/api/blogs",
          method: "GET",
        })
          .then((response) => {
            const blogID = response.body[0].id;

            cy.request({
              url: `http://localhost:3003/api/blogs/${blogID}`,
              method: "DELETE",
              headers: {
                Authorization: `bearer ${
                  JSON.parse(localStorage.getItem("loggedNoteappUser")).token
                }`,
              },
            });
          })
          .then((response) => {
            cy.request({
              url: "http://localhost:3003/api/blogs",
              method: "GET",
            }).then((response) => expect(response.body.length).to.equal(0));
          });
      });

      it("User not owner cannot delete a blog", function () {
        cy.register({
          username: "notRoot",
          password: "fullstack",
          name: "notCypress",
        });

        cy.logout();
        cy.login({ username: "notRoot", password: "fullstack" });

        cy.get("#view-blog").click();
        cy.get("#delete-blog").click();

        cy.get(".error").contains("wrong user");
      });

      it("Blogs are ordered by likes in descending order", function () {
        cy.createBlog({
          title: "Most liked blog",
          author: "Cypress",
          url: "google.com",
          likes: 1000,
        });
        cy.createBlog({
          title: "Second most liked blog",
          author: "Cypress",
          url: "amazon.com",
          likes: 500,
        });

        cy.get("#blogForm")
          .find(".blogStyle")
          .eq(0)
          .contains("Most liked blog");
        cy.get("#blogForm")
          .find(".blogStyle")
          .eq(1)
          .contains("Second most liked blog");
        cy.get("#blogForm").find(".blogStyle").eq(2).contains("Cypress' blog");
      });
    });
  });
});
