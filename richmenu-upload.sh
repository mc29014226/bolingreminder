#!/bin/bash

TOKEN="你的_CHANNEL_ACCESS_TOKEN"

curl -v -X POST https://api.line.me/v2/bot/richmenu \
-H "Authorization: Bearer $TOKEN" \
-H "Content-Type: application/json" \
-d @richmenu.json