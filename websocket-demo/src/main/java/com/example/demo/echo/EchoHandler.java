package com.example.demo.echo;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
public class EchoHandler extends TextWebSocketHandler {
    @Override
    public void afterConnectionEstablished(WebSocketSession session)
            throws Exception {
        session.sendMessage(new TextMessage("CONNECTION ESTABLISHED"));
        System.out.println("Socket conn established");
    }
    @Override
    protected void handleTextMessage(WebSocketSession session,
                                     TextMessage message) throws Exception {
        String msg = message.getPayload();
        System.out.println("Receive message: " + msg);
        session.sendMessage(new TextMessage("RECEIVED: " + msg));
        System.out.println("Sent echo message");
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        super.afterConnectionClosed(session, status);
        System.out.println("Socket conn closed");
    }
}
