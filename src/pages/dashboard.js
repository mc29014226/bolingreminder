export function renderDashboard(container) {
  container.innerHTML = `
    <h1>首頁總覽</h1>

    <section class="cards">
      <div class="card">
        <h3>待確認案件</h3>
        <p>0 件</p>
      </div>

      <div class="card">
        <h3>待開發票</h3>
        <p>0 件</p>
      </div>

      <div class="card">
        <h3>已結案</h3>
        <p>0 件</p>
      </div>
    </section>
  `;
}