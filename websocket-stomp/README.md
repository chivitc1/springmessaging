# STOMP
- STOMP is a very simple text-oriented protocol. It was created for scripting languages
like Ruby and Python to connect to message brokers. STOMP can be used over any
reliable bidirectional network protocol like TCP and also WebSocket. The protocol itself
is text-oriented, but the payload of the messages isn’t strictly bound to this; it can also
contain binary data.

- When configuring and using STOMP with Spring WebSocket support, the WebSocket
application acts as a broker for all connected clients. The broker can be an in-memory
broker or an actual full-blown enterprise solution that supports the STOMP protocol
(like RabbitMQ or ActiveMQ). In the latter case the Spring WebSocket application acts as
a relay for the actual broker. To add messaging over WebSocket, spring uses the Spring
Messaging abstraction.

# Explain
- There are two parts: messages handled by app, and messages handled by MessageBroker (in-memory, RabitMQ, ActiveMQ,...)
- mark a method in a @Controller with @MessageMapping and tell it from which destination it will receive messages from client.
- When a message is received on the /app/echo destination, it will be passed on to the @MessageMapping annotated method
- @SendTo("/topic/echo") instructs Spring to put the result, a String, to topic
- The @EnableWebSocketMessageBroker will enable the use of messaging over
WebSocket. The broker is configured in the configureMessageBroker method. Here the
simple message broker is used. To connect to an enterprise broker, use the registry.enableStompBrokerRelay to connect to the actual broker.

- registration of a WebSocket endpoint that listens to incoming STOMP messages, in this case that is mapped to /echo-endpoint.