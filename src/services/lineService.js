import { buildSummaryMessage } from './summaryService.js';

function getSettings() {
  return JSON.parse(localStorage.getItem('system_settings') || '{}');
}

export async function sendLineMessage(text) {
  const settings = getSettings();

  if (settings.lineEnabled !== 'yes') {
    alert('LINE通知未啟用');
    return;
  }

  if (!settings.lineToken || !settings.lineUserId) {
    alert('LINE Token 或 User ID 尚未設定');
    return;
  }

  const url = 'https://api.line.me/v2/bot/message/push';

  const body = {
    to: settings.lineUserId,
    messages: [
      {
        type: 'text',
        text
      }
    ]
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${settings.lineToken}`
    },
    body: JSON.stringify(body)
  });

  if (res.ok) {
    alert('LINE訊息已發送');
  } else {
    alert('LINE發送失敗');
  }
}

export async function sendSummaryToLine() {
  const message = buildSummaryMessage();
  await sendLineMessage(message);
}