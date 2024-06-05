package com.marketplace.chat.adapters.inbound;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
class ChatController {
    @MessageMapping("/chat")
    @SendTo("/topic/chat/broadcast")
    ChatMessage broadcastToAll(@Payload ChatMessage message) {
        System.out.println("Received message: " + message.content);
        return new ChatMessage("Broadcast: " + message.content);
    }

    record ChatMessage(String content) {
    }
}
