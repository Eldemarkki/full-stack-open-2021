describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset")
    cy.request("POST", "http://localhost:3003/api/users", {
      name: "TestName",
      username: "TestUsername",
      password: "TestPassword"
    })
    cy.visit("http://localhost:3000")
  })

  it("Login form is shown", function () {
    cy.contains("Log in to application")
  })

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("Log in").click()
      cy.get("#usernameField").type("TestUsername")
      cy.get("#passwordField").type("TestPassword")
      cy.get("#login-button").click()
      cy.contains("TestName logged in")
    })

    it("fails with wrong credentials", function () {
      cy.contains("Log in").click()
      cy.get("#usernameField").type("TestUsername")
      cy.get("#passwordField").type("WrongPassword")
      cy.get("#login-button").click()
      cy.contains("Invalid username or password")
    })
  })

  describe("When logged in", function () {
    beforeEach(function () {
      localStorage.removeItem("user")

      cy.contains("Log in").click()
      cy.get("#usernameField").type("TestUsername")
      cy.get("#passwordField").type("TestPassword")
      cy.get("#login-button").click()
      cy.contains("TestName logged in")
    })

    it("A blog can be created", function () {
      cy.contains("Create new blog").click()
      cy.get(".blogCreationFormTitleInput").type("BlogTitle")
      cy.get(".blogCreationFormAuthorInput").type("BlogAuthor")
      cy.get(".blogCreationFormUrlInput").type("BlogUrl")
      cy.get("#createBlogButton").click()

      cy.get(".blogEntry")
        .should("contain", "BlogTitle BlogAuthor")
        .and("contain", "view")
    })
  })

  describe("When has blogs", function () {
    beforeEach(function () {
      localStorage.removeItem("user")

      cy.contains("Log in").click()
      cy.get("#usernameField").type("TestUsername")
      cy.get("#passwordField").type("TestPassword")
      cy.get("#login-button").click()
      cy.contains("TestName logged in")

      cy.contains("Create new blog").click()
      cy.get(".blogCreationFormTitleInput").type("BlogTitle1")
      cy.get(".blogCreationFormAuthorInput").type("BlogAuthor1")
      cy.get(".blogCreationFormUrlInput").type("BlogUrl1")
      cy.get("#createBlogButton").click()

      cy.contains("Create new blog").click()
      cy.get(".blogCreationFormTitleInput").type("BlogTitle2")
      cy.get(".blogCreationFormAuthorInput").type("BlogAuthor2")
      cy.get(".blogCreationFormUrlInput").type("BlogUrl2")
      cy.get("#createBlogButton").click()
    })

    it("Blog can be liked", function () {
      cy.contains("BlogTitle1 BlogAuthor1").parent().contains("view").click()
      cy.contains("BlogTitle1 BlogAuthor1").parent().contains("Likes 0")
      cy.contains("BlogTitle1 BlogAuthor1").parent().get(".likeButton").click()
      cy.contains("BlogTitle1 BlogAuthor1").parent().contains("Likes 1")
    })

    it("Blog can be deleted", function () {
      cy.contains("BlogTitle1 BlogAuthor1").parent().contains("view").click()
      cy.contains("BlogTitle1 BlogAuthor1").parent().get(".deleteButton").click()
      cy.contains("BlogTitle1 BlogAuthor1").should("not.exist")
      cy.contains("BlogTitle2 BlogAuthor2")
    })


    it("Blogs are ordered by like count", function () {
      const children = cy.get(".blogList").children(".blogEntry")
      children.should("have.length", 2)

      const secondBlogEntry = children.next()
      secondBlogEntry.contains("view").click()
      secondBlogEntry.get(".likeButton").click()

      const likedChildren = cy.get(".blogList").children(".blogEntry")
      likedChildren.contains("BlogTitle2 BlogAuthor2")
      likedChildren.next().contains("BlogTitle1 BlogAuthor1")
    })
  })
})