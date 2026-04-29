import './style.css';
import '../styles/main.css';

import { renderDashboard } from './pages/dashboard.js';
import { renderProjectList } from './pages/projectList.js';
import { renderVendorList } from './pages/vendorList.js';
import { renderSettings } from './pages/settings.js';

const app = document.querySelector('#app');

function renderLayout() {
  app.innerHTML = `
    <button id="menuToggle" class="menu-toggle">☰</button>

    <aside id="sidebar" class="sidebar closed">
      <h2>發票提醒</h2>
      <button data-page="dashboard">首頁總覽</button>
      <button data-page="projects">案件管理</button>
      <button data-page="vendors">廠商管理</button>
      <button data-page="settings">提醒設定</button>
    </aside>

    <main id="page" class="page full"></main>
  `;

  document.querySelector('#menuToggle').onclick = () => {
    document.querySelector('#sidebar').classList.toggle('closed');
    document.querySelector('#page').classList.toggle('full');
  };

  document.querySelectorAll('[data-page]').forEach((btn) => {
    btn.addEventListener('click', () => changePage(btn.dataset.page));
  });

  changePage('dashboard');
}

function changePage(page) {
  const pageEl = document.querySelector('#page');

  if (page === 'dashboard') renderDashboard(pageEl);
  if (page === 'projects') renderProjectList(pageEl);
  if (page === 'vendors') renderVendorList(pageEl);
  if (page === 'settings') renderSettings(pageEl);
}

renderLayout();