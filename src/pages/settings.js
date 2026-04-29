const KEY = 'system_settings';

function getSettings() {
  return JSON.parse(localStorage.getItem(KEY) || '{}');
}

function saveSettings(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function renderSettings(container) {
  const settings = getSettings();

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

      <input
        id="lineToken"
        placeholder="LINE Channel Access Token"
        value="${settings.lineToken || ''}"
      >

      <input
        id="lineUserId"
        placeholder="LINE User ID"
        value="${settings.lineUserId || ''}"
      >

      <button id="saveSettings" class="primary-btn">
        儲存設定
      </button>
    </div>
  `;

  document.querySelector('#saveSettings').onclick = () => {
    saveSettings({
      remindDays: document.querySelector('#remindDays').value,
      lineEnabled: document.querySelector('#lineEnabled').value,
      lineToken: document.querySelector('#lineToken').value,
      lineUserId: document.querySelector('#lineUserId').value
    });

    alert('設定已儲存');
  };
}