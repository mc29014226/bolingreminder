import { handleUserMessage } from './handlers.js';
import { getDashboardStats } from './stats.js';

function money(v) {
  return Number(v || 0).toLocaleString('zh-TW');
}

async function replyToLine(replyToken, text, token) {
  await fetch('https://api.line.me/v2/bot/message/reply', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      replyToken,
      messages: [{ type: 'text', text }]
    })
  });
}

async function pushToLine(userId, text, token) {
  await fetch('https://api.line.me/v2/bot/message/push', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      to: userId,
      messages: [{ type: 'text', text }]
    })
  });
}

export default {
  async fetch(request, env) {
    if (request.method !== 'POST') {
      return new Response('OK');
    }

    const body = await request.json();
    const events = body.events || [];

    for (const event of events) {
      const replyToken = event.replyToken;
      const userText = event.message?.text || '';

      const replyText = await handleUserMessage(userText);

      await replyToLine(
        replyToken,
        replyText,
        env.LINE_CHANNEL_TOKEN
      );
    }

    return new Response('OK');
  },

  async scheduled(event, env, ctx) {
    const stats = await getDashboardStats();

    const text = `
📊 每日摘要

待確認案件：${stats.pendingCheck} 件
待開發票：${stats.pendingInvoice} 件
未收款發票：${stats.unpaidInvoices} 張
本月開票金額：${money(stats.monthAmount)} 元
今年開票金額：${money(stats.yearAmount)} 元
`.trim();

    await pushToLine(
      env.LINE_USER_ID,
      text,
      env.LINE_CHANNEL_TOKEN
    );
  }
};