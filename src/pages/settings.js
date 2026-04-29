const KEY = 'system_settings';

function getSettings() {
  return JSON.parse(localStorage.getItem(KEY) || '{}');
}

function saveSettings(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

function checked(value, list) {
  return Array.isArray(list) && list.includes(value) ? 'checked' : '';
}

export function renderSettings(container) {
  const settings = getSettings();

  const summaryFields = settings.summaryFields || [
    'pendingCheck',
    'pendingInvoice',
    'doneProjects',
    'unpaidInvoices',
    'monthAmount',
    'yearAmount'
  ];

  container.innerHTML = `
    <h1>提醒設定</h1>

    <div class="form-box">
      <h3>發票提醒</h3>

      <label>提醒天數</label>
      <select id="remindDays">
        <option value="7" ${settings.remindDays == 7 ? 'selected' : ''}>7 天前</option>
        <option value="3" ${settings.remindDays == 3 ? 'selected' : ''}>3 天前</option>
        <option value="1" ${settings.remindDays == 1 ? 'selected' : ''}>1 天前</option>
        <option value="0" ${settings.remindDays == 0 ? 'selected' : ''}>當天</option>
      </select>

      <label>LINE通知</label>
      <select id="lineEnabled">
        <option value="yes" ${settings.lineEnabled === 'yes' ? 'selected' : ''}>啟用</option>
        <option value="no" ${settings.lineEnabled === 'no' ? 'selected' : ''}>停用</option>
      </select>

      <input id="lineToken" placeholder="LINE Channel Access Token"
        value="${settings.lineToken || ''}">

      <input id="lineUserId" placeholder="LINE User ID"
        value="${settings.lineUserId || ''}">
    </div>

    <div class="form-box">
      <h3>LINE摘要通知</h3>

      <label>摘要通知</label>
      <select id="summaryEnabled">
        <option value="yes" ${settings.summaryEnabled === 'yes' ? 'selected' : ''}>啟用</option>
        <option value="no" ${settings.summaryEnabled === 'no' ? 'selected' : ''}>停用</option>
      </select>

      <label>通知頻率</label>
      <select id="summaryFrequency">
        <option value="daily" ${settings.summaryFrequency === 'daily' ? 'selected' : ''}>每天</option>
        <option value="weekly" ${settings.summaryFrequency === 'weekly' ? 'selected' : ''}>每週</option>
        <option value="monthly" ${settings.summaryFrequency === 'monthly' ? 'selected' : ''}>每月</option>
      </select>

      <label>通知時間</label>
      <input id="summaryTime" type="time"
        value="${settings.summaryTime || '09:00'}">

      <label><input type="checkbox" value="pendingCheck" ${checked('pendingCheck', summaryFields)}> 待確認案件</label>
      <label><input type="checkbox" value="pendingInvoice" ${checked('pendingInvoice', summaryFields)}> 待開發票</label>
      <label><input type="checkbox" value="doneProjects" ${checked('doneProjects', summaryFields)}> 已結案</label>
      <label><input type="checkbox" value="unpaidInvoices" ${checked('unpaidInvoices', summaryFields)}> 未收款發票</label>
      <label><input type="checkbox" value="monthAmount" ${checked('monthAmount', summaryFields)}> 本月開票金額</label>
      <label><input type="checkbox" value="yearAmount" ${checked('yearAmount', summaryFields)}> 今年開票金額</label>
    </div>

    <button id="saveSettings" class="primary-btn">儲存設定</button>
  `;

  document.querySelector('#saveSettings').onclick = () => {
    const selectedFields = [
      ...document.querySelectorAll('input[type="checkbox"]:checked')
    ].map(el => el.value);

    saveSettings({
      remindDays: document.querySelector('#remindDays').value,
      lineEnabled: document.querySelector('#lineEnabled').value,
      lineToken: document.querySelector('#lineToken').value,
      lineUserId: document.querySelector('#lineUserId').value,

      summaryEnabled: document.querySelector('#summaryEnabled').value,
      summaryFrequency: document.querySelector('#summaryFrequency').value,
      summaryTime: document.querySelector('#summaryTime').value,
      summaryFields: selectedFields
    });

    alert('設定已儲存');
  };
}