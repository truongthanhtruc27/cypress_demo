describe("Góc Đọc Truyện - Cypress Demo", () => {

it("TC01 - Đăng ký tài khoản thành công", () => {
  const timestamp = Date.now();
  const username = `cypress_${timestamp}`;
  const email = `cypress_${timestamp}@gmail.com`;
  const password = "CypressDemo!2026#A";

  cy.visit("/register");

  cy.get('input[placeholder="Nhập tên..."]')
    .should("be.visible")
    .type(username);
  cy.wait(2000);

  cy.get('input[placeholder="Nhập email..."]')
    .should("be.visible")
    .type(email);
  cy.wait(2000);

  cy.get('input[placeholder="Nhập mật khẩu..."]')
    .should("be.visible")
    .type(password);
  cy.wait(2000);

  cy.get('input[placeholder="Nhập lại mật khẩu..."]')
    .should("be.visible")
    .type(password);

  cy.wait(2500);

  cy.get('form button[type="submit"]')
    .should("be.visible")
    .click();

  cy.url({ timeout: 10000 }).should("include", "/login");
});


it("TC02 - Đăng nhập thành công", () => {
  cy.visit("/login");

  cy.get('input[placeholder="Nhập tên..."]')
    .should("be.visible")
    .type("cypress_test");
  cy.wait(2000);

  cy.get('input[placeholder="Nhập mật khẩu..."]')
    .should("be.visible")
    .type("CypressDemo!2026#A");

  cy.wait(2500);

  cy.get('form button[type="submit"]')
    .should("be.visible")
    .click();

  cy.wait(2000);

  cy.url({ timeout: 10000 })
    .should("eq", "http://localhost:3000/");

  cy.window().then((win) => {
    expect(win.localStorage.getItem("token")).to.exist;
    expect(win.localStorage.getItem("user")).to.exist;
  });
});


it("TC03 - Đăng ký khi bỏ trống thông tin", () => {
  cy.visit("/register");

  cy.get('form button[type="submit"]')
    .should("be.visible")
    .click();

  cy.contains("Vui lòng nhập đầy đủ thông tin!")
    .should("be.visible");
});


it("TC04 - Đăng ký với email không hợp lệ", () => {
  cy.visit("/register");

  cy.get('input[placeholder="Nhập tên..."]')
    .type("testuser_cypress");
  cy.wait(2000);

  cy.get('input[placeholder="Nhập email..."]')
    .type("abc");
  cy.wait(2000);

  cy.get('input[placeholder="Nhập mật khẩu..."]')
    .type("123456");
  cy.wait(2000);

  cy.get('input[placeholder="Nhập lại mật khẩu..."]')
    .type("123456");
  cy.wait(2000);

  cy.get('form button[type="submit"]').click();

  cy.contains("Email không hợp lệ!")
    .should("be.visible");
});


it("TC05 - Đăng ký với mật khẩu xác nhận không khớp", () => {
  cy.visit("/register");

  cy.get('input[placeholder="Nhập tên..."]')
    .type("testuser_cypress");
  cy.wait(2000);

  cy.get('input[placeholder="Nhập email..."]')
    .type("testuser_cypress@gmail.com");
  cy.wait(2000);

  cy.get('input[placeholder="Nhập mật khẩu..."]')
    .type("123456");
  cy.wait(2000);

  cy.get('input[placeholder="Nhập lại mật khẩu..."]')
    .type("654321");
  cy.wait(2000);

  cy.get('form button[type="submit"]').click();

  cy.contains("Mật khẩu không khớp!")
    .should("be.visible");
});

 describe("Các chức năng yêu cầu đăng nhập", () => {

    beforeEach(() => {
      cy.visit("/login");

      cy.get('input[placeholder="Nhập tên..."]')
        .should("be.visible")
        .type("cypress_test");

      cy.get('input[placeholder="Nhập mật khẩu..."]')
        .should("be.visible")
        .type("CypressDemo!2026#A");

      cy.get('form button[type="submit"]')
        .should("be.visible")
        .click();

      cy.url({ timeout: 10000 })
        .should("eq", "http://localhost:3000/");
    });


it("TC06 - Tìm kiếm truyện tồn tại", () => {
  cy.visit("/manga-list");

  cy.get(".ml-search")
    .should("be.visible")
    .type("Solo Leveling");

  cy.wait(2500);

  cy.contains("Solo Leveling")
    .should("be.visible");
});


it("TC07 - Tìm kiếm truyện không tồn tại", () => {
  cy.visit("/manga-list");

  cy.get(".ml-search")
    .should("be.visible")
    .type("TruyenKhongTonTai123");

  cy.wait(2500);

  cy.contains("Không tìm thấy truyện")
    .should("be.visible");
});


it("TC08 - Lọc truyện theo thể loại", () => {
  cy.visit("/manga-list");

  cy.get(".ml-genre-btn")
    .contains("Nhiệt huyết")
    .should("be.visible")
    .click();

  cy.wait(2500);

  cy.get(".ml-card, .ml-row")
    .should("have.length.greaterThan", 0);
});


it("TC09 - Sắp xếp truyện theo đánh giá", () => {
  cy.visit("/manga-list");

  cy.get(".ml-select")
    .should("be.visible")
    .select("rating-desc");

  cy.wait(2500);

  cy.get(".ml-card, .ml-row")
    .should("have.length.greaterThan", 0);
});


it("TC10 - Chuyển đổi giữa dạng lưới và danh sách", () => {
  cy.visit("/manga-list");

  cy.get('button[title="Dạng lưới"]')
    .should("be.visible")
    .click();

  cy.get(".ml-card").should("exist");

  cy.wait(2000);

  cy.get('button[title="Dạng danh sách"]')
    .should("be.visible")
    .click();

  cy.get(".ml-row").should("exist");
});


it("TC11 - Kết hợp tìm kiếm và lọc truyện", () => {
  cy.visit("/manga-list");

  cy.get(".ml-search")
    .should("be.visible")
    .type("Solo");

  cy.wait(500);

  cy.get(".ml-genre-btn")
    .contains("Nhiệt huyết")
    .should("be.visible")
    .click();

  cy.wait(2500);

  cy.contains("Solo Leveling")
    .should("be.visible");
});


it("TC12 - Mở chi tiết truyện từ danh sách", () => {
  cy.visit("/manga-list");

  cy.contains("Solo Leveling")
    .should("be.visible")
    .click();

  cy.url().should("include", "/manga/");

  cy.get("body").should("be.visible");
});


it("TC13 - Tìm kiếm chương", () => {
  cy.visit("/manga/1");

  cy.get(".det-search")
    .should("be.visible")
    .type("1");

  cy.wait(12000);

  cy.contains("Chương 1")
    .should("be.visible");
});


it("TC14 - Đọc chương 1", () => {
  cy.visit("/manga/1");

  cy.contains("📖 Đọc từ đầu")
    .should("be.visible")
    .click();

  cy.url().should("include", "/chapter/1");

  cy.get(".rd-page-img", { timeout: 10000 })
    .should("exist");

  cy.wait(1000);
});


it("TC15 - Chuyển sang chương tiếp theo", () => {
  cy.visit("/manga/1/chapter/1");

  cy.get(".rd-page-img", { timeout: 10000 })
    .should("exist");

  cy.wait(2000);

  cy.contains("Chương tiếp →")
    .should("be.visible")
    .click();

  cy.url({ timeout: 10000 })
    .should("include", "/chapter/2");

  cy.wait(1000);
});

it("TC16 - Thêm truyện vào giỏ hàng", () => {
  cy.visit("/manga/1");

  cy.contains("🛒 Thêm giỏ hàng")
    .should("be.visible")
    .click();

  cy.contains("Đã thêm")
    .should("be.visible");

  cy.wait(1000);

 
});

});
});